#!/usr/bin/env node
// Build script: reads slots.yaml and injects config into index.html
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const slotsRaw = fs.readFileSync('slots.yaml', 'utf8');
const slotsConfig = yaml.load(slotsRaw);

let html = fs.readFileSync('index.template.html', 'utf8');
html = html.replace('__SLOTS_CONFIG__', JSON.stringify(slotsConfig));

// Output to both root (local dev) and dist/ (CI deploy)
fs.writeFileSync('index.html', html);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

// Copy any local images if they exist
if (fs.existsSync('images')) {
  fs.cpSync('images', 'dist/images', { recursive: true });
}

console.log('Built index.html with slot config:', Object.keys(slotsConfig).map(k => `${k}: ${slotsConfig[k].length} items`).join(', '));
