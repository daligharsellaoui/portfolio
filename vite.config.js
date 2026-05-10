import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content, filePath) => {
          if (filePath.endsWith('main.scss') || filePath.includes('_variables')) {
            return content
          }
          return `@use "@/styles/_variables.scss" as *;\n${content}`
        },
        api: 'modern-compiler'
      }
    }
  }
})