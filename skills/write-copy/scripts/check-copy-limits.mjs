#!/usr/bin/env node
// check-copy-limits.mjs — validate copy files against platform character limits.
//
// Usage:
//   node check-copy-limits.mjs <copy-file.md> [more files...]
//
// Reads every markdown table row shaped `| field | variant | text |` where `field` is a key
// like `meta.headline`. Recommended limits produce warnings; hard limits produce errors and
// exit code 1. Override or extend limits with ./copy-limits.json in the working directory:
//   { "meta.headline": { "recommended": 40 }, "x.post": { "hard": 280 } }
// Built-in defaults mirror CONVENTIONS.md "Copy limits".

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_LIMITS = {
  "meta.primary_text": { recommended: 125 },
  "meta.headline": { recommended: 27 },
  "meta.description": { recommended: 27 },
  "google.rsa_headline": { hard: 30 },
  "google.rsa_description": { hard: 90 },
  "google.path": { hard: 15 },
  "linkedin.intro": { recommended: 150, hard: 600 },
  "linkedin.headline": { recommended: 70, hard: 200 },
  "instagram.caption": { recommended: 125, hard: 2200 },
  "instagram.hashtags": { recommended: 5, hard: 30 }, // counted inside instagram.caption
  "tiktok.caption": { recommended: 100, hard: 2200 },
  "youtube.title": { recommended: 60, hard: 100 },
  "x.post": { hard: 280 },
  "email.subject": { recommended: 45 },
};
const UNCHECKED_PREFIXES = ["onscreen."];

function loadLimits() {
  const limits = structuredClone(DEFAULT_LIMITS);
  const overridePath = resolve(process.cwd(), "copy-limits.json");
  if (existsSync(overridePath)) {
    const overrides = JSON.parse(readFileSync(overridePath, "utf8"));
    for (const [key, value] of Object.entries(overrides)) {
      limits[key] = { ...(limits[key] ?? {}), ...value };
    }
  }
  return limits;
}

// Split a markdown table row on unescaped pipes.
function splitRow(line) {
  const cells = [];
  let current = "";
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "\\" && line[i + 1] === "|") {
      current += "|";
      i++;
    } else if (ch === "|") {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);
  // Drop the empty cells produced by the leading and trailing pipes.
  return cells.slice(1, -1).map((c) => c.trim());
}

const FIELD_RE = /^[a-z]+\.[a-z_]+$/;

function parseRows(file) {
  const rows = [];
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (!line.trim().startsWith("|")) return;
    const cells = splitRow(line.trim());
    if (cells.length < 3) return;
    const [field, variant, ...rest] = cells;
    if (!FIELD_RE.test(field)) return; // header, separator, or unrelated table
    if (!/^v\d+$/i.test(variant)) return; // field-key reference tables, etc.
    const text = rest.join(" | ").replace(/<br\s*\/?>/gi, "\n");
    rows.push({ file, line: idx + 1, field, variant, text });
  });
  return rows;
}

const length = (text) => [...text].length; // code points, so emoji count once
const hashtags = (text) => (text.match(/#[\p{L}\p{N}_]+/gu) ?? []).length;

function check(row, limits, findings) {
  const push = (level, measure, value, limit) =>
    findings.push({ ...row, level, measure, value, limit });

  if (UNCHECKED_PREFIXES.some((p) => row.field.startsWith(p))) return;
  const limit = limits[row.field];
  if (!limit) {
    push("warn", "unknown field key", "-", "see campaign-copy.md");
    return;
  }
  if (row.text === "") {
    push("error", "empty text", 0, "-");
    return;
  }
  const n = length(row.text);
  if (limit.hard !== undefined && n > limit.hard) push("error", "chars > hard", n, limit.hard);
  else if (limit.recommended !== undefined && n > limit.recommended)
    push("warn", "chars > recommended", n, limit.recommended);

  if (row.field === "instagram.caption") {
    const tagLimit = limits["instagram.hashtags"] ?? {};
    const tags = hashtags(row.text);
    if (tagLimit.hard !== undefined && tags > tagLimit.hard) push("error", "hashtags > hard", tags, tagLimit.hard);
    else if (tagLimit.recommended !== undefined && tags > tagLimit.recommended)
      push("warn", "hashtags > recommended", tags, tagLimit.recommended);
  }
}

function main() {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error("usage: node check-copy-limits.mjs <copy-file.md> [more files...]");
    process.exit(2);
  }
  const limits = loadLimits();
  const findings = [];
  let rowCount = 0;
  for (const file of files) {
    if (!existsSync(file)) {
      console.error(`not found: ${file}`);
      process.exit(2);
    }
    const rows = parseRows(file);
    if (rows.length === 0) console.warn(`warning: no copy rows found in ${file}`);
    rowCount += rows.length;
    rows.forEach((row) => check(row, limits, findings));
  }

  const errors = findings.filter((f) => f.level === "error").length;
  const warnings = findings.length - errors;

  if (findings.length > 0) {
    console.log("| level | file:line | field | variant | check | value | limit |");
    console.log("|---|---|---|---|---|---|---|");
    for (const f of findings) {
      console.log(`| ${f.level} | ${f.file}:${f.line} | ${f.field} | ${f.variant} | ${f.measure} | ${f.value} | ${f.limit} |`);
    }
    console.log("");
  }
  console.log(`${rowCount} rows checked in ${files.length} file(s): ${errors} error(s), ${warnings} warning(s)`);
  process.exit(errors > 0 ? 1 : 0);
}

main();
