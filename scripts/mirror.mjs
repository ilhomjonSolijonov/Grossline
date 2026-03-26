import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import scrape from "website-scraper";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, "../public/mirror");

await fs.rm(outputDir, { recursive: true, force: true });

await scrape({
  urls: ["http://grossline.dst.uz/ru"],
  directory: outputDir,
  recursive: true,
  maxDepth: 2,
  prettifyUrls: true,
  request: {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8"
    }
  },
  urlFilter: (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname === "grossline.dst.uz";
    } catch {
      return false;
    }
  },
  sources: [
    { selector: "img", attr: "src" },
    { selector: "img", attr: "srcset" },
    { selector: "source", attr: "srcset" },
    { selector: "link[rel='stylesheet']", attr: "href" },
    { selector: "script", attr: "src" },
    { selector: "a", attr: "href" },
    { selector: "video", attr: "src" },
    { selector: "video source", attr: "src" }
  ]
});

console.log(`Mirror complete: ${outputDir}`);
