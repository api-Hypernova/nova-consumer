#!/usr/bin/env node
// Fails (exit 1) when the language files are out of step: a language without a dictionary, a text missing or
// empty in any language, or a number placeholder (#) lost in translation. Run: npm run check:i18n
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'i18n');
const problems = [];
const langs = [...fs.readFileSync(path.join(dir, 'languages.ts'), 'utf8').matchAll(/code: '([^']+)'/g)].map(m => m[1]).filter(c => c !== 'en');
const registry = fs.readFileSync(path.join(dir, 'dictionary.ts'), 'utf8');
const dicts = {};
for (const l of langs) {
  const f = path.join(dir, 'dict', `${l}.json`);
  if (!fs.existsSync(f)) { problems.push(`${l}: no dictionary file dict/${l}.json`); continue; }
  if (!registry.includes(`require('./dict/${l}.json')`)) problems.push(`${l}: not registered in dictionary.ts`);
  try { dicts[l] = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { problems.push(`${l}: unreadable JSON (${e.message})`); }
}
const keys = new Set();
for (const d of Object.values(dicts)) for (const k of Object.keys(d)) keys.add(k);
const hashes = s => (s.match(/#/g) || []).length;
for (const [l, d] of Object.entries(dicts)) {
  const missing = [...keys].filter(k => !(k in d));
  if (missing.length) problems.push(`${l}: ${missing.length} text(s) missing, e.g. "${missing[0]}"`);
  for (const [k, v] of Object.entries(d)) {
    if (typeof v !== 'string' || !v.trim()) problems.push(`${l}: empty translation for "${k}"`);
    else if (hashes(k) !== hashes(v)) problems.push(`${l}: number placeholder lost in "${k}" -> "${v}"`);
  }
}
if (problems.length) {
  console.error(`i18n check FAILED (${problems.length}):\n  ` + problems.slice(0, 40).join('\n  '));
  process.exit(1);
}
console.log(`i18n check OK: ${langs.length + 1} languages, ${keys.size} texts each`);
