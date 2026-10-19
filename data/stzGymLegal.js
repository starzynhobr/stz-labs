/**
 * STZ Gym — política de privacidade e exclusão de conta.
 * O app existe em PT e EN; os demais idiomas do site mostram a versão em inglês.
 * Ao mudar o que o app coleta ou apaga, atualize aqui e em `updated`.
 */

import { GYM_SLUG } from './stzGym';

export const GYM_CONTACT_EMAIL = 'contato@stzlabs.com';

const LEGAL_PATHS = { privacy: 'privacy', deleteAccount: 'delete-account' };

export const gymLegalPath = (locale, page) => `/${locale}/projects/${GYM_SLUG}/${LEGAL_PATHS[page]}`;

const pt = {
    nav: { privacy: 'Política de privacidade', deleteAccount: 'Excluir conta' },
    updatedLabel: 'Atualizado em',
    updated: '19 de outubro de 2026',
    privacy: {
        title: 'STZ Gym — Política de Privacidade',
        description: 'Quais dados o STZ Gym usa, onde ficam e como apagá-los.',
        intro: 'O STZ Gym é um app de treino, nutrição e progressão gamificada desenvolvido pela STZ LABS. Esta página explica quais dados o app usa, para quê, onde eles ficam e como você pode apagá-los.',
        sections: [
            {
                title: 'Dados que ficam só no seu aparelho',
                paragraphs: ['A maior parte do app funciona localmente. Ficam no banco de dados do aparelho:'],
                items: [
                    'Seu perfil físico: data de nascimento, altura, peso, sexo (opcional) e objetivo.',
                    'Plano de treino, treinos feitos, séries, cargas, repetições e corridas registradas.',
                    'Nutrição: rotina de refeições, refeições marcadas, água e preferências alimentares.',
                    'Preferências do app: tema, idioma, lembretes e configurações.',
                ],
            },
            {
                title: 'Dados enviados aos nossos servidores',
                paragraphs: ['Quando você usa recursos online, alguns dados saem do aparelho:'],
                items: [
                    'Conta: ao entrar com o Google, recebemos pelo Firebase Authentication um identificador da conta, seu e-mail e seu nome. Sem login, o app cria um identificador anônimo.',
                    'Backup na nuvem (Google Cloud Firestore): com login, uma cópia do seu perfil (nome, peso e altura), preferências, plano atual, metas, progresso (nível, XP e sequência) e nutrição (perfil, rotina e registro do dia), para restaurar em outro aparelho.',
                    'Progressão competitiva (Supabase): os treinos concluídos (exercícios, séries e horários) são enviados para calcular poder, rank, liga, moedas e gemas no servidor, que é quem valida o progresso.',
                    'Perfil público: nome de exibição, @usuário, nível, título, rank, borda de avatar e posição na liga ficam visíveis para outros usuários na liga, na lista de amigos e no cartão de jogador.',
                    'Amigos: pedidos de amizade, amizades e bloqueios.',
                ],
            },
            {
                title: 'Health Connect (corridas)',
                paragraphs: [
                    'Se você permitir, o app lê do Health Connect, no Android, suas sessões de exercício de corrida e os dados delas: distância, passos, velocidade, calorias gastas, ganho de elevação e o trajeto. O app só lê; nunca grava no Health Connect.',
                    'Esses dados servem só para mostrar suas corridas no app e montar o card de compartilhamento que você escolher gerar. O resumo de cada corrida (distância, duração e ritmo) fica no aparelho; o trajeto é carregado na hora e mantido só na memória, e você pode ocultar os trechos perto de locais que marcar como sensíveis (como casa e trabalho), que também ficam só no aparelho. Nada disso é enviado aos nossos servidores, usado para publicidade ou compartilhado com terceiros. Você pode revogar o acesso a qualquer momento nas configurações do Health Connect.',
                ],
            },
            {
                title: 'Diagnóstico e estatísticas de uso',
                paragraphs: ['Usamos o Firebase Crashlytics para receber relatórios de falhas (dados técnicos do aparelho e do erro) e o Google Analytics for Firebase para estatísticas de uso do app (eventos como treino concluído ou conquista desbloqueada, com um identificador da instalação). Esses dados servem para corrigir erros e melhorar o app.'],
            },
            {
                title: 'Permissões do aparelho',
                items: [
                    'Câmera: só para ler QR codes de amigos e de treinos compartilhados. As imagens não são salvas nem enviadas.',
                    'Fotos: só quando você escolhe uma imagem para o card de compartilhamento de corrida. A imagem não é enviada aos nossos servidores.',
                    'Notificações: lembretes de treino, água e refeições, agendados no próprio aparelho.',
                ],
            },
            {
                title: 'O que não fazemos',
                items: [
                    'Não vendemos seus dados.',
                    'Não exibimos anúncios.',
                    'Não usamos seus dados de treino ou saúde para publicidade.',
                ],
            },
            {
                title: 'Com quem os dados são processados',
                paragraphs: ['Os dados online são processados pelo Google (Firebase Authentication, Cloud Firestore, Crashlytics e Analytics) e pelo Supabase, que hospedam a infraestrutura do app. Eles só tratam os dados para operar esses serviços.'],
            },
            {
                title: 'Retenção e exclusão',
                paragraphs: [
                    'Os dados do servidor ficam guardados enquanto sua conta existir. Ao excluir a conta, apagamos sua conta, o backup na nuvem e todos os seus dados de progressão, liga, amigos e compras. Os dados locais são apagados do aparelho.',
                    'Relatórios de falha e estatísticas de uso não ficam ligados ao seu e-mail e são mantidos pelo Google conforme a retenção do Firebase.',
                ],
                link: 'deleteAccount',
            },
            {
                title: 'Contato',
                paragraphs: ['Dúvidas ou pedidos sobre seus dados: {email}.'],
            },
        ],
    },
    deleteAccount: {
        title: 'STZ Gym — Excluir sua conta',
        description: 'Como excluir sua conta do STZ Gym e todos os dados ligados a ela.',
        intro: 'Você pode excluir sua conta do STZ Gym a qualquer momento. A exclusão é permanente e não pode ser desfeita.',
        sections: [
            {
                title: 'Pelo app',
                ordered: true,
                items: [
                    'Abra o STZ Gym e entre na aba Perfil.',
                    'Toque no ícone de engrenagem (Configurações).',
                    'Na seção Conta, toque em Excluir conta.',
                    'Digite EXCLUIR para confirmar. Se for pedido, entre de novo com o Google.',
                ],
            },
            {
                title: 'Sem o app',
                paragraphs: ['Se você não tem mais o app instalado, envie um e-mail para {email} a partir do endereço da sua conta Google, com o assunto "Excluir conta STZ Gym". Se não tiver acesso a esse e-mail, informe o @usuário. Confirmamos a exclusão em até 30 dias.'],
            },
            {
                title: 'O que é apagado',
                items: [
                    'Sua conta de login (Firebase Authentication).',
                    'O backup na nuvem (Cloud Firestore).',
                    'Treinos enviados, poder, rank, atributos, liga e histórico de temporadas, moedas, gemas, compras, missões, @usuário, perfil público, amigos e bloqueios (Supabase).',
                    'Os dados locais do app no aparelho em que você fez a exclusão.',
                ],
            },
            {
                title: 'O que pode ser mantido',
                paragraphs: ['Relatórios de falha e estatísticas de uso não ficam ligados ao seu e-mail e são mantidos pelo Google conforme a retenção do Firebase. Os dados locais de outros aparelhos em que você usou o app só somem ao desinstalar o app neles. Fora isso, nada ligado à sua conta fica guardado.'],
            },
        ],
    },
};

