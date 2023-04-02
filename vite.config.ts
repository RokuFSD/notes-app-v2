/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// const runtimeCaching = [
//   {
//     handler: "NetworkOnly",
//     method: "POST",
//     urlPattern: /\/graphql/,
//     options: {
//       backgroundSync: {
//         name: "graphql",
//         options: {
//           maxRetentionTime: 24 * 60,
//           onSync: async ({ queue }) => {
//             const entry = await queue.shiftRequest();
//             if (entry) {
//               const response = await fetch(entry.request);
//               if (!response.ok) {
//                 return await queue.unshiftRequest(entry);
//               }
//               // Merge data
//               response.clone().json().then(data => {
//                 // Merge data
//
//               });
//             }
//           }
//         }
//       }
//     }
//   }
// ];

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    react(),
    VitePWA({
      scope: "/",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "NP App",
        display: "standalone",
        short_name: "NP App",
        description: "A different kind of note taking app",
        theme_color: "#001f20",
        background_color: "#001f20",
        // The icons are in src/assets directory
        icons: [
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    mkcert()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"]
  },
  build: {
    target: "esnext"
  }
});
