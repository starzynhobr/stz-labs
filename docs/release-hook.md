# Patch notes automáticos no Discord

`POST /api/release-hook` recebe o webhook `release` do GitHub e publica a release publicada no canal de patch-notes da ferramenta, como card "STZ Labs". Rascunhos e pré-releases são ignorados.

## Variáveis (Vercel)

| Variável | Uso |
|---|---|
| `GITHUB_RELEASES_WEBHOOK_SECRET` | segredo compartilhado com o GitHub; sem ele, toda chamada é recusada |
| `DISCORD_RELEASES_GF_UI_EDITOR_WEBHOOK_URL` | webhook "STZ Labs" do #patch-notes do GF UI |
| `DISCORD_RELEASES_STZ_DOWNLOADER_WEBHOOK_URL` | idem, STZ Downloader |
| `DISCORD_RELEASES_STZ_XML_TRANSLATOR_WEBHOOK_URL` | idem, STZ XML Translator |
| `DISCORD_RELEASES_STZ_PDF_SUITE_WEBHOOK_URL` | idem, STZ PDF Suite |
| `DISCORD_RELEASES_STZ_GYM_WEBHOOK_URL` | idem, STZ Gym (`gym-app`) |

Repositório sem variável configurada é ignorado. Os repositórios aceitos ficam em `lib/releaseHook.js`.

## GitHub

Em cada repositório: Settings → Webhooks → Add webhook

- Payload URL: `https://stzlabs.com/api/release-hook`
- Content type: `application/json`
- Secret: o mesmo valor de `GITHUB_RELEASES_WEBHOOK_SECRET`
- Events: "Let me select individual events" → **Releases**

Se o Discord falhar, a rota responde 502 e a entrega pode ser reenviada em Settings → Webhooks → Recent Deliveries.

Validação local: `node --experimental-vm-modules tests/release-hook.test.mjs`.
