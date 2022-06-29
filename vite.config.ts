// @ts-ignore
// * No declaration file for less-vars-to-js
import react from '@vitejs/plugin-react';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import dts from 'vite-plugin-dts';
import vitePluginImp from 'vite-plugin-imp';
import Inspect from 'vite-plugin-inspect';
import reactJsx from 'vite-react-jsx';

const pathResolver = (path: string) => resolve(__dirname, path);
// antd主题覆盖文件
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./config/variables.less'), 'utf8'),
);
// 打包的入口文件
const entryDir = pathResolver('./src/components/');
// 组件名
const componentNames = require('./package.json').name;

export default defineConfig({
  base: './',
  plugins: [
    Inspect(),
    ViteAliases({}),
    reactJsx(),
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    dts({
      exclude: ['./src/App.tsx', './src/index.tsx', 'node_modules'],
    }),
    chunkSplitPlugin({ strategy: 'unbundle' }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'antd'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          react: 'React',
        },
      },
    },
    lib: {
      entry: path.resolve(entryDir, 'index.ts'),
      name: componentNames,
      fileName: (format) => `index.${format}.js`, // 输出文件名
      formats: ['es'],
    },
  },
});
