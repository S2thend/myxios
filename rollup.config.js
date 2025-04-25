import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import gzip from 'rollup-plugin-gzip';
import copy from 'rollup-plugin-copy';

export default [
  // UMD build for browsers (minified)
  {
    input: 'index.js',
    output: {
      name: 'myxios',
      file: 'dist/myxios.umd.min.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      gzip(),
      copy({
        targets: [
          { src: 'index.d.ts', dest: 'dist' }
        ]
      })
    ]
  },
  // ESM and CJS builds
  {
    input: 'index.js',
    output: [
      { file: 'dist/myxios.esm.js', format: 'es', exports: 'named', sourcemap: true },
      { file: 'dist/myxios.cjs.js', format: 'cjs', exports: 'named', sourcemap: true }
    ],
    plugins: [
      resolve(),
      commonjs(),
      copy({
        targets: [
          { src: 'index.d.ts', dest: 'dist' }
        ]
      })
    ]
  }
];