import { NextResponse } from "next/server";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req) {
  const { name, email, message } = await req.json().catch(() => ({}));

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID is not configured");
    return NextResponse.json({ error: "Форма временно недоступна" }, { status: 500 });
  }

  const text =
    `📩 <b>Новая заявка с сайта Grossline Pharm</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(name)}\n` +
    `<b>Email:</b> ${escapeHtml(email)}\n` +
    `<b>Сообщение:</b>\n${escapeHtml(message)}`;

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!tgRes.ok) {
    const errBody = await tgRes.text().catch(() => "");
    console.error("Telegram sendMessage failed:", tgRes.status, errBody);
    return NextResponse.json({ error: "Не удалось отправить сообщение" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
