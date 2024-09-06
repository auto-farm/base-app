import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import path from 'path';

const subEntries = fs
  .readdirSync(path.resolve('src', 'entries'), { withFileTypes: true })
  .map((dirent) => ({
    dirent,
  }))
  .filter(({ dirent }) => dirent.isFile())
  .map(({ dirent }) => {
    return {
      input: `src/entries/${dirent.name}`,
      output: [{ file: `dist/${dirent.name.replace('.ts', '.js')}`, format: 'cjs' }],
      plugins: [
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        json(),
        typescript({
          tsconfig: './tsconfig.rollup.json',
        }),
        commonjs(),
        terser(),
      ],
    };
  });

const config = [
  ...subEntries,
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'cjs' }],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      json(),
      resolve({
        resolveOnly: ['@dashboard/common'],
      }),
      typescript({
        tsconfig: './tsconfig.rollup.json',
      }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/preload.ts',
    output: [{ file: 'dist/preload.js', format: 'cjs' }],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      json(),
      resolve({
        resolveOnly: ['@dashboard/common'],
      }),
      typescript({
        tsconfig: './tsconfig.rollup.json',
      }),
      commonjs(),
      terser(),
    ],
  },
];

export default config;
