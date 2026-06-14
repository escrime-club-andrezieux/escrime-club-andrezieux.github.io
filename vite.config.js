import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` makes every asset URL in the build relative. The resulting
// `dist/` folder is therefore fully portable: it works hosted at a domain root,
// under a sub-path (e.g. https://user.github.io/ecab_site/), or even opened
// directly from disk — no extra configuration per host.
export default defineConfig({
  base: './',
  plugins: [react()],
})
