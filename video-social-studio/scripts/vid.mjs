#!/usr/bin/env node
// vid.mjs — the one deterministic video engine every video-social-studio skill drives.
// Skills decide *what* to cut; this script decides *how*, so an edit is reproducible and the
// exact ffmpeg command is always shown. Contract: ../CONTRACT.md. Needs only ffmpeg on PATH.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import https from 'node:https';
import { spawnSync } from 'node:child_process';

const argv = process.argv.slice(2);
const cmd = argv[0];
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i < 0 ? d : argv[i + 1]; };
const has = n => argv.includes(`--${n}`);
const VALUE_FLAGS = new Set(['from', 'to', 'out', 'db', 'min', 'pad', 'aspect', 'mode', 'x', 'model', 'lang', 'srt', 'style', 'position', 'lufs', 'preset', 'count', 'max-len', 'snap', 'wrap']);
const positional = argv.slice(1).filter((a, i, all) => !a.startsWith('--') && !VALUE_FLAGS.has((all[i - 1] || '').replace(/^--/, '')));
const DRY = has('dry-run');
const CACHE = path.join(os.homedir(), '.cache', 'video-social-studio');

// Platform presets. Numbers are the common upload targets; platform-specs/references holds the
// sourced limits, and this table must be updated from there, not from memory.
// maxSec/hard mirror section 6 of platform-specs/references/specs-2026-09.md: hard limits refuse
// (a Short over 180 s silently becomes long-form), soft ones warn.
export const PRESETS = {
  reels: { aspect: '9:16', w: 1080, h: 1920, fps: 30, vb: '8M', lufs: -14, maxSec: 180 },
  tiktok: { aspect: '9:16', w: 1080, h: 1920, fps: 30, vb: '8M', lufs: -14, maxSec: 600 },
  shorts: { aspect: '9:16', w: 1080, h: 1920, fps: 30, vb: '10M', lufs: -14, maxSec: 180, hard: true },
  youtube: { aspect: '16:9', w: 1920, h: 1080, fps: 30, vb: '12M', lufs: -14 },
  linkedin: { aspect: '1:1', w: 1080, h: 1080, fps: 30, vb: '8M', lufs: -14, maxSec: 600, hard: true },
  x: { aspect: '16:9', w: 1280, h: 720, fps: 30, vb: '6M', lufs: -14, maxSec: 140 },
};

export function lengthCheck(preset, seconds) {
  const p = PRESETS[preset];
  if (!p?.maxSec || seconds <= p.maxSec) return { ok: true };
  return { ok: !p.hard, message: `${preset} ${p.hard ? 'does not accept' : 'may cut or reject'} videos over ${p.maxSec}s; this one is ${Math.round(seconds)}s. Trim it or use make-shorts first.` };
}

const MODELS = {
  tiny: 'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin',
  base: 'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin',
  small: 'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin',
};

const die = (msg, code = 1) => { console.error(`vid: ${msg}`); process.exit(code); };
const need = (v, what) => v || die(`missing ${what}. See CONTRACT.md for usage.`, 2);
const needFile = f => { need(f, 'input file'); if (!fs.existsSync(f)) die(`can't find ${f}. Check the name and folder, or drag the file into the chat.`); return f; };
const quote = a => (/[\s"'()]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a);

function run(bin, args, { capture = false } = {}) {
  console.error(`$ ${bin} ${args.map(quote).join(' ')}`);
  if (DRY && !capture) return { status: 0, stdout: '', stderr: '' };
  const r = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.error) die(r.error.code === 'ENOENT' ? `${bin} not found. Run: node vid.mjs doctor` : r.error.message);
  if (r.status !== 0 && !capture) die(`${bin} failed:\n${(r.stderr || '').split('\n').slice(-8).join('\n')}`);
  return r;
}

const ff = (args, opts) => run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], opts);

function safeOut(input, out) {
  if (DRY && !out) return 'dry-run-output.mp4';
  need(out, '--out');
  if (input && path.resolve(input) === path.resolve(out)) die('--out must differ from the input; originals are never overwritten.');
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  return out;
}

