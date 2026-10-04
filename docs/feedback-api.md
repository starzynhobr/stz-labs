# Feedback unificado

`GET /api/feedback/{project}` devolve `{ likes, votes }`. `POST` aceita os tipos `like`, `vote` e `suggestion`. Os IDs permitidos são `stz-gym`, `stz-downloader`, `stz-xml-translator` e `stz-pdf-suite`. Gym e Downloader mantêm suas opções de enquete; XML Translator e PDF Suite aceitam curtidas e sugestões, sem enquete nesta etapa.

```js
await fetch('/api/feedback/stz-pdf-suite', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'suggestion', text: 'Minha sugestão para o aplicativo', locale: 'pt' }),
});
```

As rotas `/api/gym-feedback` e `/api/downloader-feedback` continuam funcionando e compartilham exatamente os mesmos dados e limites com a API nova. As sugestões não são retornadas publicamente. O Redis guarda as últimas 1.000 por projeto; curtidas e votos mantêm as chaves atuais (`gym:*` e `downloader:*`). Os novos projetos usam `xml-translator:*` e `pdf-suite:*`.

## Configuração no servidor

Use `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`, ou as variáveis existentes `KV_REST_API_URL` e `KV_REST_API_TOKEN`. Sem Redis, a API retorna 503.

Crie um canal de texto e um webhook de entrada por software no Discord. Configure apenas no servidor/Vercel:

| Software | Variável |
| --- | --- |
| STZ Gym | `DISCORD_FEEDBACK_STZ_GYM_WEBHOOK_URL` |
| STZ Downloader | `DISCORD_FEEDBACK_STZ_DOWNLOADER_WEBHOOK_URL` |
| STZ XML Translator | `DISCORD_FEEDBACK_STZ_XML_TRANSLATOR_WEBHOOK_URL` |
| STZ PDF Suite | `DISCORD_FEEDBACK_STZ_PDF_SUITE_WEBHOOK_URL` |

`DISCORD_FEEDBACK_WEBHOOK_URL` é um fallback opcional para um canal compartilhado. Cada mensagem identifica o software. A implementação usa webhooks HTTPS de `discord.com/api/webhooks/...`, mensagens com embed e `allowed_mentions: { parse: [] }`; não exige bot nem biblioteca. [Contrato oficial do Discord](https://docs.discord.com/developers/resources/webhook#execute-webhook).

`TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` continuam opcionais: se presentes, o Telegram recebe também. Para concluir a migração, remova essas duas variáveis após validar o Discord. Nunca coloque tokens ou webhooks em `NEXT_PUBLIC_*`, no cliente ou no repositório.

## Proteções e limites

### Verificação em 2026-10-04

Os quatro webhooks foram criados nos canais privados do STZ Labs. As URLs estão no `.env.local` local, ignorado pelo Git, e nas variáveis **Secret / Production** do projeto Vercel. Publicação direta pela CLI em `stzlabs.com`, sem commit ou push. GET e POST dos quatro projetos retornaram 200 em produção em testes técnicos sem dados pessoais; as notificações foram verificadas nos canais privados. As rotas antigas e o Telegram foram preservados. A API está disponível para os quatro softwares; formulários de XML Translator/PDF Suite ainda não foram adicionados às respectivas páginas.

- 3 envios por hora, por IP e tipo, em cada projeto. O IP vira hash; a aplicação não armazena o endereço puro. Em produção, os headers de IP devem vir do proxy confiável da hospedagem.
- Payload limitado a 8 KiB, texto tipado e tamanho validado, IDs de projeto/opções permitidos e honeypot `website`.
- POST de navegador aceita a mesma origem. Para outras origens web autorizadas, `FEEDBACK_ALLOWED_ORIGINS` é uma lista separada por vírgula. Isso não habilita CORS; clientes web externos precisam de um proxy na própria origem. Apps nativos sem Origin podem usar a API pública sem segredo de servidor.
- Persistência vem antes dos avisos. Sucesso significa salvo no Redis; não confirma entrega ao Discord/Telegram. Avisos têm timeout de 4 segundos e não possuem fila, retry ou garantia de entrega nesta etapa. As duas integrações rodam em paralelo.

Likes e votos ficam só no Redis; sugestões vão aos canais configurados. Não envie dados sensíveis: o destino deve ser um canal privado enquanto o formulário não tiver consentimento explícito para publicação comunitária. A API não cria canais, servidores ou tópicos de fórum. Novos softwares entram pela allowlist em `lib/feedbackProjects.js`, com prefixo estável e sua variável de webhook.

Validação local, sem tocar em serviços externos: `node --experimental-vm-modules tests/feedback.test.mjs`, `npm run lint`, `npm run build`.
