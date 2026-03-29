import fs from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve(process.cwd(), "data");

export async function readJSON(file) {
  const raw = await fs.readFile(path.join(dataDir, file), "utf-8");
  return JSON.parse(raw);
}

export async function writeJSON(file, data) {
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

export async function getProducts() {
  return readJSON("products.json");
}

export async function getEvents() {
  return readJSON("events.json");
}
