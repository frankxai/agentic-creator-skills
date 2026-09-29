// node --test video-social-studio/scripts/vid.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { keepSegments, parseSilences, filterPath, renumberSrt, srtToText, parseTime, aspectFilter, PRESETS } from './vid.mjs';

test('silence detection output becomes keep-segments with padding', () => {
  const stderr = '[silencedetect @ 0x1] silence_start: 3.02\n[silencedetect @ 0x1] silence_end: 5.01 | silence_duration: 1.99\n';
  assert.deepEqual(parseSilences(stderr), [[3.02, 5.01]]);
  assert.deepEqual(keepSegments([[3.02, 5.01]], 10, 0.12), [[0, 3.14], [4.89, 10]]);
});

test('a leading silence does not produce an empty first segment', () => {
  assert.deepEqual(keepSegments([[0, 2]], 6, 0.1), [[1.9, 6]]);
});

test('padding that makes segments touch merges them', () => {
  assert.deepEqual(keepSegments([[2, 2.1]], 5, 0.12), [[0, 5]]);
});

test('filter paths drop the Windows drive colon on the current drive', () => {
  assert.equal(filterPath('C:/Users/a/m.bin', 'C:/work'), '/Users/a/m.bin');
  assert.equal(filterPath('D:/clips/x.srt', 'C:/work'), 'D\\\\:/clips/x.srt');
});

test('SRT cues are renumbered from 1', () => {
  const out = renumberSrt('0\n00:00:00,000 --> 00:00:01,000\nHi\n\n1\n00:00:01,000 --> 00:00:02,000\nthere\n');
  assert.match(out, /^1\n00:00:00,000/);
  assert.match(out, /\n\n2\n00:00:01,000/);
});

test('transcript view keeps a timestamp per cue', () => {
  assert.equal(srtToText('1\n00:01:02,500 --> 00:01:03,000\nHello world\n'), '[00:01:02] Hello world');
});

test('times accept seconds and clock format', () => {
  assert.equal(parseTime('90'), 90);
  assert.equal(parseTime('01:30'), 90);
  assert.equal(parseTime('00:01:30.5'), 90.5);
});

test('vertical presets are 1080x1920 and every preset normalizes loudness', () => {
  for (const k of ['reels', 'tiktok', 'shorts']) assert.deepEqual([PRESETS[k].w, PRESETS[k].h], [1080, 1920]);
  for (const p of Object.values(PRESETS)) assert.equal(p.lufs, -14);
  assert.match(aspectFilter('9:16', 'blur'), /boxblur/);
  assert.match(aspectFilter('1:1', 'crop'), /scale=1080:1080/);
});

import { lengthCheck } from './vid.mjs';
test('length guard: Shorts refuses over 180s, Reels only warns, YouTube has no cap', () => {
  assert.equal(lengthCheck('shorts', 200).ok, false);
  assert.equal(lengthCheck('reels', 200).ok, true);
  assert.match(lengthCheck('reels', 200).message, /180s/);
  assert.deepEqual(lengthCheck('youtube', 3600), { ok: true });
  assert.deepEqual(lengthCheck('shorts', 59), { ok: true });
});
