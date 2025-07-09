import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'vite dev',
    port: 5173,
    reuseExistingServer: true,
  },
  testDir: './e2e',
})
