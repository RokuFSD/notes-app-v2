/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [
    react(),
    VitePWA({
      scope: "/",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            method: "POST",
            urlPattern: /http:\/\/localhost:8173\/graphql/,
            handler: "NetworkOnly",
            options: {
              cacheName: "graphql",
              backgroundSync: {
                name: "mutations",
                options: {
                  maxRetentionTime: 24 * 60,
                  onSync: async ({ queue }) => {
                    // Debugging
                    const entry = await queue.shiftRequest();
                    if (!entry) return;
                    const metadata = JSON.parse(
                      entry.request.headers.get("metadata")!
                    ) as object;
                    // eslint-disable-next-line no-prototype-builtins
                    if (entry && metadata.hasOwnProperty("type")) {
                      if ((metadata as { type: string }).type !== "mutation")
                        return;
                      const response = await fetch(entry.request);
                      if (!response.ok) {
                        return await queue.unshiftRequest(entry);
                      }
                    }
                  },
                },
              },
            },
          },
        ],
      },
      manifest: {
        name: "NP App",
        display: "standalone",
        short_name: "NP App",
        description: "A different kind of note taking app",
        theme_color: "#001f20",
        background_color: "#001f20",
        icons: [
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    mkcert(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
  build: {
    target: "esnext",
  },
});
