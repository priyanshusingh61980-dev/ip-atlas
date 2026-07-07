#!/usr/bin/env node
// @ts-check
/**
 * Bundle size gate.
 *
 * Sums gzipped sizes of `dist/assets/*.js` and `dist/assets/*.css` and compares
 * against the budgets set below. Exits non-zero on breach so CI fails fast.
 *
 * Budgets are deliberately tight for landing/search/maps surfaces. Raise them
 * here when product scope grows — never silently.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, extname } from "node:path";

const DIST_DIR = "dist/assets";
const BUDGETS = {
  js: 220 * 1024, // 220 KB gzipped
  css: 30 * 1024, // 30 KB gzipped
};

function gzipSize(file) {
  const buf = readFileSync(file);
  return gzipSync(buf, { level: 9 }).length;
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

try {
  statSync(DIST_DIR);
} catch {
  console.error(`[size] ${DIST_DIR} not found — run \`pnpm build\` first.`);
  process.exit(2);
}

const totals = { js: 0, css: 0 };
const entries = [];

for (const name of readdirSync(DIST_DIR)) {
  const full = join(DIST_DIR, name);
  const ext = extname(name).replace(".", "");
  if (ext !== "js" && ext !== "css") continue;
  if (name.endsWith(".map")) continue;
  const size = gzipSize(full);
  totals[ext] += size;
  entries.push({ name, ext, size });
}

entries.sort((a, b) => b.size - a.size);

console.log("Bundle (gzipped):");
for (const e of entries) {
  console.log(`  ${e.ext.toUpperCase().padEnd(3)}  ${fmt(e.size).padStart(10)}  ${e.name}`);
}
console.log("");
console.log(`Totals: JS ${fmt(totals.js)} / budget ${fmt(BUDGETS.js)}`);
console.log(`        CSS ${fmt(totals.css)} / budget ${fmt(BUDGETS.css)}`);

let breach = false;
if (totals.js > BUDGETS.js) {
  console.error(`\n✗ JS gzipped total ${fmt(totals.js)} exceeds budget ${fmt(BUDGETS.js)}`);
  breach = true;
}
if (totals.css > BUDGETS.css) {
  console.error(`\n✗ CSS gzipped total ${fmt(totals.css)} exceeds budget ${fmt(BUDGETS.css)}`);
  breach = true;
}
if (breach) process.exit(1);
console.log("\n✓ Within budget.");
