import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import { federationBuilder } from '@softarc/native-federation';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outputPath = path.join(projectRoot, 'dist');

// React 19 dropped .min.js suffixes — override NF's hardcoded React 18 paths
const react19FrameworkPlugin = {
  name: 'react',
  fileReplacements: {
    dev: {
      'node_modules/react/index.js': { file: 'node_modules/react/cjs/react.development.js' },
      'node_modules/react/jsx-dev-runtime.js': { file: 'node_modules/react/cjs/react-jsx-dev-runtime.development.js' },
      'node_modules/react/jsx-runtime.js': { file: 'node_modules/react/cjs/react-jsx-runtime.development.js' },
      'node_modules/react-dom/index.js': { file: 'node_modules/react-dom/cjs/react-dom.development.js' },
    },
    prod: {
      'node_modules/react/index.js': { file: 'node_modules/react/cjs/react.production.js' },
      'node_modules/react/jsx-dev-runtime.js': { file: 'node_modules/react/cjs/react-jsx-dev-runtime.production.js' },
      'node_modules/react/jsx-runtime.js': { file: 'node_modules/react/cjs/react-jsx-runtime.production.js' },
      'node_modules/react-dom/index.js': { file: 'node_modules/react-dom/cjs/react-dom.production.js' },
    },
  },
  needsCommonJsPlugin: true,
};

async function build() {
  await federationBuilder.init({
    options: {
      workspaceRoot: projectRoot,
      outputPath: 'dist',
      tsConfig: 'tsconfig.json',
      federationConfig: 'federation.config.js',
      verbose: false,
    },
    adapter: createEsBuildAdapter({
      plugins: [],
      frameworks: [react19FrameworkPlugin],
    }),
  });

  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true });
  }

  await esbuild.build({
    entryPoints: [path.join(projectRoot, 'src', 'main.tsx')],
    external: federationBuilder.externals,
    outdir: outputPath,
    bundle: true,
    platform: 'browser',
    format: 'esm',
    splitting: true,
    minify: false,
    sourcemap: true,
    jsx: 'transform',
    target: 'es2022',
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    mainFields: ['es2020', 'browser', 'module', 'main'],
    conditions: ['es2020', 'es2015', 'module'],
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.css': 'css',
    },
  });

  fs.copyFileSync(
    path.join(projectRoot, 'public', 'index.html'),
    path.join(outputPath, 'index.html')
  );

  await federationBuilder.build();

  console.log('Build complete → dist/');
}

build()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
