import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "fonts", "dubai");

const files = [
  {
    name: "Dubai-Regular.woff2",
    url: "https://assets.undrr.org/fonts/dubai/v1.0.0/Regular/Dubai-Regular.woff2",
  },
  {
    name: "Dubai-Bold.woff2",
    url: "https://assets.undrr.org/fonts/dubai/v1.0.0/Bold/Dubai-Bold.woff2",
  },
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const response = await fetch(file.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${file.url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outDir, file.name), buffer);
  console.log(`Wrote ${file.name} (${buffer.length} bytes)`);
}
