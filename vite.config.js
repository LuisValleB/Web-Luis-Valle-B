import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	// plugins: [cloudflare()], // Comentado temporalmente para evitar error EPERM en Windows
});
