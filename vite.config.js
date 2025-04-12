import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./server/server.key"),
      cert: fs.readFileSync("./server/server.crt"),
    },
    port: 5174,
  },
  plugins: [react(), tailwindcss()],
});
