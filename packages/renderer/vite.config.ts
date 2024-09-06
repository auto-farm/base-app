import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    define: {
      __API_URL__: JSON.stringify(env.API_URL ?? 'http://localhost:8081'),
      __WS_URL__: JSON.stringify(env.WS_URL ?? 'ws://localhost:8081'),
      __NODE_ENV__: JSON.stringify(env.NODE_ENV ?? 'development'),
    },
    base: './',
    server: {
      host: '0.0.0.0',
      watch: {
        usePolling: true,
      },
    },
  };
});
