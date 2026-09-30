// node --test video-social-studio/mcp/server.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { callTool } from './server.mjs';

test('unknown tools and missing arguments are plain tool errors, not crashes', () => {
  assert.equal(callTool('video_nope', {}).isError, true);
  const r = callTool('video_trim', { input: 'a.mp4' });
  assert.equal(r.isError, true);
  assert.match(r.content[0].text, /Missing: output, from, to/);
});

test('the engine safety rules reach the client: an original is never overwritten', () => {
  const r = callTool('video_export', { input: 'x.mp4', output: 'x.mp4', platform: 'reels' });
  assert.equal(r.isError, true);
  assert.match(r.content[0].text, /can't find|must differ/);
});
