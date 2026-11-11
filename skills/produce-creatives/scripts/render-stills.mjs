#!/usr/bin/env node
// render-stills.mjs — render static creatives to PNG with Playwright.
//
// Usage (run from the client's studio/creatives/ directory, where Playwright is installed):
//   node render-stills.mjs <manifest.json> [--scale 2] [--base http://localhost:5173]
//
// Each manifest entry is one of two shapes:
//
// 1. Template entry (preferred) — rendered through the studio's /render route:
//    { "id": "03-static-01", "template": "SingleImage", "size": "1080x1350",
//      "props": { "headline": "...", "image": "...", "cta": "..." },
//      "out": "../../campaigns/03-x/design/03-static-01/03-static-01-1080x1350-v1.png" }
//    URL = <base>/render?template=<name>&size=<WxH>&props=<url-encoded JSON>
//    `base` comes from --base, or a top-level { "base": "...", "items": [...] } manifest.
//
// 2. URL entry — any page:
//    { "id": "...", "url": "http://... | file://... | ./local.html", "width": 1080, "height": 1350, "out": "..." }
//
// The manifest is either an array of entries or { "base"?: string, "items": [...] }.
// Relative `out` paths and local HTML paths resolve against the manifest's directory.
// Output pixel size = width × scale by height × scale.

import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

function parseArgs(argv) {
  const args = { manifest: null, scale: 2, base: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--scale") args.scale = Number(argv[++i]);
    else if (a.startsWith("--scale=")) args.scale = Number(a.split("=")[1]);
    else if (a === "--base") args.base = argv[++i];
    else if (a.startsWith("--base=")) args.base = a.slice("--base=".length);
    else if (!args.manifest) args.manifest = a;
  }
  if (!args.manifest) {
    console.error("usage: node render-stills.mjs <manifest.json> [--scale 2] [--base http://localhost:5173]");
    process.exit(2);
  }
  if (!Number.isFinite(args.scale) || args.scale < 1 || args.scale > 4) {
    console.error(`invalid --scale ${args.scale}; use 1–4`);
    process.exit(2);
  }
  return args;
}

// Load Playwright from the current project (studio/creatives), not from this plugin.
function loadPlaywright() {
  const require = createRequire(resolve(process.cwd(), "package.json"));
  try {
    return require("playwright");
  } catch {
    console.error(
      [
        "Playwright is not installed in this directory (" + process.cwd() + ").",
        "Run this from clients/<client>/studio/creatives/ after installing it there:",
        "  npm i -D playwright && npx playwright install chromium",
      ].join("\n"),
    );
    process.exit(3);
  }
}

function toUrl(url, baseDir) {
  if (/^(https?|file):\/\//.test(url)) return url;
  const path = resolve(baseDir, url);
  if (!existsSync(path)) throw new Error(`local file not found: ${path}`);
  return pathToFileURL(path).href;
}

// Normalise both entry shapes to { id, url, width, height, out }.
export function normalise(entry, i, base) {
  const need = (key) => {
    if (entry[key] === undefined || entry[key] === "") throw new Error(`manifest[${i}] missing "${key}"`);
  };
  need("id");
  need("out");
  if (entry.template !== undefined) {
    need("size");
    const m = /^(\d+)x(\d+)$/.exec(entry.size);
    if (!m) throw new Error(`manifest[${i}] (${entry.id}): size must be "<W>x<H>", got "${entry.size}"`);
    if (!base) throw new Error(`manifest[${i}] (${entry.id}): template entries need --base or a manifest "base"`);
    const query = new URLSearchParams({
      template: entry.template,
      size: entry.size,
      props: JSON.stringify(entry.props ?? {}),
    });
    return {
      id: entry.id,
      url: `${base.replace(/\/+$/, "")}/render?${query}`,
      width: Number(m[1]),
      height: Number(m[2]),
      out: entry.out,
    };
  }
  need("url");
  need("width");
  need("height");
  if (!Number.isInteger(entry.width) || !Number.isInteger(entry.height))
    throw new Error(`manifest[${i}] (${entry.id}): width and height must be integers`);
  return { id: entry.id, url: entry.url, width: entry.width, height: entry.height, out: entry.out };
}

async function main() {
  const { manifest, scale, base: baseArg } = parseArgs(process.argv.slice(2));
  const manifestPath = resolve(manifest);
  const baseDir = dirname(manifestPath);
  const raw = JSON.parse(readFileSync(manifestPath, "utf8"));
  const items = Array.isArray(raw) ? raw : raw.items;
  const base = baseArg ?? (Array.isArray(raw) ? null : raw.base) ?? null;
  if (!Array.isArray(items) || items.length === 0) throw new Error("manifest must be a non-empty array (or { items: [...] })");
  const entries = items.map((e, i) => normalise(e, i, base));

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  let failed = 0;
  try {
    for (const entry of entries) {
      const out = resolve(baseDir, entry.out);
      mkdirSync(dirname(out), { recursive: true });
      const context = await browser.newContext({
        viewport: { width: entry.width, height: entry.height },
        deviceScaleFactor: scale,
      });
      const page = await context.newPage();
      try {
        await page.goto(toUrl(entry.url, baseDir), { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready); // web fonts must be loaded before capture
        await page.screenshot({ path: out, clip: { x: 0, y: 0, width: entry.width, height: entry.height } });
        console.log(`ok   ${entry.id} → ${out} (${entry.width * scale}×${entry.height * scale})`);
      } catch (err) {
        failed++;
        console.error(`FAIL ${entry.id}: ${err.message}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`${entries.length - failed}/${entries.length} rendered at scale ${scale}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
