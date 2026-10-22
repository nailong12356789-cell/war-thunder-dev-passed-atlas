#!/usr/bin/env node
// Dependency-free browser-script syntax and RB sorting regression checks.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
const executable = scriptTags.filter(m => !/type=["']application\/json["']/i.test(m[1])).map(m => m[2]);
assert.equal(executable.length, 1, 'Expected exactly one inline application script');
const app = executable[0];

// Check the complete browser script actually parses.
new Script(app, { filename: 'index.html:inline-script' });

// Test the sort comparator from the shipped site, not a copy of its logic.
const start = app.indexOf('const rbRank = ');
const end = app.indexOf('function filter(){', start);
assert.ok(start >= 0 && end > start, 'Missing RB sorting implementation');
const sortCode = app.slice(start, end);
const compareRb = runInNewContext('(() => { ' + sortCode + '; return compareRb; })()', {});
assert.equal(typeof compareRb, 'function');

const fixtures = [
  { id: 'unknown', over: false, rb: null },
  { id: 'low', over: false, rb: 3.0 },
  { id: 'above-1', over: true, rb: null },
  { id: 'high', over: false, rb: 13.0 },
  { id: 'above-2', over: true, rb: null },
];
const descending = [...fixtures].sort((a, b) => compareRb(a, b, true)).map(x => x.id);
const ascending = [...fixtures].sort((a, b) => compareRb(a, b, false)).map(x => x.id);
assert.deepEqual(descending, ['above-1', 'above-2', 'high', 'low', 'unknown']);
assert.deepEqual(ascending, ['low', 'high', 'above-1', 'above-2', 'unknown']);
assert.equal(compareRb(fixtures[2], fixtures[4], true), 0);

assert.ok(app.includes("lang==='en'?tr.unknown"), 'Unknown RB must use English copy in English mode');
assert.ok(app.includes('No vehicles match these filters.'), 'Missing English empty-state copy');
assert.ok(app.includes('没有符合条件的载具'), 'Missing Chinese empty-state copy');
console.log('OK: JavaScript parses; ascending/descending RB sorts; English fallback and empty states');