export function probe(file) {
  if (!fs.existsSync(file)) die(`no such file: ${file}`);
  const r = run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file], { capture: true });
  if (r.status !== 0) die(`ffprobe could not read ${file}`);
  const j = JSON.parse(r.stdout);
  const v = j.streams.find(s => s.codec_type === 'video');
  const a = j.streams.find(s => s.codec_type === 'audio');
  const [n, d] = (v?.avg_frame_rate || '0/1').split('/').map(Number);
  const rotation = Number(v?.side_data_list?.find(s => s.rotation !== undefined)?.rotation || v?.tags?.rotate || 0);
  const swap = Math.abs(rotation) % 180 === 90;
  return {
    file, duration: Number(j.format.duration), sizeMB: +(Number(j.format.size) / 1048576).toFixed(1),
    width: swap ? v?.height : v?.width, height: swap ? v?.width : v?.height,
    fps: d ? +(n / d).toFixed(2) : null, videoCodec: v?.codec_name, audioCodec: a?.codec_name, hasAudio: !!a, rotation,
  };
}

export const parseTime = t => {
  if (t === undefined) return undefined;
  if (/^\d+(\.\d+)?$/.test(t)) return Number(t);
  const p = t.split(':').map(Number);
  if (p.some(Number.isNaN)) die(`bad time: ${t}`);
  return p.reduce((acc, x) => acc * 60 + x, 0);
};

// Keeps speech, drops pauses: invert silencedetect's intervals into keep-segments, padded so
// words are not clipped, merged where padding makes them touch.
export function keepSegments(silences, duration, pad = 0.12) {
  const keep = [];
  let cursor = 0;
  for (const [s, e] of silences) {
    // Only speech before the pause earns a segment; padding alone must not create a blip.
    if (s > cursor + 0.05) keep.push([cursor, Math.min(duration, s + pad)]);
    cursor = Math.max(cursor, e - pad);
  }
  if (duration > cursor + 0.05) keep.push([cursor, duration]);
  const merged = [];
  for (const seg of keep) {
    const last = merged[merged.length - 1];
    if (last && seg[0] <= last[1]) last[1] = Math.max(last[1], seg[1]); else merged.push([...seg]);
  }
  return merged.map(([a, b]) => [+a.toFixed(3), +b.toFixed(3)]);
}

export function parseSilences(stderr) {
  const out = [];
  let start = null;
  for (const line of stderr.split(/\r?\n/)) {
    const s = line.match(/silence_start: (-?[\d.]+)/);
    const e = line.match(/silence_end: ([\d.]+)/);
    if (s) start = Math.max(0, Number(s[1]));
    if (e && start !== null) { out.push([start, Number(e[1])]); start = null; }
  }
  return out;
}

export function aspectFilter(aspect, mode = 'crop', x = 'center', target) {
  const [aw, ah] = aspect.split(':').map(Number);
  if (!aw || !ah) die(`bad --aspect ${aspect}; use 9:16, 1:1, 4:5 or 16:9`);
  const W = target?.w || (aw > ah ? 1920 : 1080);
  const H = target?.h || Math.round((W * ah) / aw / 2) * 2;
  if (mode === 'blur') {
    return `[0:v]split=2[bg][fg];[bg]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=20:2[b];` +
      `[fg]scale=${W}:${H}:force_original_aspect_ratio=decrease[f];[b][f]overlay=(W-w)/2:(H-h)/2,setsar=1[v]`;
  }
  const xExpr = x === 'left' ? '0' : x === 'right' ? 'iw-ow' : '(iw-ow)/2';
  return `[0:v]crop='min(iw,ih*${aw}/${ah})':'min(ih,iw*${ah}/${aw})':${xExpr}:(ih-oh)/2,scale=${W}:${H},setsar=1[v]`;
}

