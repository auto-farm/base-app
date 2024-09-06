import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'cjs' }],
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
  },
];
