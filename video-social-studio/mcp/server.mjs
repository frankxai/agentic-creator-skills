#!/usr/bin/env node
// Stdio MCP server for video-social-studio, so the engine works in chat surfaces that call MCP
// tools but cannot run shell commands (Claude Desktop, Cowork). Every tool is a thin, typed
// wrapper over scripts/vid.mjs: same safety rules (originals never overwritten, plain errors).
// No dependencies. Answers both the stateless 2026-07-28 flow (server/discover, tools/*) and
// the older initialize handshake, so current and older clients both connect.
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VID = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'vid.mjs');
const SERVER = { name: 'video-social-studio', version: '0.1.0' };

const str = (description) => ({ type: 'string', description });
const TOOLS = [
  { name: 'video_doctor', description: 'Check that ffmpeg and the caption model are ready, with plain install steps if not. Run this first.', props: {}, required: [], argv: () => ['doctor'] },
  { name: 'video_info', description: 'Length, size, resolution and audio of a video file.', props: { input: str('Path to the video') }, required: ['input'], argv: a => ['probe', a.input] },
  { name: 'video_remove_pauses', description: 'Cut out pauses longer than about half a second (jump cuts). Writes a new file.', props: { input: str('Path to the video'), output: str('Path for the edited copy') }, required: ['input', 'output'], argv: a => ['silence', a.input, '--out', a.output] },
  { name: 'video_trim', description: 'Keep only the part between two times (seconds or mm:ss). Pass an .srt to snap to sentence boundaries.', props: { input: str('Path to the video'), output: str('Path for the clip'), from: str('Start, e.g. 00:12'), to: str('End, e.g. 00:40'), snap_srt: str('Optional .srt to snap cuts to sentences') }, required: ['input', 'output', 'from', 'to'], argv: a => ['trim', a.input, '--from', a.from, '--to', a.to, '--out', a.output, ...(a.snap_srt ? ['--snap', a.snap_srt] : [])] },
  { name: 'video_captions', description: 'Transcribe speech locally into an .srt caption file. The first run may need download_model=true (one-time model download).', props: { input: str('Path to the video'), output: str('Path for the .srt'), language: str('Language code or auto'), download_model: { type: 'boolean', description: 'Allow the one-time model download' } }, required: ['input', 'output'], argv: a => ['captions', a.input, '--out', a.output, '--lang', a.language || 'auto', ...(a.download_model ? ['--download-model'] : [])] },
  { name: 'video_burn_captions', description: 'Burn an .srt into the video as readable captions.', props: { input: str('Path to the video'), srt: str('Path to the .srt'), output: str('Path for the captioned copy'), style: { type: 'string', enum: ['bold', 'clean', 'minimal'] } }, required: ['input', 'srt', 'output'], argv: a => ['burn', a.input, '--srt', a.srt, '--out', a.output, '--style', a.style || 'bold'] },
  { name: 'video_export', description: 'Export for a platform: right shape, size, frame rate and loudness.', props: { input: str('Path to the video'), output: str('Path for the export'), platform: { type: 'string', enum: ['reels', 'tiktok', 'shorts', 'youtube', 'linkedin', 'x'] }, fit: { type: 'string', enum: ['crop', 'blur'], description: 'crop fills the frame; blur keeps everything on a blurred background' } }, required: ['input', 'output', 'platform'], argv: a => ['export', a.input, '--preset', a.platform, '--out', a.output, '--mode', a.fit || 'crop'] },
  { name: 'video_thumbnails', description: 'Save evenly spaced frames to pick a cover from.', props: { input: str('Path to the video'), folder: str('Folder for the frames'), count: { type: 'integer', minimum: 1, maximum: 24 } }, required: ['input', 'folder'], argv: a => ['thumbs', a.input, '--out', a.folder, '--count', String(a.count || 6)] },
  { name: 'video_transcript', description: 'Read an .srt as timestamped text, for picking hooks and clips.', props: { srt: str('Path to the .srt') }, required: ['srt'], argv: a => ['transcript', a.srt] },
];

const listTools = () => TOOLS.map(t => ({ name: t.name, description: t.description, inputSchema: { type: 'object', properties: t.props, required: t.required, additionalProperties: false } }));

export function callTool(name, args = {}) {
  const tool = TOOLS.find(t => t.name === name);
  if (!tool) return { isError: true, content: [{ type: 'text', text: `Unknown tool ${name}.` }] };
  const missing = tool.required.filter(k => args[k] === undefined || args[k] === '');
  if (missing.length) return { isError: true, content: [{ type: 'text', text: `Missing: ${missing.join(', ')}.` }] };
  const r = spawnSync(process.execPath, [VID, ...tool.argv(args)], { encoding: 'utf8', cwd: args.cwd || process.cwd(), maxBuffer: 16 * 1024 * 1024 });
  const vidLines = (r.stderr || '').split(/\r?\n/).filter(l => l.startsWith('vid:') || l.startsWith('warning:') || l.startsWith('snapped'));
  const text = [(r.stdout || '').trim(), ...vidLines].filter(Boolean).join('\n') || (r.status === 0 ? 'Done.' : 'It did not work; run video_doctor.');
  return { isError: r.status !== 0, content: [{ type: 'text', text }] };
}

function handle(msg) {
  const { id, method, params } = msg;
  switch (method) {
    case 'initialize':
      return { protocolVersion: params?.protocolVersion || '2025-06-18', capabilities: { tools: {} }, serverInfo: SERVER };
    case 'server/discover':
      return { serverInfo: SERVER, capabilities: { tools: {} } };
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: listTools() };
    case 'tools/call':
      return callTool(params?.name, params?.arguments);
    default:
      if (id === undefined) return undefined;
      throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const rl = createInterface({ input: process.stdin });
  rl.on('line', line => {
    if (!line.trim()) return;
    let msg;
    try { msg = JSON.parse(line); } catch { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }) + '\n'); return; }
    if (msg.id === undefined) return;
    try {
      const result = handle(msg);
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result }) + '\n');
    } catch (e) {
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: e.code || -32603, message: e.message } }) + '\n');
    }
  });
}
