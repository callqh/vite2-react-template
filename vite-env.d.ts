/// <reference types="vite-plugin-pages/client-react" />

declare module 'less-vars-to-js';
declare module '~react-pages';

declare module '*.md' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}
