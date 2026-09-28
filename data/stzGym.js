/**
 * STZ Gym — dados da prévia interativa (coming soon).
 * Paletas espelham lib/core/theme/app_colors.dart do app Flutter.
 */

export const GYM_SLUG = 'stz-gym';

export const GYM_THEMES = [
    { id: 'neon_blue', name: 'Neon Blue', primary: '#00D9FF', secondary: '#2787FF', unlock: { type: 'free' } },
    { id: 'peach', name: 'Peach', primary: '#FF6B6B', secondary: '#FFE66D', unlock: { type: 'achievement', key: 'healthyRoutine' } },
    { id: 'neon_green', name: 'Neon Green', primary: '#39FF14', secondary: '#00FF7F', unlock: { type: 'achievement', key: 'sevenDayStreak' } },
    { id: 'dark_red', name: 'Dark Red', primary: '#DC143C', secondary: '#FF1744', unlock: { type: 'rank', key: 'SSS' } },
    { id: 'purple', name: 'Purple', primary: '#C04BDB', secondary: '#E040FB', unlock: { type: 'achievement', key: 'firstFiveKm' } },
    { id: 'pink_velvet', name: 'Pink Velvet', primary: '#FF4FA3', secondary: '#FFC1D9', unlock: { type: 'coins', price: 1200 } },
    { id: 'capuccino', name: 'Capuccino', primary: '#C49A6C', secondary: '#D6B48C', unlock: { type: 'coins', price: 2000 } },
    { id: 'yellow', name: 'Yellow', primary: '#FFEB3B', secondary: '#FFC107', unlock: { type: 'achievement', key: 'completeTenMissions' } },
    { id: 'frost_white', name: 'Frost White', primary: '#29B6F6', secondary: '#B0BEC5', unlock: { type: 'coins', price: 800 } },
    { id: 'orange_premium', name: 'Orange Premium', primary: '#FF6D00', secondary: '#FFB74D', unlock: { type: 'gems', price: 60 } },
    { id: 'glass_aurora', name: 'Glass Aurora', primary: '#5CE0F3', secondary: '#8B6CFF', unlock: { type: 'gems', price: 90 } },
];

/** Bordas de avatar da loja (preços do app). `ring` é o gradiente desenhado em volta do avatar. */
export const GYM_BORDERS = [
    { id: 'border_bronze', name: { pt: 'Borda Bronze', en: 'Bronze Border' }, price: 50, ring: '#CD7F32, #8C5523, #CD7F32' },
    { id: 'border_silver', name: { pt: 'Borda Prata', en: 'Silver Border' }, price: 100, ring: '#E5E4E2, #8E8E8E, #E5E4E2' },
    { id: 'border_gold', name: { pt: 'Borda Dourada', en: 'Gold Border' }, price: 200, ring: '#FFD700, #B8860B, #FFD700' },
    { id: 'border_aura_solar', name: { pt: 'Aura Solar', en: 'Solar Aura' }, price: 320, ring: '#FFB300, #FF5722, #FFEB3B, #FFB300' },
    { id: 'border_aneis_oceanicos', name: { pt: 'Anéis Oceânicos', en: 'Ocean Rings' }, price: 380, ring: '#00BCD4, #1565C0, #4DD0E1, #00BCD4' },
    { id: 'border_onda_cosmica', name: { pt: 'Onda Cósmica', en: 'Cosmic Wave' }, price: 460, ring: '#7C4DFF, #00E5FF, #E040FB, #7C4DFF' },
    { id: 'border_vortice_magenta', name: { pt: 'Vórtice Magenta', en: 'Magenta Vortex' }, price: 520, ring: '#FF4081, #7B1FA2, #FF80AB, #FF4081' },
    { id: 'border_asas_flamejantes', name: { pt: 'Asas Flamejantes', en: 'Flaming Wings' }, price: 900, ring: '#FF1744, #FF9100, #FFEA00, #FF1744' },
];

