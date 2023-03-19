import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 宿主机修改文件后，虚拟机中的 vite 无法检测到文件变化，需要手动刷新浏览器
  server: {
    watch: {
      usePolling: true,
    },
  },
});
