import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { builtinModules } from 'module';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/main.ts',
  external: [
    ...Object.keys(pkg.devDependencies),  
    ...Object.keys(pkg.peerDependencies), 
    ...builtinModules                  
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false,
    // banner: '#!/usr/bin/env node'
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser()
  ]
};