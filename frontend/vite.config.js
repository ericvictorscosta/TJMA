import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'lucide-react']
  }
});
