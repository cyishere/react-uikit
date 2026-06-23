import { spawn } from 'node:child_process';
import { watch } from 'node:fs';

// Styles are no longer bundled by tsup, so during `dev` we build them here and
// rebuild whenever a `.less` source changes:
//   - build/less.mjs          -> dist/styles.css (default theme)
//   - build/prepare-styles.mjs -> less/ and scss/ trees
const scripts = ['build/less.mjs', 'build/prepare-styles.mjs'];

function run(script) {
  return new Promise((resolve) => {
    spawn('node', [script], { stdio: 'inherit' }).on('exit', resolve);
  });
}

let building = false;
let queued = false;

async function buildStyles() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  for (const script of scripts) {
    await run(script);
  }
  building = false;
  if (queued) {
    queued = false;
    buildStyles();
  }
}

// Initial build so the artifacts exist before the docs server requests them.
await buildStyles();

let timer;
watch('src', { recursive: true }, (_event, filename) => {
  if (!filename || !filename.endsWith('.less')) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`[styles] ${filename} changed, rebuilding…`);
    buildStyles();
  }, 100);
});

console.log('[styles] watching src for .less changes');
