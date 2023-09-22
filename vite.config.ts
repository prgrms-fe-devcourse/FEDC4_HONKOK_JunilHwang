import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const { VITE_API_END_POINT } = env;

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }]
    },
    server: {
      proxy: {
        '/api': {
          target: VITE_API_END_POINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