export const GYM_POWERUPS = [
    { id: 'streak_shield', icon: 'shield', price: 150, name: { pt: 'Shield de Streak', en: 'Streak Shield' }, text: { pt: 'Protege seu streak por 1 dia perdido', en: 'Protects your streak for 1 missed day' } },
    { id: 'xp_boost', icon: 'bolt', price: 100, name: { pt: 'Boost de XP', en: 'XP Boost' }, text: { pt: 'Dobra o XP ganho no próximo treino', en: 'Doubles XP earned on your next workout' } },
];

/** Nome localizado de item da loja; o app existe em PT e EN. */
export const gymItemText = (value, locale) => value[locale === 'pt' ? 'pt' : 'en'];

/** Estado inicial da demo — nada é salvo, "Reiniciar" volta para cá. */
export const GYM_DEMO_START = {
    coins: 150,
    gems: 0,
    streak: 0,
    xp: 72,
    water: 0,
    meals: 0,
    missions: 0,
    border: null,
    ownedBorders: [],
    powerups: [],
};

export const GYM_LIMITS = { water: 2000, waterStep: 250, meals: 3, missions: 3, missionReward: 10 };

/** Planos da aba Treino. `day` indexa `copy.weekdays`; nomes de treino são os do app. */
export const GYM_PLANS = [
    {
        id: 'calisthenics', name: 'Calistenia',
        week: [
            { day: 0, workout: 'Calistenia Push', exercises: 4, minutes: 38 },
            { day: 1, workout: 'Calistenia Pull', exercises: 4, minutes: 43 },
            { day: 2, workout: 'Calistenia Pernas/Core', exercises: 4, minutes: 38 },
            { day: 3, workout: 'Calistenia Skills', exercises: 5, minutes: 45 },
            { day: 4, workout: 'Calistenia Full Body', exercises: 6, minutes: 50 },
        ],
    },
    {
        id: 'ppl', name: 'Push/Pull/Legs',
        week: [
            { day: 0, workout: 'Push', exercises: 6, minutes: 55 },
            { day: 1, workout: 'Pull', exercises: 6, minutes: 52 },
            { day: 2, workout: 'Legs', exercises: 5, minutes: 60 },
            { day: 3, workout: 'Push', exercises: 6, minutes: 55 },
            { day: 4, workout: 'Pull', exercises: 6, minutes: 52 },
        ],
    },
    {
        id: 'full_body', name: 'Full Body',
        week: [
            { day: 0, workout: 'Full Body A', exercises: 7, minutes: 60 },
            { day: 2, workout: 'Full Body B', exercises: 7, minutes: 58 },
            { day: 4, workout: 'Full Body C', exercises: 6, minutes: 55 },
        ],
    },
    {
        id: 'abc', name: 'ABC Workout',
        week: [
            { day: 0, workout: 'A — Peito/Tríceps', exercises: 6, minutes: 50 },
            { day: 1, workout: 'B — Costas/Bíceps', exercises: 6, minutes: 50 },
            { day: 2, workout: 'C — Pernas/Ombros', exercises: 7, minutes: 60 },
        ],
    },
];

/** Aba Corrida preenchida com uma semana de exemplo (o app real mostra o estado vazio). */
export const GYM_RUN_SAMPLE = {
    distance: '14.2 km', time: '1:18:40', pace: '5:32 /km', days: 3,
    records: [
        { label: '5K', value: '26:41' },
        { label: '10K', value: '57:12' },
    ],
    sessions: [
        { day: 4, km: '5.1 km', time: '27:55', pace: '5:28' },
        { day: 2, km: '4.0 km', time: '22:10', pace: '5:32' },
        { day: 0, km: '5.1 km', time: '28:35', pace: '5:36' },
    ],
};

/** Opções da enquete; a API aceita só estes ids. */
export const GYM_POLL_OPTIONS = ['training', 'running', 'nutrition', 'gamification'];

