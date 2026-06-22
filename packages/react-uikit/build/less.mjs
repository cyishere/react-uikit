import fs from 'node:fs/promises';
import path from 'node:path';
import less from 'less';

const input = 'src/styles/index.less';
const output = 'dist/styles.css';

async function buildLess() {
  const code = await fs.readFile(input, 'utf-8');
  
  try {
    const result = await less.render(code, {
      filename: path.resolve(input),
      paths: [path.resolve(process.cwd(), 'node_modules')]
    });

    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, result.css);
    console.log(`Successfully built ${output}`);
  } catch (error) {
    console.error(`Failed to build less:`, error);
    process.exit(1);
  }
}

buildLess();
