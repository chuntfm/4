#!/usr/bin/env node
// Build script: reads slots.yaml and injects config into index.html
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const slotsRaw = fs.readFileSync('slots.yaml', 'utf8');
const slotsConfig = yaml.load(slotsRaw);

// assets_url: env var overrides yaml config; strip trailing slash
const assetsUrl = (process.env.ASSETS_URL || slotsConfig.assets_url || '').replace(/\/+$/, '');

// Remove assets_url from slot config (not a slot)
delete slotsConfig.assets_url;

let html = fs.readFileSync('index.template.html', 'utf8');
html = html.replace('__SLOTS_CONFIG__', JSON.stringify(slotsConfig));
html = html.replaceAll('__ASSETS_URL__', assetsUrl);

// Output to both root (local dev) and dist/ (CI deploy)
fs.writeFileSync('index.html', html);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

// Copy any local images if they exist
if (fs.existsSync('images')) {
  fs.cpSync('images', 'dist/images', { recursive: true });
}

console.log('Built index.html with slot config:', Object.keys(slotsConfig).map(k => `${k}: ${Array.isArray(slotsConfig[k]) ? slotsConfig[k].length + ' items' : slotsConfig[k]}`).join(', '));
console.log('Assets URL:', assetsUrl || '(local)');
