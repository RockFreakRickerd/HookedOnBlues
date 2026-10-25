import { mkdirSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "/public");

const routes = ["links", "images"];

for (const route of routes) {
  mkdirSync(`${distDir}/${route}`, { recursive: true });
  copyFileSync(`${distDir}/index.html`, `${distDir}/${route}/index.html`);
  console.log(`✓ copied index.html → ${route}/index.html`);
}