/** Textos de dentro do celular — o app existe em PT e EN; demais idiomas usam EN. */
const appCopy = {
    pt: {
        user: 'Alex', level: 'Lv. 1 • Iniciante', todayPlans: 'Planos de Hoje',
        hydration: 'Hidratação', meals: 'Refeições', missions: 'Missões',
        todayGoal: 'Meta de Hoje', kcal: 'kcal', protein: 'g proteína', fat: 'g gordura', carbs: 'g carboidrato',
        todayWorkout: 'Treino de Hoje', workoutName: 'Calistenia Push', exercises: '4 Exercícios', minutes: '~38 minutos',
        start: 'Iniciar', running: 'Corrida', runHint: 'Toque aqui para conectar suas fontes de saúde.',
        tabs: { home: 'Início', activities: 'Atividades', profile: 'Perfil' },
        onlyInApp: 'Disponível no app', missionDone: 'Missão concluída! +10 moedas',
        allDone: 'Dia completo! Sequência +1 🔥',
        activitiesTitle: 'Atividades', training: 'Treino',
        weekdays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        mainPlan: 'Plano principal', activePreset: 'Preset ativo', today: 'Hoje', planned: 'Planejado',
        exercisesN: 'Exercícios', minutesN: 'minutos', startWorkout: 'Iniciar treino', customize: 'Personalizar',
        showWeek: 'Ver semana completa', hideWeek: 'Ocultar semana', planChanged: 'Plano ativo:',
        weekSummary: 'Resumo da Semana', totalDistance: 'Distância total', totalTime: 'Tempo total',
        avgPace: 'Pace médio', runDays: 'Dias corridos', records: 'Recordes pessoais',
        recentSessions: 'Sessões recentes', sampleData: 'Dados de exemplo', connect: 'Conectar',
        share: 'Compartilhar plano', importPlan: 'Importar plano', listPlans: 'Todos os planos',
        store: 'Loja', back: 'Voltar',storeTabs: { borders: 'Bordas de Avatar', powerups: 'Power-ups', themes: 'Temas' },
        equipped: 'Equipado', equip: 'Equipar', active: 'Ativo',
        unlocks: { healthyRoutine: 'Hábitos Saudáveis', sevenDayStreak: '7 dias de sequência', firstFiveKm: 'PR 5K', completeTenMissions: '10 Missões', rank: 'Requer Rank' },
        notEnoughCoins: 'Moedas insuficientes — complete missões no Início', bought: 'Comprado:', activated: 'Ativado:',
        tryingTheme: 'Prévia do tema — desbloqueie no app',
        profileMenu: { rank: 'Rank', dashboard: 'Dashboard', editProfile: 'Editar Perfil', editPlan: 'Editar Plano', nutrition: 'Nutrição', achievements: 'Conquistas', skills: 'Árvore de Skills' },
        google: 'Google', connectAccount: 'Conectar', levelFull: 'Lv 1 • Iniciante',
    },
    en: {
        user: 'Alex', level: 'Lv. 1 • Beginner', todayPlans: "Today's Plans",
        hydration: 'Hydration', meals: 'Meals', missions: 'Missions',
        todayGoal: "Today's Goal", kcal: 'kcal', protein: 'g protein', fat: 'g fat', carbs: 'g carbs',
        todayWorkout: "Today's Workout", workoutName: 'Calisthenics Push', exercises: '4 Exercises', minutes: '~38 minutes',
        start: 'Start', running: 'Running', runHint: 'Tap here to connect your health sources.',
        tabs: { home: 'Home', activities: 'Activities', profile: 'Profile' },
        onlyInApp: 'Available in the app', missionDone: 'Mission complete! +10 coins',
        allDone: 'Day complete! Streak +1 🔥',
        activitiesTitle: 'Activities', training: 'Workout',
        weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        mainPlan: 'Main plan', activePreset: 'Active preset', today: 'Today', planned: 'Planned',
        exercisesN: 'Exercises', minutesN: 'minutes', startWorkout: 'Start workout', customize: 'Customize',
        showWeek: 'See full week', hideWeek: 'Hide week', planChanged: 'Active plan:',
        weekSummary: 'Weekly Summary', totalDistance: 'Total distance', totalTime: 'Total time',
        avgPace: 'Average pace', runDays: 'Run days', records: 'Personal records',
        recentSessions: 'Recent sessions', sampleData: 'Sample data', connect: 'Connect',
        share: 'Share plan', importPlan: 'Import plan', listPlans: 'All plans',
        store: 'Store', back: 'Back',storeTabs: { borders: 'Avatar Borders', powerups: 'Power-ups', themes: 'Themes' },
        equipped: 'Equipped', equip: 'Equip', active: 'Active',
        unlocks: { healthyRoutine: 'Healthy Habits', sevenDayStreak: '7-day streak', firstFiveKm: '5K PR', completeTenMissions: '10 Missions', rank: 'Requires Rank' },
        notEnoughCoins: 'Not enough coins — complete missions on Home', bought: 'Purchased:', activated: 'Activated:',
        tryingTheme: 'Theme preview — unlock it in the app',
        profileMenu: { rank: 'Rank', dashboard: 'Dashboard', editProfile: 'Edit Profile', editPlan: 'Edit Plan', nutrition: 'Nutrition', achievements: 'Achievements', skills: 'Skill Tree' },
        google: 'Google', connectAccount: 'Connect', levelFull: 'Lv 1 • Beginner',
    },
};

