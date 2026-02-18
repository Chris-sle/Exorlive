import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // valgfritt, men greit å være eksplisitt
    proxy: {
      "/api": {
        target: "https://localhost:7061", // URL til .NET API-et ditt
        changeOrigin: true,
        secure: false, // fordi du bruker https med dev-sertifikat
      },
    },
  },
});