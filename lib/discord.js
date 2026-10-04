/** Discord é um aviso opcional; o registro oficial continua no Redis. */
export async function notifyDiscord({ project, text, locale, at }) {
    const webhook = process.env[project.discordEnv] || process.env.DISCORD_FEEDBACK_WEBHOOK_URL;
    if (!webhook) return;

    try {
        const url = new URL(webhook);
        if (url.protocol !== 'https:' || url.hostname !== 'discord.com'
            || !/^\/api\/webhooks\/\d+\/[\w-]+$/.test(url.pathname)) return;

        url.search = '';
        url.hash = '';
        url.searchParams.set('wait', 'true');
        // Menções do remetente nunca acionam notificações no servidor.
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                allowed_mentions: { parse: [] },
                embeds: [{
                    title: `Nova sugestão — ${project.name}`,
                    description: text,
                    color: 0x8b5cf6,
                    footer: { text: [project.id, locale?.toUpperCase()].filter(Boolean).join(' · ') },
                    timestamp: at,
                }],
            }),
            signal: AbortSignal.timeout(4000),
            redirect: 'error',
        });
        if (!response.ok) throw new Error('discord_unavailable');
    } catch {
        // Falha no canal não deve induzir a pessoa a reenviar algo já salvo.
    }
}