export const getGymAppCopy = (locale) => appCopy[locale] || appCopy.en;

/** Textos da página e do destaque na home. */
const pageCopy = {
    pt: {
        badge: 'Em breve', status: 'Em desenvolvimento · ainda não disponível para download', kicker: 'App de academia • Android',
        title: 'STZ Gym',
        tagline: 'Treino, hidratação, nutrição e corrida num app que transforma constância em progresso — com níveis, missões e temas para desbloquear.',
        cta: 'Ver prévia interativa', spotlightNote: 'Teste a prévia direto no navegador.',
        tryIt: 'Registre água e missões, ganhe moedas e gaste na loja do app.',
        themes: 'Temas do app', reset: 'Reiniciar demo',
        features: [
            { title: 'Treino do dia', text: 'Seu plano semanal organizado, com o treino de hoje a um toque.' },
            { title: 'Metas diárias', text: 'Hidratação, refeições e macros acompanhados sem planilha.' },
            { title: 'Gamificação', text: 'Moedas, sequência, níveis e conquistas para manter o ritmo.' },
            { title: 'Temas desbloqueáveis', text: 'Troque a cara do app com temas liberados pelo seu progresso.' },
        ],
        feedbackTitle: 'Ajude a moldar o STZ Gym', feedbackText: 'Sem cadastro. Um clique já ajuda.',
        like: 'Quero esse app', liked: 'Valeu!',
        pollTitle: 'O que mais te interessa?',
        poll: { training: 'Treinos', running: 'Corrida', nutrition: 'Nutrição', gamification: 'Gamificação' },
        suggestion: 'Tem uma ideia ou sugestão?', suggestionPlaceholder: 'Escreva aqui (opcional, anônimo)',
        send: 'Enviar', sent: 'Recebido, obrigado!',
        errorLimit: 'Muitos envios. Tente mais tarde.', errorGeneric: 'Não foi possível enviar agora.',
        offline: 'Feedback indisponível no momento.',
        phoneLabel: 'Prévia interativa do app STZ Gym',
    },
    en: {
        badge: 'Coming soon', status: 'In development · not yet available for download', kicker: 'Gym app • Android',
        title: 'STZ Gym',
        tagline: 'Workouts, hydration, nutrition and running in one app that turns consistency into progress — with levels, missions and unlockable themes.',
        cta: 'Try the interactive preview', spotlightNote: 'Try the preview right in your browser.',
        tryIt: 'Log water and missions, earn coins and spend them in the app store.',
        themes: 'App themes', reset: 'Reset demo',
        features: [
            { title: "Today's workout", text: "Your weekly plan, organized, with today's session one tap away." },
            { title: 'Daily goals', text: 'Hydration, meals and macros tracked without spreadsheets.' },
            { title: 'Gamification', text: 'Coins, streaks, levels and achievements to keep you going.' },
            { title: 'Unlockable themes', text: 'Change the look of the app with themes earned through progress.' },
        ],
        feedbackTitle: 'Help shape STZ Gym', feedbackText: 'No sign-up. One click already helps.',
        like: 'I want this app', liked: 'Thanks!',
        pollTitle: 'What interests you most?',
        poll: { training: 'Workouts', running: 'Running', nutrition: 'Nutrition', gamification: 'Gamification' },
        suggestion: 'Got an idea or suggestion?', suggestionPlaceholder: 'Write here (optional, anonymous)',
        send: 'Send', sent: 'Received, thank you!',
        errorLimit: 'Too many submissions. Try again later.', errorGeneric: "Couldn't send right now.",
        offline: 'Feedback is unavailable right now.',
        phoneLabel: 'STZ Gym app interactive preview',
    },
    es: {
        badge: 'Próximamente', status: 'En desarrollo · aún no disponible para descargar', kicker: 'App de gimnasio • Android',
        title: 'STZ Gym',
        tagline: 'Entrenamiento, hidratación, nutrición y carrera en una app que convierte la constancia en progreso, con niveles, misiones y temas desbloqueables.',
        cta: 'Ver vista previa interactiva', spotlightNote: 'Pruébala directamente en el navegador.',
        tryIt: 'Registra agua y misiones, gana monedas y gástalas en la tienda.',
        themes: 'Temas de la app', reset: 'Reiniciar demo',
        features: [
            { title: 'Entrenamiento del día', text: 'Tu plan semanal organizado, con el entrenamiento de hoy a un toque.' },
            { title: 'Metas diarias', text: 'Hidratación, comidas y macros sin hojas de cálculo.' },
            { title: 'Gamificación', text: 'Monedas, rachas, niveles y logros para mantener el ritmo.' },
            { title: 'Temas desbloqueables', text: 'Cambia el aspecto de la app con temas que ganas con tu progreso.' },
        ],
        feedbackTitle: 'Ayuda a dar forma a STZ Gym', feedbackText: 'Sin registro. Un clic ya ayuda.',
        like: 'Quiero esta app', liked: '¡Gracias!',
        pollTitle: '¿Qué te interesa más?',
        poll: { training: 'Entrenamientos', running: 'Carrera', nutrition: 'Nutrición', gamification: 'Gamificación' },
        suggestion: '¿Tienes una idea o sugerencia?', suggestionPlaceholder: 'Escribe aquí (opcional, anónimo)',
        send: 'Enviar', sent: '¡Recibido, gracias!',
        errorLimit: 'Demasiados envíos. Inténtalo más tarde.', errorGeneric: 'No se pudo enviar ahora.',
        offline: 'Comentarios no disponibles por ahora.',
        phoneLabel: 'Vista previa interactiva de la app STZ Gym',
    },
    fr: {
        badge: 'Bientôt', status: 'En développement · pas encore disponible au téléchargement', kicker: 'App de musculation • Android',
        title: 'STZ Gym',
        tagline: 'Entraînement, hydratation, nutrition et course dans une app qui transforme la régularité en progrès, avec niveaux, missions et thèmes à débloquer.',
        cta: 'Voir l’aperçu interactif', spotlightNote: 'Essayez l’aperçu directement dans le navigateur.',
        tryIt: 'Notez eau et missions, gagnez des pièces et dépensez-les en boutique.',
        themes: 'Thèmes de l’app', reset: 'Réinitialiser la démo',
        features: [
            { title: 'Séance du jour', text: 'Votre plan hebdomadaire organisé, la séance du jour à portée de doigt.' },
            { title: 'Objectifs quotidiens', text: 'Hydratation, repas et macros suivis sans tableur.' },
            { title: 'Gamification', text: 'Pièces, séries, niveaux et succès pour garder le rythme.' },
            { title: 'Thèmes à débloquer', text: 'Changez le look de l’app avec des thèmes gagnés en progressant.' },
        ],
        feedbackTitle: 'Aidez à façonner STZ Gym', feedbackText: 'Sans inscription. Un clic aide déjà.',
        like: 'Je veux cette app', liked: 'Merci !',
        pollTitle: 'Qu’est-ce qui vous intéresse le plus ?',
        poll: { training: 'Entraînements', running: 'Course', nutrition: 'Nutrition', gamification: 'Gamification' },
        suggestion: 'Une idée ou une suggestion ?', suggestionPlaceholder: 'Écrivez ici (facultatif, anonyme)',
        send: 'Envoyer', sent: 'Reçu, merci !',
        errorLimit: 'Trop d’envois. Réessayez plus tard.', errorGeneric: 'Envoi impossible pour le moment.',
        offline: 'Retours indisponibles pour le moment.',
        phoneLabel: 'Aperçu interactif de l’app STZ Gym',
    },
    de: {
        badge: 'Demnächst', status: 'In Entwicklung · noch nicht zum Download verfügbar', kicker: 'Fitness-App • Android',
        title: 'STZ Gym',
        tagline: 'Training, Trinken, Ernährung und Laufen in einer App, die Beständigkeit in Fortschritt verwandelt – mit Levels, Missionen und freischaltbaren Themes.',
        cta: 'Interaktive Vorschau ansehen', spotlightNote: 'Probiere die Vorschau direkt im Browser.',
        tryIt: 'Trage Wasser und Missionen ein, sammle Münzen und gib sie im Shop aus.',
        themes: 'App-Themes', reset: 'Demo zurücksetzen',
        features: [
            { title: 'Training des Tages', text: 'Dein Wochenplan, übersichtlich, das heutige Training nur einen Tipp entfernt.' },
            { title: 'Tagesziele', text: 'Trinken, Mahlzeiten und Makros ohne Tabellen im Blick.' },
            { title: 'Gamification', text: 'Münzen, Serien, Levels und Erfolge, die dich dranbleiben lassen.' },
            { title: 'Freischaltbare Themes', text: 'Ändere den Look der App mit Themes, die du dir erarbeitest.' },
        ],
        feedbackTitle: 'Gestalte STZ Gym mit', feedbackText: 'Ohne Anmeldung. Ein Klick hilft schon.',
        like: 'Ich will diese App', liked: 'Danke!',
        pollTitle: 'Was interessiert dich am meisten?',
        poll: { training: 'Training', running: 'Laufen', nutrition: 'Ernährung', gamification: 'Gamification' },
        suggestion: 'Eine Idee oder ein Vorschlag?', suggestionPlaceholder: 'Hier schreiben (optional, anonym)',
        send: 'Senden', sent: 'Erhalten, danke!',
        errorLimit: 'Zu viele Einsendungen. Später erneut versuchen.', errorGeneric: 'Senden gerade nicht möglich.',
        offline: 'Feedback derzeit nicht verfügbar.',
        phoneLabel: 'Interaktive Vorschau der STZ Gym App',
    },
    it: {
        badge: 'Prossimamente', status: 'In sviluppo · non ancora disponibile per il download', kicker: 'App per la palestra • Android',
        title: 'STZ Gym',
        tagline: 'Allenamento, idratazione, nutrizione e corsa in un’app che trasforma la costanza in progresso, con livelli, missioni e temi da sbloccare.',
        cta: 'Prova l’anteprima interattiva', spotlightNote: 'Provala direttamente nel browser.',
        tryIt: 'Registra acqua e missioni, guadagna monete e spendile nel negozio.',
        themes: 'Temi dell’app', reset: 'Reimposta demo',
        features: [
            { title: 'Allenamento del giorno', text: 'Il tuo piano settimanale organizzato, con l’allenamento di oggi a un tocco.' },
            { title: 'Obiettivi giornalieri', text: 'Idratazione, pasti e macro senza fogli di calcolo.' },
            { title: 'Gamification', text: 'Monete, serie, livelli e traguardi per mantenere il ritmo.' },
            { title: 'Temi sbloccabili', text: 'Cambia l’aspetto dell’app con temi guadagnati progredendo.' },
        ],
        feedbackTitle: 'Aiuta a dare forma a STZ Gym', feedbackText: 'Senza registrazione. Un clic aiuta già.',
        like: 'Voglio questa app', liked: 'Grazie!',
        pollTitle: 'Cosa ti interessa di più?',
        poll: { training: 'Allenamenti', running: 'Corsa', nutrition: 'Nutrizione', gamification: 'Gamification' },
        suggestion: 'Hai un’idea o un suggerimento?', suggestionPlaceholder: 'Scrivi qui (facoltativo, anonimo)',
        send: 'Invia', sent: 'Ricevuto, grazie!',
        errorLimit: 'Troppi invii. Riprova più tardi.', errorGeneric: 'Impossibile inviare ora.',
        offline: 'Feedback non disponibile al momento.',
        phoneLabel: 'Anteprima interattiva dell’app STZ Gym',
    },
};

export const getGymPageCopy = (locale) => pageCopy[locale] || pageCopy.pt;
