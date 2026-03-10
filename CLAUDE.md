# ChuntFM 4 Year Anniversary Page

Static GitHub Pages site for ChuntFM's 4th anniversary celebration.

## Architecture
- Pure HTML/CSS/JS, no framework
- `index.template.html` is the source template
- `slots.yaml` configures the slot machine (edit before building)
- `build.js` injects slot config into template, outputs `index.html`
- `index.html` is the built output served by GitHub Pages

## Build
```
npm install
npm run build
```

## Key decisions
- Slot machine config is baked in at build time (no YAML parser in browser)
- Schedule API is fetched client-side, filtering out `chunt4.org` events
- Day counter counts UTC days since 2022-03-14
- Auto light/dark via `prefers-color-scheme`
- Floating SVG logos fetched from chunt.org

## Files
- `tasks/` - task tracking and lessons learned
