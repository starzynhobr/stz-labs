/**
 * Aviso privado no Telegram quando chega uma sugestão. Sem as duas variáveis
 * de ambiente, não faz nada — o Upstash continua sendo o registro oficial.
 */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TIMEOUT_MS = 4000;

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export async function notifyTelegram({ title, body, footer }) {
    if (!BOT_TOKEN || !CHAT_ID) return;

    const text = [`<b>${escapeHtml(title)}</b>`, escapeHtml(body), footer && `<i>${escapeHtml(footer)}</i>`]
        .filter(Boolean)
        .join('\n\n');

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
    } catch {
        // Falha no aviso não pode derrubar o envio: a sugestão já está salva.
    }
}
