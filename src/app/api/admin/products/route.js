import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";

const FILE = "products.json";

export async function GET() {
  return NextResponse.json(await readJSON(FILE));
}

export async function POST(req) {
  const body = await req.json();
  const data = await readJSON(FILE);
  data.push({ ...body, id: body.id || body.slug || String(Date.now()) });
  await writeJSON(FILE, data);
  return NextResponse.json(data.at(-1), { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();
  const data = await readJSON(FILE);
  const i = data.findIndex(p => p.id === body.id);
  if (i === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[i] = { ...data[i], ...body };
  await writeJSON(FILE, data);
  return NextResponse.json(data[i]);
}

export async function DELETE(req) {
  const { id } = await req.json();
  const data = await readJSON(FILE);
  await writeJSON(FILE, data.filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
