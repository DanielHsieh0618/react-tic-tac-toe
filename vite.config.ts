import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/react-tic-tac-toe/', 
  plugins: [
    react(),
    sentryVitePlugin({
      org: "danielhsieh",
      project: "react-tic-tac-toe",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
