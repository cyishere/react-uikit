import fs from 'node:fs/promises';
import path from 'node:path';

const SRC_DIR = 'src';
const LESS_OUT = 'less';
const SCSS_OUT = 'scss';

async function emptyDir(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      await fs.rm(path.join(dir, file), { recursive: true, force: true });
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

async function getLessFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  const files = [];
  for (const dirent of dirents) {
    if (dirent.isFile() && dirent.name.endsWith('.less')) {
      const relPath = path.relative(
        SRC_DIR,
        path.join(dirent.parentPath || dirent.path, dirent.name)
      );
      files.push(relPath);
    }
  }
  return files;
}

async function prepareStyles() {
  // Clear any stale output from a previous build (no-op on first run). The
  // per-file `fs.mkdir(..., { recursive: true })` in the loop below recreates
  // the directories as needed.
  await emptyDir(LESS_OUT);
  await emptyDir(SCSS_OUT);

  const lessFiles = await getLessFiles(SRC_DIR);

  for (const file of lessFiles) {
    const srcPath = path.join(SRC_DIR, file);
    const content = await fs.readFile(srcPath, 'utf-8');

    // For the shipped `less/` and `scss/` dirs, we want to flatten `styles/index.less`
    // to the root `index.less` so consumers can import `react-uikit/less/index.less`.
    let outRelPath = file;
    if (file === 'styles/index.less') {
      outRelPath = 'index.less';
    }

    // 1. Process Less output
    let lessContent = content;
    if (file === 'styles/index.less') {
      // Rewrite `../components` to `./components` because index.less moved up one level
      lessContent = lessContent.replace(/@import '\.\.\/components/g, "@import './components");
    }
    const lessDest = path.join(LESS_OUT, outRelPath);
    await fs.mkdir(path.dirname(lessDest), { recursive: true });
    await fs.writeFile(lessDest, lessContent);

    // 2. Process SCSS output
    let scssContent = lessContent;

    // a. Map UIkit's Less theme reference to the SCSS variables-only entry.
    //    Sass has no `(reference)` equivalent, so importing the full theme
    //    bundle would re-emit all of UIkit's CSS (the consumer already imports
    //    it). `variables-theme.scss` defines the theme variables — and pulls in
    //    the core variables — without emitting any CSS. Note the filename also
    //    differs: Less uses `uikit.theme.less`, SCSS uses `variables-theme.scss`.
    scssContent = scssContent.replace(
      /@import \(reference\) 'uikit\/src\/less\/uikit\.theme\.less';/g,
      "@import 'uikit/src/scss/variables-theme.scss';"
    );
    // b. Rewrite our own component `.less` import paths to `.scss` (scoped to
    //    import statements so it can't clobber other content).
    scssContent = scssContent.replace(/\.less';/g, ".scss';");
    // c. Convert Less variables (`@var`) to Sass variables (`$var`), leaving
    //    at-rules untouched. Partials are kept deliberately simple (variable
    //    references only — no Less functions, mixins, or escapes), so this naive
    //    conversion is sufficient.
    scssContent = scssContent.replace(/@([a-zA-Z0-9_-]+)/g, (match, p1) => {
      if (['import', 'media', 'keyframes', 'font-face', 'supports'].includes(p1)) {
        return match;
      }
      return `$${p1}`;
    });
    // d. Sass treats CSS custom property values as plain text, so a bare Sass
    //    variable there is emitted literally instead of evaluated. Interpolate
    //    `$var` inside `--custom-prop:` values with `#{…}` so themed values flow.
    scssContent = scssContent.replace(
      /(--[A-Za-z0-9_-]+:\s*)(\$[A-Za-z0-9_-]+)(\s*;)/g,
      '$1#{$2}$3'
    );

    const scssDest = path.join(SCSS_OUT, outRelPath.replace(/\.less$/, '.scss'));
    await fs.mkdir(path.dirname(scssDest), { recursive: true });
    await fs.writeFile(scssDest, scssContent);
  }

  console.log('Successfully prepared less/ and scss/ trees');
}

prepareStyles().catch((err) => {
  console.error(err);
  process.exit(1);
});