// Styles sit above the bottom ~20% that Reels/TikTok/Shorts cover with their own UI.
export const CAPTION_STYLES = {
  bold: 'FontName=Arial,FontSize=16,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=3,Shadow=0',
  clean: 'FontName=Arial,FontSize=13,Bold=0,PrimaryColour=&H00FFFFFF,BackColour=&H99000000,BorderStyle=4,Outline=0,Shadow=0',
  minimal: 'FontName=Arial,FontSize=11,Bold=0,PrimaryColour=&H00FFFFFF,OutlineColour=&H66000000,BorderStyle=1,Outline=1,Shadow=0',
};
export const marginFor = position => (position === 'middle' ? 'Alignment=5,MarginV=0' : 'Alignment=2,MarginV=70');

// A filter graph is parsed twice, so a Windows drive colon ('C:') splits the option list no
// matter how it is escaped across ffmpeg builds. A rooted path without the drive resolves
// against the current drive, which removes the colon entirely; other drives fall back to escaping.
export function filterPath(p, cwd = process.cwd()) {
  const abs = path.resolve(p).replace(/\\/g, '/');
  const drive = /^([A-Za-z]):\//.exec(abs);
  if (!drive) return abs.replace(/:/g, '\\:');
  const cwdDrive = /^([A-Za-z]):/.exec(cwd);
  if (cwdDrive && cwdDrive[1].toLowerCase() === drive[1].toLowerCase()) return abs.slice(2);
  return abs.replace(/:/g, '\\\\:');
}