const en = {
    nav: { privacy: 'Privacy policy', deleteAccount: 'Delete account' },
    updatedLabel: 'Last updated',
    updated: 'October 19, 2026',
    privacy: {
        title: 'STZ Gym — Privacy Policy',
        description: 'What data STZ Gym uses, where it is kept and how to delete it.',
        intro: 'STZ Gym is a workout, nutrition and gamified progression app made by STZ LABS. This page explains what data the app uses, why, where it is kept and how you can delete it.',
        sections: [
            {
                title: 'Data that stays on your device',
                paragraphs: ['Most of the app works locally. These are kept in the database on your device:'],
                items: [
                    'Your body profile: birth date, height, weight, sex (optional) and goal.',
                    'Training plan, completed workouts, sets, loads, reps and logged runs.',
                    'Nutrition: meal routine, checked meals, water and food preferences.',
                    'App preferences: theme, language, reminders and settings.',
                ],
            },
            {
                title: 'Data sent to our servers',
                paragraphs: ['When you use online features, some data leaves your device:'],
                items: [
                    'Account: when you sign in with Google, Firebase Authentication gives us an account identifier, your email and your name. Without signing in, the app creates an anonymous identifier.',
                    'Cloud backup (Google Cloud Firestore): when signed in, a copy of your profile (name, weight and height), preferences, current plan, goals, progress (level, XP and streak) and nutrition (profile, routine and daily log), so you can restore it on another device.',
                    'Competitive progression (Supabase): completed workouts (exercises, sets and times) are sent so the server, which validates progress, can compute power, rank, league, coins and gems.',
                    'Public profile: display name, @username, level, title, rank, avatar border and league position are visible to other users in the league, the friends list and the player card.',
                    'Friends: friend requests, friendships and blocks.',
                ],
            },
            {
                title: 'Health Connect (runs)',
                paragraphs: [
                    'If you allow it, the app reads from Health Connect on Android your running exercise sessions and their data: distance, steps, speed, calories burned, elevation gained and the route. The app only reads; it never writes to Health Connect.',
                    'This data is only used to show your runs in the app and to build the share card you choose to create. Each run summary (distance, duration and pace) stays on the device; the route is loaded on demand and kept only in memory, and you can hide the parts near places you mark as sensitive (such as home and work), which also stay on the device. None of it is sent to our servers, used for advertising or shared with third parties. You can revoke access at any time in the Health Connect settings.',
                ],
            },
            {
                title: 'Diagnostics and usage statistics',
                paragraphs: ['We use Firebase Crashlytics to receive crash reports (technical device and error data) and Google Analytics for Firebase for app usage statistics (events such as a completed workout or an unlocked achievement, with an installation identifier). This data is used to fix bugs and improve the app.'],
            },
            {
                title: 'Device permissions',
                items: [
                    'Camera: only to read QR codes from friends and shared workouts. Images are not saved or sent.',
                    'Photos: only when you pick an image for the run share card. The image is not sent to our servers.',
                    'Notifications: workout, water and meal reminders, scheduled on the device itself.',
                ],
            },
            {
                title: 'What we do not do',
                items: [
                    'We do not sell your data.',
                    'We do not show ads.',
                    'We do not use your workout or health data for advertising.',
                ],
            },
            {
                title: 'Who processes the data',
                paragraphs: ['Online data is processed by Google (Firebase Authentication, Cloud Firestore, Crashlytics and Analytics) and by Supabase, which host the app infrastructure. They only handle the data to run these services.'],
            },
            {
                title: 'Retention and deletion',
                paragraphs: [
                    'Server data is kept while your account exists. When you delete your account, we delete the account, the cloud backup and all your progression, league, friends and purchase data. Local data is erased from the device.',
                    'Crash reports and usage statistics are not linked to your email and are kept by Google according to Firebase retention.',
                ],
                link: 'deleteAccount',
            },
            {
                title: 'Contact',
                paragraphs: ['Questions or requests about your data: {email}.'],
            },
        ],
    },
    deleteAccount: {
        title: 'STZ Gym — Delete your account',
        description: 'How to delete your STZ Gym account and all data linked to it.',
        intro: 'You can delete your STZ Gym account at any time. Deletion is permanent and cannot be undone.',
        sections: [
            {
                title: 'In the app',
                ordered: true,
                items: [
                    'Open STZ Gym and go to the Profile tab.',
                    'Tap the gear icon (Settings).',
                    'In the Account section, tap Delete account.',
                    'Type DELETE to confirm. If asked, sign in with Google again.',
                ],
            },
            {
                title: 'Without the app',
                paragraphs: ['If you no longer have the app installed, email {email} from your Google account address with the subject "Delete STZ Gym account". If you no longer have access to that email, include your @username. We confirm the deletion within 30 days.'],
            },
            {
                title: 'What is deleted',
                items: [
                    'Your sign-in account (Firebase Authentication).',
                    'The cloud backup (Cloud Firestore).',
                    'Sent workouts, power, rank, attributes, league and season history, coins, gems, purchases, missions, @username, public profile, friends and blocks (Supabase).',
                    'The app data on the device where you deleted the account.',
                ],
            },
            {
                title: 'What may be kept',
                paragraphs: ['Crash reports and usage statistics are not linked to your email and are kept by Google according to Firebase retention. Local data on other devices where you used the app is only removed when you uninstall the app there. Nothing else linked to your account is kept.'],
            },
        ],
    },
};

export const getGymLegal = (locale) => (locale === 'pt' ? pt : en);
