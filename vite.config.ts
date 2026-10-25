import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],// This blocks esbuild from searching for the missing Replit monorepo path
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        target: 'esnext',
        moduleResolution: 'node',
        jsx: 'react-jsx'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@workspace/api-client-react': path.resolve(__dirname, './src/api-fallback.ts')
    },
  },
  build: {
    // This forces Vite to compile explicitly into the dist/public folder structure
    outDir: 'dist/public',
    emptyOutDir: true
  }
});