const srtTime = s => {
  const ms = Math.max(0, Math.round(s * 1000));
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
export const parseSrt = srt => srt.replace(/\r/g, '').split(/\n\n+/).map(b => {
  const lines = b.split('\n');
  const i = lines.findIndex(l => l.includes('-->'));
  if (i < 0) return null;
  const [a, z] = lines[i].split('-->').map(t => parseTime(t.trim().replace(',', '.')));
  return { start: a, end: z, text: lines.slice(i + 1).join(' ').replace(/\s+/g, ' ').trim() };
}).filter(c => c && c.text);

// Small whisper models overlap cues, run the last cue past the clip, and emit lines longer than
// a phone screen holds. Tidy clamps to the clip, removes overlaps, and wraps to two short lines.
export function tidySrt(srt, duration = Infinity, maxChars = 32) {
  const cues = parseSrt(srt);
  cues.forEach((c, i) => {
    const next = cues[i + 1];
    if (next && c.end > next.start) c.end = next.start;
    c.end = Math.min(c.end, duration, c.start + 7);
  });
  const wrap = text => {
    const words = text.split(' ');
    const lines = [''];
    for (const w of words) {
      const cur = lines[lines.length - 1];
      if (cur && (cur + ' ' + w).length > maxChars && lines.length < 2) lines.push(w);
      else lines[lines.length - 1] = cur ? `${cur} ${w}` : w;
    }
    return lines.join('\n');
  };
  return cues.filter(c => c.end > c.start).map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${wrap(c.text)}`).join('\n\n') + '\n';
}

// Snaps a cut to caption boundaries so a clip never starts or ends mid-sentence.
export function snapToCues(cues, from, to) {
  const startCue = [...cues].reverse().find(c => c.start <= from + 0.05) || cues[0];
  const endCue = cues.find(c => c.end >= to - 0.05) || cues[cues.length - 1];
  return { from: startCue.start, to: Math.max(endCue.end, startCue.start + 0.5) };
}

// ffmpeg's whisper filter numbers cues from 0; most editors and platforms expect 1.
export function renumberSrt(srt) {
  let n = 0;
  return srt.replace(/\r/g, '').split(/\n\n+/).filter(b => b.includes('-->')).map(b => {
    const lines = b.split('\n');
    const i = lines.findIndex(l => l.includes('-->'));
    return [String(++n), ...lines.slice(i)].join('\n');
  }).join('\n\n') + '\n';
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const get = u => https.get(u, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return get(new URL(res.headers.location, u).toString());
      if (res.statusCode !== 200) return reject(new Error(`download failed: HTTP ${res.statusCode}`));
      const tmp = `${dest}.part`;
      const f = fs.createWriteStream(tmp);
      res.pipe(f);
      f.on('finish', () => f.close(() => { fs.renameSync(tmp, dest); resolve(dest); }));
    }).on('error', reject);
    get(url);
  });
}

export function srtToText(srt) {
  return srt.replace(/\r/g, '').split(/\n\n+/).map(block => {
    const lines = block.split('\n').filter(Boolean);
    const t = lines.find(l => l.includes('-->'));
    if (!t) return null;
    const text = lines.slice(lines.indexOf(t) + 1).join(' ').trim();
    return text ? `[${t.split(' --> ')[0].replace(/,\d+$/, '')}] ${text}` : null;
  }).filter(Boolean).join('\n');
}

const commands = {
  doctor() {
    const install = process.platform === 'win32' ? 'winget install Gyan.FFmpeg' : process.platform === 'darwin' ? 'brew install ffmpeg' : 'sudo apt install ffmpeg';
    const v = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
    if (v.error) { console.log(JSON.stringify({ ok: false, ffmpeg: 'missing', fix: install }, null, 1)); process.exit(1); }
    const version = (v.stdout.match(/ffmpeg version (\S+)/) || [])[1];
    const filters = spawnSync('ffmpeg', ['-hide_banner', '-filters'], { encoding: 'utf8' }).stdout || '';
    const hasF = n => new RegExp(`\\s${n}\\s`).test(filters);
    const models = fs.existsSync(CACHE) ? fs.readdirSync(CACHE).filter(f => f.endsWith('.bin')) : [];
    const report = {
      ok: true, ffmpeg: version, ffprobe: !spawnSync('ffprobe', ['-version']).error,
      captions: hasF('whisper') ? (models.length ? `ready (${models.join(', ')})` : 'filter ready; model not downloaded yet (captions --download-model)') : 'this ffmpeg has no whisper filter: install ffmpeg 8+ full build (' + install + ') for local captions',
      burnCaptions: hasF('subtitles'), loudness: hasF('loudnorm'), cache: CACHE,
    };
    console.log(JSON.stringify(report, null, 1));
  },

  probe() { console.log(JSON.stringify(probe(needFile(positional[0])), null, 1)); },

  trim() {
    const input = needFile(positional[0]);
    let from = parseTime(need(flag('from'), '--from'));
    let to = parseTime(need(flag('to'), '--to'));
    if (to <= from) die('--to must be after --from');
    if (flag('snap')) {
      const snapped = snapToCues(parseSrt(fs.readFileSync(needFile(flag('snap')), 'utf8')), from, to);
      console.error(`snapped to sentence boundaries: ${from}-${to}s -> ${snapped.from}-${snapped.to}s`);
      ({ from, to } = snapped);
    }
    ff(['-ss', String(from), '-to', String(to), '-i', input, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', safeOut(input, flag('out'))]);
    console.log(`trimmed ${(to - from).toFixed(1)}s -> ${flag('out')}`);
  },

  silence() {
    const input = needFile(positional[0]);
    const out = safeOut(input, flag('out'));
    const info = probe(input);
    if (!info.hasAudio) die('no audio track, nothing to detect pauses in');
    const det = run('ffmpeg', ['-hide_banner', '-i', input, '-af', `silencedetect=noise=${flag('db', '-35')}dB:d=${flag('min', '0.5')}`, '-f', 'null', '-'], { capture: true });
    const segs = keepSegments(parseSilences(det.stderr), info.duration, Number(flag('pad', '0.12')));
    if (!segs.length) die('the whole clip reads as silence; try a lower --db such as -45');
    const kept = segs.reduce((n, [a, b]) => n + (b - a), 0);
    const parts = segs.map(([a, b], i) => `[0:v]trim=${a}:${b},setpts=PTS-STARTPTS[v${i}];[0:a]atrim=${a}:${b},asetpts=PTS-STARTPTS[a${i}]`);
    const graph = `${parts.join(';')};${segs.map((_, i) => `[v${i}][a${i}]`).join('')}concat=n=${segs.length}:v=1:a=1[v][a]`;
    const script = path.join(os.tmpdir(), `vid-silence-${process.pid}.txt`);
    fs.writeFileSync(script, graph);
    ff(['-i', input, '-filter_complex_script', script, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out]);
    fs.rmSync(script, { force: true });
    console.log(JSON.stringify({ out, segments: segs.length, before: +info.duration.toFixed(1), after: +kept.toFixed(1), removedSeconds: +(info.duration - kept).toFixed(1) }));
  },

  reframe() {
    const input = needFile(positional[0]);
    const graph = aspectFilter(need(flag('aspect'), '--aspect'), flag('mode', 'crop'), flag('x', 'center'));
    ff(['-i', input, '-filter_complex', graph, '-map', '[v]', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-c:a', 'copy', '-movflags', '+faststart', safeOut(input, flag('out'))]);
    console.log(`reframed to ${flag('aspect')} (${flag('mode', 'crop')}) -> ${flag('out')}`);
  },

  async captions() {
    const input = needFile(positional[0]);
    const out = safeOut(input, flag('out'));
    // Without --model, use the best model already on disk so a cached tiny never fails as "base missing".
    const cached = ['small', 'base', 'tiny'].find(m => fs.existsSync(path.join(CACHE, `ggml-${m}.bin`)));
    const model = flag('model', cached || 'base');
    if (!MODELS[model]) die(`unknown --model ${model}; use tiny, base or small`);
    const modelPath = path.join(CACHE, `ggml-${model}.bin`);
    if (!fs.existsSync(modelPath)) {
      if (!has('download-model')) die(`caption model "${model}" is not downloaded yet (tiny ~75MB, base ~142MB, small ~466MB). Re-run with --download-model to fetch it once into ${CACHE}.`, 3);
      fs.mkdirSync(CACHE, { recursive: true });
      console.error(`downloading ${model} model to ${modelPath} ...`);
      if (!DRY) await download(MODELS[model], modelPath);
    }
    const lang = flag('lang', 'auto');
    ff(['-i', input, '-vn', '-af', `whisper=model=${filterPath(modelPath)}:language=${lang}:queue=10:max_len=${flag('max-len', '42')}:destination=${filterPath(out)}:format=srt`, '-f', 'null', '-']);
    if (!DRY) {
      const raw = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
      if (!raw.includes('-->')) die('transcription produced no captions; is there speech in the audio?');
      const srt = tidySrt(renumberSrt(raw), probe(input).duration, Number(flag('wrap', '32')));
      fs.writeFileSync(out, srt);
      console.log(JSON.stringify({ out, model, cues: srt.split('\n\n').length, next: 'review the .srt for names and terms, then: vid.mjs burn' }));
    }
  },

  burn() {
    const input = needFile(positional[0]);
    const srt = need(flag('srt'), '--srt');
    if (!fs.existsSync(srt)) die(`no such subtitle file: ${srt}`);
    const style = CAPTION_STYLES[flag('style', 'bold')] || die(`unknown --style; use ${Object.keys(CAPTION_STYLES).join(', ')}`);
    const vf = `subtitles=filename=${filterPath(srt)}:force_style='${style},${marginFor(flag('position', 'bottom'))}'`;
    ff(['-i', input, '-vf', vf, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-c:a', 'copy', '-movflags', '+faststart', safeOut(input, flag('out'))]);
    console.log(`captions burned (${flag('style', 'bold')}) -> ${flag('out')}`);
  },

  loudness() {
    const input = needFile(positional[0]);
    ff(['-i', input, '-af', `loudnorm=I=${flag('lufs', '-14')}:TP=-1.5:LRA=11`, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', safeOut(input, flag('out'))]);
    console.log(`loudness -> ${flag('lufs', '-14')} LUFS -> ${flag('out')}`);
  },

  export() {
    const input = needFile(positional[0]);
    const name = need(flag('preset'), '--preset');
    const p = PRESETS[name] || die(`unknown --preset ${name}; use ${Object.keys(PRESETS).join(', ')}`);
    const graph = `${aspectFilter(p.aspect, flag('mode', 'crop'), flag('x', 'center'), p).replace('[v]', '[vs]')};[vs]fps=${p.fps}[v]`;
    const info = probe(input);
    const len = lengthCheck(name, info.duration);
    if (!len.ok) die(len.message);
    if (len.message) console.error(`warning: ${len.message}`);
    const audio = info.hasAudio ? ['-map', '0:a', '-af', `loudnorm=I=${p.lufs}:TP=-1.5:LRA=11`, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000'] : [];
    ff(['-i', input, '-filter_complex', graph, '-map', '[v]', ...audio, '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-b:v', p.vb, '-maxrate', p.vb, '-bufsize', `${parseInt(p.vb) * 2}M`, '-movflags', '+faststart', safeOut(input, flag('out'))]);
    console.log(JSON.stringify({ out: flag('out'), preset: name, ...p }));
  },

  thumbs() {
    const input = needFile(positional[0]);
    const dir = need(flag('out'), '--out');
    const count = Math.max(1, Number(flag('count', '6')));
    const { duration } = probe(input);
    fs.mkdirSync(dir, { recursive: true });
    const files = [];
    for (let i = 0; i < count; i++) {
      const t = (duration * (i + 0.5)) / count;
      const f = path.join(dir, `thumb-${String(i + 1).padStart(2, '0')}.jpg`);
      ff(['-ss', t.toFixed(2), '-i', input, '-frames:v', '1', '-q:v', '2', f]);
      files.push(f);
    }
    console.log(JSON.stringify({ files }));
  },

  concat() {
    const inputs = positional;
    if (inputs.length < 2) die('concat needs at least two inputs');
    const out = safeOut(null, flag('out'));
    const first = probe(inputs[0]);
    const W = first.width, H = first.height;
    const withAudio = inputs.every(i => probe(i).hasAudio);
    const norm = inputs.map((_, i) => `[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v${i}]` + (withAudio ? `;[${i}:a]aresample=48000[a${i}]` : '')).join(';');
    const graph = `${norm};${inputs.map((_, i) => `[v${i}]` + (withAudio ? `[a${i}]` : '')).join('')}concat=n=${inputs.length}:v=1:a=${withAudio ? 1 : 0}[v]` + (withAudio ? '[a]' : '');
    ff([...inputs.flatMap(i => ['-i', i]), '-filter_complex', graph, '-map', '[v]', ...(withAudio ? ['-map', '[a]', '-c:a', 'aac', '-b:a', '192k'] : []), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-movflags', '+faststart', out]);
    console.log(`joined ${inputs.length} clips -> ${out}`);
  },

  tidy() {
    const srt = needFile(positional[0]);
    const out = safeOut(srt, flag('out'));
    const video = flag('video');
    const tidy = tidySrt(fs.readFileSync(srt, 'utf8'), video ? probe(video).duration : Infinity, Number(flag('wrap', '32')));
    if (!DRY) fs.writeFileSync(out, tidy);
    console.log(JSON.stringify({ out, cues: tidy.split('\n\n').length }));
  },

  transcript() {
    const srt = need(positional[0], 'an .srt file');
    console.log(srtToText(fs.readFileSync(srt, 'utf8')));
  },
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
if (isMain) {
  if (!commands[cmd]) {
    console.error(`usage: node vid.mjs <${Object.keys(commands).join('|')}> [args]   (see CONTRACT.md)`);
    process.exit(2);
  }
  await commands[cmd]();
  if (DRY) console.error('DRY RUN: nothing was written. Run again without --dry-run to do it.');
}
