"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { downloadPath } from '../lib/downloadPath';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const REPO_URL = 'https://github.com/starzynhobr/stz-downloader';
const RELEASES_URL = `${REPO_URL}/releases`;
const FIREFOX_URL = 'https://addons.mozilla.org/firefox/addon/stz-downloader-integration/';
const IMAGES = '/images/projects/stz-downloader/v2';
const SEGMENTS = 16;

const copy = {
    pt: {
        eyebrow: 'Gerenciador de downloads para Windows',
        title: 'Downloads no máximo.',
        titleAccent: 'Sem esforço.',
        description: 'O STZ Downloader divide cada arquivo em até 16 conexões, retoma sozinho quando a rede cai e pega os downloads direto do navegador. Leve, local e de código aberto.',
        download: 'Baixar para Windows', firefox: 'Extensão para Firefox', source: 'Código no GitHub',
        verified: 'Instalador verificado por SHA-256', license: 'Licença MIT',
        speedChip: 'conexões em paralelo', resumeChip: 'Reconectando… retomou',
        segTitle: 'Um arquivo. Dezesseis conexões.',
        segDescription: 'Em vez de puxar o arquivo por um único canal, o motor aria2 baixa vários pedaços ao mesmo tempo e junta tudo no final. Em servidores que permitem, a diferença aparece na hora.',
        segSingle: '1 conexão', segMulti: '16 conexões',
        flowEyebrow: 'Como funciona', flowTitle: 'Do clique ao arquivo, sem trocar de janela',
        flow: [
            ['Você baixa', 'Clique em qualquer link de download no Chrome ou no Firefox, como sempre.'],
            ['A extensão captura', 'O download é pausado no navegador e entregue ao app na hora, com cookies e cabeçalhos.'],
            ['O app acelera', 'Até 16 conexões, limite de velocidade e fila de downloads.'],
            ['Pronto', 'O arquivo aparece na sua pasta. Um clique abre ou mostra no Explorer.'],
        ],
        featuresEyebrow: 'Recursos', featuresTitle: 'Feito para não dar dor de cabeça',
        features: [
            ['Retoma sozinho', 'Caiu a internet ou trocou a VPN? O download espera e continua do ponto onde parou.'],
            ['Downloads autenticados', 'Links de nuvens, fóruns e portais privados funcionam: a extensão repassa a sessão.'],
            ['Atualiza com segurança', 'Avisa quando há versão nova e só instala se o SHA-256 conferir.'],
            ['Limite por download', 'Deixe um arquivo lento e o resto rápido, ou limite tudo para jogar em paz.'],
            ['Área de transferência', 'Copiou um link de arquivo? O app oferece baixar. Opcional e desligado por padrão.'],
            ['Cinco idiomas', 'Português, inglês, espanhol, alemão e francês, seguindo o idioma do Windows.'],
        ],
        localTitle: '100% local', localDescription: 'Sem conta, sem telemetria. A extensão só conversa com o app no seu computador.',
        galleryEyebrow: 'Por dentro', galleryTitle: 'Conheça as telas',
        tabs: [
            ['queue', 'Fila', 'Filtros por estado, velocidade e tempo restante em tempo real.'],
            ['new-download', 'Novo download', 'Confirme nome e conexões antes de começar, ou deixe iniciar sozinho.'],
            ['speed-limit', 'Limite', 'Um limite só para este download, com atalhos ou valor livre.'],
            ['settings', 'Configurações', 'Tudo aplicado na hora, sem botão de salvar.'],
        ],
        installEyebrow: 'Instalação', installTitle: 'Pronto em um minuto',
        install: [
            ['Instale o app', 'Baixe o instalador (cerca de 26 MB) e rode. Não pede permissão de administrador.'],
            ['Adicione a extensão', 'Instale pela loja do seu navegador. Ela se conecta ao app sozinha.'],
            ['Baixe normalmente', 'A partir daqui, seus downloads vão direto para o STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store: em análise',
        specs: [['Versão', null], ['Sistema', 'Windows 10 e 11'], ['Motor', 'aria2'], ['Navegadores', 'Chrome · Firefox'], ['Tamanho', '~26 MB'], ['Licença', 'MIT']],
        finalTitle: 'Seus downloads merecem mais velocidade.', finalDescription: 'Grátis, de código aberto e sem anúncios.',
        expand: 'Ampliar imagem', close: 'Fechar imagem',
    },
    en: {
        eyebrow: 'Download manager for Windows',
        title: 'Full-speed downloads.',
        titleAccent: 'Zero effort.',
        description: 'STZ Downloader splits every file into up to 16 connections, resumes on its own when the network drops and catches downloads straight from your browser. Light, local and open source.',
        download: 'Download for Windows', firefox: 'Firefox extension', source: 'Source on GitHub',
        verified: 'Installer verified by SHA-256', license: 'MIT license',
        speedChip: 'parallel connections', resumeChip: 'Reconnecting… resumed',
        segTitle: 'One file. Sixteen connections.',
        segDescription: 'Instead of pulling a file through a single channel, the aria2 engine downloads several pieces at once and joins them at the end. On servers that allow it, you feel the difference right away.',
        segSingle: '1 connection', segMulti: '16 connections',
        flowEyebrow: 'How it works', flowTitle: 'From click to file without switching windows',
        flow: [
            ['You download', 'Click any download link in Chrome or Firefox, as usual.'],
            ['The extension catches it', 'The browser pauses it and hands it to the app instantly, with cookies and headers.'],
            ['The app speeds it up', 'Up to 16 connections, speed limits and a queue.'],
            ['Done', 'The file lands in your folder. One click opens it or shows it in Explorer.'],
        ],
        featuresEyebrow: 'Features', featuresTitle: 'Built to stay out of your way',
        features: [
            ['Resumes on its own', 'Internet dropped or VPN switched? The download waits and continues where it stopped.'],
            ['Authenticated downloads', 'Cloud drives, forums and private portals work: the extension passes your session along.'],
            ['Safe updates', 'Tells you when a new version is out and installs only if the SHA-256 matches.'],
            ['Per-download limits', 'Keep one file slow and the rest fast, or cap everything to game in peace.'],
            ['Clipboard capture', 'Copied a file link? The app offers to download it. Optional, off by default.'],
            ['Five languages', 'English, Portuguese, Spanish, German and French, following Windows.'],
        ],
        localTitle: '100% local', localDescription: 'No account, no telemetry. The extension only talks to the app on your computer.',
        galleryEyebrow: 'Inside', galleryTitle: 'Take a look',
        tabs: [
            ['queue', 'Queue', 'Filters by state, live speed and time left.'],
            ['new-download', 'New download', 'Confirm name and connections before it starts, or let it start on its own.'],
            ['speed-limit', 'Limit', 'A limit just for this download, with presets or a custom value.'],
            ['settings', 'Settings', 'Everything applies instantly, no save button.'],
        ],
        installEyebrow: 'Install', installTitle: 'Ready in a minute',
        install: [
            ['Install the app', 'Download the installer (about 26 MB) and run it. No admin rights needed.'],
            ['Add the extension', 'Get it from your browser’s store. It connects to the app by itself.'],
            ['Download as usual', 'From now on, your downloads go straight to STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store: in review',
        specs: [['Version', null], ['System', 'Windows 10 & 11'], ['Engine', 'aria2'], ['Browsers', 'Chrome · Firefox'], ['Size', '~26 MB'], ['License', 'MIT']],
        finalTitle: 'Your downloads deserve more speed.', finalDescription: 'Free, open source and ad-free.',
        expand: 'Enlarge image', close: 'Close image',
    },
    es: {
        eyebrow: 'Gestor de descargas para Windows',
        title: 'Descargas a toda velocidad.',
        titleAccent: 'Sin esfuerzo.',
        description: 'STZ Downloader divide cada archivo en hasta 16 conexiones, se reanuda solo cuando cae la red y captura las descargas directamente del navegador. Ligero, local y de código abierto.',
        download: 'Descargar para Windows', firefox: 'Extensión para Firefox', source: 'Código en GitHub',
        verified: 'Instalador verificado con SHA-256', license: 'Licencia MIT',
        speedChip: 'conexiones en paralelo', resumeChip: 'Reconectando… reanudado',
        segTitle: 'Un archivo. Dieciséis conexiones.',
        segDescription: 'En lugar de traer el archivo por un solo canal, el motor aria2 descarga varias partes a la vez y las une al final. En servidores que lo permiten, se nota al instante.',
        segSingle: '1 conexión', segMulti: '16 conexiones',
        flowEyebrow: 'Cómo funciona', flowTitle: 'Del clic al archivo sin cambiar de ventana',
        flow: [
            ['Descargas', 'Haz clic en cualquier enlace de descarga en Chrome o Firefox, como siempre.'],
            ['La extensión lo captura', 'El navegador la pausa y se la entrega a la app al instante, con cookies y cabeceras.'],
            ['La app acelera', 'Hasta 16 conexiones, límites de velocidad y cola.'],
            ['Listo', 'El archivo aparece en tu carpeta. Un clic lo abre o lo muestra en el Explorador.'],
        ],
        featuresEyebrow: 'Funciones', featuresTitle: 'Hecho para no darte problemas',
        features: [
            ['Se reanuda solo', '¿Se cayó internet o cambiaste de VPN? La descarga espera y sigue donde se quedó.'],
            ['Descargas autenticadas', 'Nubes, foros y portales privados funcionan: la extensión pasa tu sesión.'],
            ['Actualizaciones seguras', 'Avisa cuando hay una versión nueva y solo instala si el SHA-256 coincide.'],
            ['Límite por descarga', 'Deja un archivo lento y el resto rápido, o limita todo para jugar tranquilo.'],
            ['Portapapeles', '¿Copiaste un enlace de archivo? La app ofrece descargarlo. Opcional y desactivado por defecto.'],
            ['Cinco idiomas', 'Español, inglés, portugués, alemán y francés, según el idioma de Windows.'],
        ],
        localTitle: '100% local', localDescription: 'Sin cuenta ni telemetría. La extensión solo habla con la app en tu equipo.',
        galleryEyebrow: 'Por dentro', galleryTitle: 'Conoce las pantallas',
        tabs: [
            ['queue', 'Cola', 'Filtros por estado, velocidad y tiempo restante en vivo.'],
            ['new-download', 'Nueva descarga', 'Confirma nombre y conexiones antes de empezar, o deja que empiece sola.'],
            ['speed-limit', 'Límite', 'Un límite solo para esta descarga, con atajos o valor libre.'],
            ['settings', 'Ajustes', 'Todo se aplica al instante, sin botón de guardar.'],
        ],
        installEyebrow: 'Instalación', installTitle: 'Listo en un minuto',
        install: [
            ['Instala la app', 'Descarga el instalador (unos 26 MB) y ejecútalo. No pide permisos de administrador.'],
            ['Añade la extensión', 'Instálala desde la tienda de tu navegador. Se conecta sola a la app.'],
            ['Descarga como siempre', 'Desde ahora, tus descargas van directo a STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store: en revisión',
        specs: [['Versión', null], ['Sistema', 'Windows 10 y 11'], ['Motor', 'aria2'], ['Navegadores', 'Chrome · Firefox'], ['Tamaño', '~26 MB'], ['Licencia', 'MIT']],
        finalTitle: 'Tus descargas merecen más velocidad.', finalDescription: 'Gratis, de código abierto y sin anuncios.',
        expand: 'Ampliar imagen', close: 'Cerrar imagen',
    },
    fr: {
        eyebrow: 'Gestionnaire de téléchargements pour Windows',
        title: 'Des téléchargements à fond.',
        titleAccent: 'Sans effort.',
        description: 'STZ Downloader découpe chaque fichier en 16 connexions maximum, reprend tout seul quand le réseau tombe et récupère les téléchargements directement depuis le navigateur. Léger, local et open source.',
        download: 'Télécharger pour Windows', firefox: 'Extension Firefox', source: 'Code sur GitHub',
        verified: 'Installateur vérifié par SHA-256', license: 'Licence MIT',
        speedChip: 'connexions en parallèle', resumeChip: 'Reconnexion… repris',
        segTitle: 'Un fichier. Seize connexions.',
        segDescription: 'Au lieu de tirer le fichier par un seul canal, le moteur aria2 télécharge plusieurs morceaux à la fois et les assemble à la fin. Sur les serveurs qui le permettent, la différence est immédiate.',
        segSingle: '1 connexion', segMulti: '16 connexions',
        flowEyebrow: 'Fonctionnement', flowTitle: 'Du clic au fichier sans changer de fenêtre',
        flow: [
            ['Vous téléchargez', 'Cliquez sur un lien de téléchargement dans Chrome ou Firefox, comme d’habitude.'],
            ['L’extension l’intercepte', 'Le navigateur le met en pause et le confie aussitôt à l’app, avec cookies et en-têtes.'],
            ['L’app accélère', 'Jusqu’à 16 connexions, limites de vitesse et file d’attente.'],
            ['Terminé', 'Le fichier arrive dans votre dossier. Un clic l’ouvre ou l’affiche dans l’Explorateur.'],
        ],
        featuresEyebrow: 'Fonctionnalités', featuresTitle: 'Conçu pour se faire oublier',
        features: [
            ['Reprise automatique', 'Coupure internet ou changement de VPN ? Le téléchargement attend et reprend où il s’était arrêté.'],
            ['Téléchargements authentifiés', 'Clouds, forums et portails privés fonctionnent : l’extension transmet votre session.'],
            ['Mises à jour sûres', 'Vous prévient d’une nouvelle version et n’installe que si le SHA-256 correspond.'],
            ['Limite par téléchargement', 'Gardez un fichier lent et le reste rapide, ou limitez tout pour jouer tranquille.'],
            ['Presse-papiers', 'Un lien de fichier copié ? L’app propose de le télécharger. Optionnel, désactivé par défaut.'],
            ['Cinq langues', 'Français, anglais, portugais, espagnol et allemand, selon Windows.'],
        ],
        localTitle: '100 % local', localDescription: 'Sans compte ni télémétrie. L’extension ne parle qu’à l’app sur votre ordinateur.',
        galleryEyebrow: 'À l’intérieur', galleryTitle: 'Découvrez les écrans',
        tabs: [
            ['queue', 'File', 'Filtres par état, vitesse et temps restant en direct.'],
            ['new-download', 'Nouveau', 'Confirmez le nom et les connexions avant de démarrer, ou laissez faire.'],
            ['speed-limit', 'Limite', 'Une limite pour ce seul téléchargement, avec raccourcis ou valeur libre.'],
            ['settings', 'Paramètres', 'Tout s’applique immédiatement, sans bouton Enregistrer.'],
        ],
        installEyebrow: 'Installation', installTitle: 'Prêt en une minute',
        install: [
            ['Installez l’app', 'Téléchargez l’installateur (environ 26 Mo) et lancez-le. Pas besoin de droits administrateur.'],
            ['Ajoutez l’extension', 'Installez-la depuis la boutique de votre navigateur. Elle se connecte seule à l’app.'],
            ['Téléchargez normalement', 'Désormais, vos téléchargements vont directement dans STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store : en cours d’examen',
        specs: [['Version', null], ['Système', 'Windows 10 et 11'], ['Moteur', 'aria2'], ['Navigateurs', 'Chrome · Firefox'], ['Taille', '~26 Mo'], ['Licence', 'MIT']],
        finalTitle: 'Vos téléchargements méritent plus de vitesse.', finalDescription: 'Gratuit, open source et sans publicité.',
        expand: 'Agrandir l’image', close: 'Fermer l’image',
    },
    de: {
        eyebrow: 'Download-Manager für Windows',
        title: 'Downloads mit voller Kraft.',
        titleAccent: 'Ohne Aufwand.',
        description: 'STZ Downloader teilt jede Datei in bis zu 16 Verbindungen, setzt nach Netzabbrüchen selbst fort und übernimmt Downloads direkt aus dem Browser. Leicht, lokal und quelloffen.',
        download: 'Für Windows herunterladen', firefox: 'Firefox-Erweiterung', source: 'Code auf GitHub',
        verified: 'Installer per SHA-256 geprüft', license: 'MIT-Lizenz',
        speedChip: 'parallele Verbindungen', resumeChip: 'Neu verbunden… fortgesetzt',
        segTitle: 'Eine Datei. Sechzehn Verbindungen.',
        segDescription: 'Statt eine Datei über einen einzigen Kanal zu laden, holt die aria2-Engine mehrere Teile gleichzeitig und fügt sie am Ende zusammen. Bei Servern, die das erlauben, merkst du es sofort.',
        segSingle: '1 Verbindung', segMulti: '16 Verbindungen',
        flowEyebrow: 'So funktioniert’s', flowTitle: 'Vom Klick zur Datei ohne Fensterwechsel',
        flow: [
            ['Du lädst herunter', 'Klick wie gewohnt auf einen Download-Link in Chrome oder Firefox.'],
            ['Die Erweiterung übernimmt', 'Der Browser pausiert und übergibt sofort an die App, samt Cookies und Headern.'],
            ['Die App beschleunigt', 'Bis zu 16 Verbindungen, Tempolimits und Warteschlange.'],
            ['Fertig', 'Die Datei landet in deinem Ordner. Ein Klick öffnet sie oder zeigt sie im Explorer.'],
        ],
        featuresEyebrow: 'Funktionen', featuresTitle: 'Gebaut, um nicht zu stören',
        features: [
            ['Setzt selbst fort', 'Internet weg oder VPN gewechselt? Der Download wartet und macht da weiter, wo er war.'],
            ['Authentifizierte Downloads', 'Cloud-Speicher, Foren und private Portale funktionieren: Die Erweiterung reicht deine Sitzung weiter.'],
            ['Sichere Updates', 'Meldet neue Versionen und installiert nur, wenn der SHA-256 stimmt.'],
            ['Limit pro Download', 'Eine Datei langsam, der Rest schnell – oder alles drosseln, um in Ruhe zu spielen.'],
            ['Zwischenablage', 'Datei-Link kopiert? Die App bietet den Download an. Optional, standardmäßig aus.'],
            ['Fünf Sprachen', 'Deutsch, Englisch, Portugiesisch, Spanisch und Französisch, passend zu Windows.'],
        ],
        localTitle: '100 % lokal', localDescription: 'Kein Konto, keine Telemetrie. Die Erweiterung spricht nur mit der App auf deinem PC.',
        galleryEyebrow: 'Einblick', galleryTitle: 'Die Oberfläche',
        tabs: [
            ['queue', 'Warteschlange', 'Filter nach Status, Live-Tempo und Restzeit.'],
            ['new-download', 'Neuer Download', 'Name und Verbindungen vor dem Start bestätigen oder automatisch starten.'],
            ['speed-limit', 'Limit', 'Ein Limit nur für diesen Download, mit Vorgaben oder eigenem Wert.'],
            ['settings', 'Einstellungen', 'Alles wirkt sofort, ohne Speichern-Knopf.'],
        ],
        installEyebrow: 'Installation', installTitle: 'In einer Minute startklar',
        install: [
            ['App installieren', 'Installer laden (ca. 26 MB) und starten. Keine Administratorrechte nötig.'],
            ['Erweiterung hinzufügen', 'Aus dem Store deines Browsers installieren. Sie verbindet sich selbst mit der App.'],
            ['Ganz normal laden', 'Ab jetzt gehen deine Downloads direkt an STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store: in Prüfung',
        specs: [['Version', null], ['System', 'Windows 10 & 11'], ['Engine', 'aria2'], ['Browser', 'Chrome · Firefox'], ['Größe', '~26 MB'], ['Lizenz', 'MIT']],
        finalTitle: 'Deine Downloads verdienen mehr Tempo.', finalDescription: 'Kostenlos, quelloffen und werbefrei.',
        expand: 'Bild vergrößern', close: 'Bild schließen',
    },
    it: {
        eyebrow: 'Download manager per Windows',
        title: 'Download a tutta velocità.',
        titleAccent: 'Senza sforzo.',
        description: 'STZ Downloader divide ogni file in fino a 16 connessioni, riprende da solo quando la rete cade e cattura i download direttamente dal browser. Leggero, locale e open source.',
        download: 'Scarica per Windows', firefox: 'Estensione per Firefox', source: 'Codice su GitHub',
        verified: 'Installer verificato con SHA-256', license: 'Licenza MIT',
        speedChip: 'connessioni in parallelo', resumeChip: 'Riconnessione… ripreso',
        segTitle: 'Un file. Sedici connessioni.',
        segDescription: 'Invece di scaricare il file da un solo canale, il motore aria2 scarica più parti insieme e le unisce alla fine. Sui server che lo permettono, la differenza si sente subito.',
        segSingle: '1 connessione', segMulti: '16 connessioni',
        flowEyebrow: 'Come funziona', flowTitle: 'Dal clic al file senza cambiare finestra',
        flow: [
            ['Scarichi', 'Clicca su un link di download in Chrome o Firefox, come sempre.'],
            ['L’estensione lo cattura', 'Il browser lo mette in pausa e lo passa subito all’app, con cookie e intestazioni.'],
            ['L’app accelera', 'Fino a 16 connessioni, limiti di velocità e coda.'],
            ['Fatto', 'Il file arriva nella tua cartella. Un clic lo apre o lo mostra in Esplora file.'],
        ],
        featuresEyebrow: 'Funzionalità', featuresTitle: 'Fatto per non darti pensieri',
        features: [
            ['Riprende da solo', 'Internet caduto o VPN cambiata? Il download aspetta e continua da dove si era fermato.'],
            ['Download autenticati', 'Cloud, forum e portali privati funzionano: l’estensione passa la tua sessione.'],
            ['Aggiornamenti sicuri', 'Ti avvisa della nuova versione e installa solo se lo SHA-256 corrisponde.'],
            ['Limite per download', 'Un file lento e il resto veloce, oppure limita tutto per giocare tranquillo.'],
            ['Appunti', 'Hai copiato un link di file? L’app propone di scaricarlo. Facoltativo, spento di default.'],
            ['Cinque lingue', 'Inglese, portoghese, spagnolo, tedesco e francese, secondo la lingua di Windows.'],
        ],
        localTitle: '100% locale', localDescription: 'Nessun account, nessuna telemetria. L’estensione parla solo con l’app sul tuo computer.',
        galleryEyebrow: 'Dentro l’app', galleryTitle: 'Le schermate',
        tabs: [
            ['queue', 'Coda', 'Filtri per stato, velocità e tempo rimanente in tempo reale.'],
            ['new-download', 'Nuovo download', 'Conferma nome e connessioni prima di iniziare, o lascia partire da solo.'],
            ['speed-limit', 'Limite', 'Un limite solo per questo download, con scorciatoie o valore libero.'],
            ['settings', 'Impostazioni', 'Tutto si applica subito, senza pulsante Salva.'],
        ],
        installEyebrow: 'Installazione', installTitle: 'Pronto in un minuto',
        install: [
            ['Installa l’app', 'Scarica l’installer (circa 26 MB) e avvialo. Non servono permessi di amministratore.'],
            ['Aggiungi l’estensione', 'Installala dallo store del tuo browser. Si collega da sola all’app.'],
            ['Scarica come sempre', 'Da ora i tuoi download vanno direttamente a STZ Downloader.'],
        ],
        chromeSoon: 'Chrome Web Store: in revisione',
        specs: [['Versione', null], ['Sistema', 'Windows 10 e 11'], ['Motore', 'aria2'], ['Browser', 'Chrome · Firefox'], ['Dimensione', '~26 MB'], ['Licenza', 'MIT']],
        finalTitle: 'I tuoi download meritano più velocità.', finalDescription: 'Gratis, open source e senza pubblicità.',
        expand: 'Ingrandisci immagine', close: 'Chiudi immagine',
    },
};

const FEATURE_ICONS = [
    'M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6',
    'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z',
    'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4',
    'M4 16a8 8 0 1 1 16 0M12 16l4-5',
    'M9 4h6v3H9zM7 6H5v15h14V6h-2M9 13h6M9 17h4',
    'M4 5h16M9 3v2M7 5c1 4 4 8 9 10M17 5c-1 4-4 8-9 10M13 21l4-9 4 9M14.5 18h5',
];

function Icon({ d, className = '' }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d={d} />
        </svg>
    );
}

function Eyebrow({ children }) {
    return <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">{children}</p>;
}

/** Screenshot in a minimal window frame. */
function AppWindow({ src, alt, priority = false, className = '' }) {
    return (
        <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f11] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ${className}`}>
            <div className="flex h-8 items-center gap-1.5 border-b border-white/5 bg-[#121316] px-3">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[11px] text-white/40">STZ Downloader</span>
            </div>
            <Image src={src} alt={alt} width={1284} height={801} priority={priority} className="block h-auto w-full" sizes="(max-width: 1024px) 100vw, 640px" />
        </div>
    );
}

/** 1 lane vs 16 lanes filling at once: the core idea, shown instead of told. */
function SegmentRace({ text }) {
    return (
        <div className="grid gap-6">
            <div>
                <div className="mb-2 flex justify-between font-mono text-[11px] text-[var(--text-muted)]">
                    <span>{text.segSingle}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-3)]">
                    <div className="stzdl-fill h-full rounded-full bg-[var(--text-muted)]" style={{ animationDuration: '9s' }} />
                </div>
            </div>
            <div>
                <div className="mb-2 flex justify-between font-mono text-[11px] text-[var(--accent)]">
                    <span>{text.segMulti}</span>
                </div>
                <div className="grid h-3 gap-[3px]" style={{ gridTemplateColumns: `repeat(${SEGMENTS}, minmax(0, 1fr))` }}>
                    {Array.from({ length: SEGMENTS }, (_, i) => (
                        <div key={i} className="overflow-hidden rounded-[3px] bg-[var(--surface-3)]">
                            <div
                                className="stzdl-fill h-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]"
                                style={{ animationDuration: `${2.2 + ((i * 7) % 5) * 0.25}s`, animationDelay: `${(i % 4) * 0.08}s` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function DownloaderProjectPage({ initialRelease = null }) {
    const { lang } = useLanguage();
    const locale = copy[lang] ? lang : 'en';
    const text = copy[locale];
    const [tab, setTab] = useState(text.tabs[0][0]);
    const [zoomed, setZoomed] = useState(false);
    const version = initialRelease?.version || null;
    const activeTab = text.tabs.find(([id]) => id === tab) || text.tabs[0];
    const downloadHref = downloadPath(lang, 'stz-downloader');
    const checksumsUrl = version ? `${RELEASES_URL}/download/v${version}/SHA256SUMS.txt` : RELEASES_URL;

    return (
        <main className="min-h-screen overflow-hidden bg-transparent pb-24 pt-28 text-[var(--text-primary)]">
            <style>{`
                @keyframes stzdl-fill { 0% { width: 0 } 70% { width: 100% } 100% { width: 100% } }
                .stzdl-fill { width: 0; animation: stzdl-fill linear infinite; }
                @keyframes stzdl-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
                .stzdl-float { animation: stzdl-float 6s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) { .stzdl-fill { animation: none; width: 100%; } .stzdl-float { animation: none; } }
            `}</style>

            {/* Hero */}
            <section className="container relative mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-10 lg:grid-cols-12 lg:items-center">
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[640px] rounded-full bg-[var(--accent)] opacity-[0.10] blur-[120px]" />
                <div className="relative lg:col-span-5">
                    <Badge variant="stable" className="mb-6">{version ? `STZ Downloader ${version}` : 'STZ Downloader'}</Badge>
                    <Eyebrow>{text.eyebrow}</Eyebrow>
                    <h1 className="mb-6 text-5xl font-bold tracking-[-0.05em] text-[var(--text-heading)] md:text-6xl">
                        {text.title}
                        <span className="block text-[var(--accent)]">{text.titleAccent}</span>
                    </h1>
                    <p className="mb-9 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{text.description}</p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="default">
                            <Link href={downloadHref}>{text.download}{version ? ` · ${version}` : ''}</Link>
                        </Button>
                        <Button asChild variant="secondary" size="default">
                            <a href={FIREFOX_URL} target="_blank" rel="noreferrer">{text.firefox}</a>
                        </Button>
                    </div>
                    <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-muted)]">
                        <a href={checksumsUrl} target="_blank" rel="noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border-strong)] underline-offset-4 hover:opacity-80">{text.verified}</a>
                        <span aria-hidden="true">·</span>
                        <a href={REPO_URL} target="_blank" rel="noreferrer" className="underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--text-secondary)]">{text.source}</a>
                        <span aria-hidden="true">·</span>
                        <span>{text.license}</span>
                    </p>
                </div>

                <div className="relative lg:col-span-7">
                    <AppWindow src={`${IMAGES}/queue.png`} alt={text.tabs[0][2]} priority className="lg:translate-x-6" />
                    <div className="stzdl-float absolute -left-4 bottom-10 hidden rounded-2xl border [border-color:var(--border-strong)] bg-[var(--surface-primary)] px-4 py-3 shadow-[var(--shadow)] backdrop-blur-xl sm:block">
                        <div className="font-mono text-2xl font-bold text-[var(--text-heading)]">16<span className="text-[var(--accent)]">×</span></div>
                        <div className="text-xs text-[var(--text-secondary)]">{text.speedChip}</div>
                    </div>
                    <div className="stzdl-float absolute -top-5 right-2 hidden items-center gap-2 rounded-full border [border-color:var(--border-strong)] bg-[var(--surface-primary)] px-4 py-2 text-xs text-[var(--text-secondary)] shadow-[var(--shadow)] backdrop-blur-xl sm:flex" style={{ animationDelay: '1.5s' }}>
                        <span className="size-2 animate-pulse rounded-full bg-[var(--status-stable)]" />
                        {text.resumeChip}
                    </div>
                </div>
            </section>

            {/* 1 vs 16 connections */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="grid items-center gap-10 rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow)] md:p-12 lg:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.segTitle}</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">{text.segDescription}</p>
                    </div>
                    <SegmentRace text={text} />
                </div>
            </section>

            {/* Flow */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <Eyebrow>{text.flowEyebrow}</Eyebrow>
                <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.flowTitle}</h2>
                <ol className="grid gap-4 md:grid-cols-4">
                    {text.flow.map(([title, description], i) => (
                        <li key={title} className="relative rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-2)] p-6">
                            <span className="mb-4 flex size-9 items-center justify-center rounded-full bg-[var(--accent)] font-mono text-sm font-bold text-[var(--text-on-accent)]">{i + 1}</span>
                            <h3 className="mb-2 font-bold text-[var(--text-heading)]">{title}</h3>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                            {i < text.flow.length - 1 && (
                                <span aria-hidden="true" className="absolute -right-3 top-9 z-10 hidden text-[var(--accent)] md:block">→</span>
                            )}
                        </li>
                    ))}
                </ol>
            </section>

            {/* Features bento */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <Eyebrow>{text.featuresEyebrow}</Eyebrow>
                <h2 className="mb-10 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.featuresTitle}</h2>
                <div className="grid gap-4 md:grid-cols-6">
                    {text.features.map(([title, description], i) => (
                        <article
                            key={title}
                            className={`group rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:[border-color:var(--border-hover)] ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}
                        >
                            <Icon d={FEATURE_ICONS[i]} className="mb-5 size-8 text-[var(--accent)]" />
                            <h3 className="mb-2 text-lg font-bold text-[var(--text-heading)]">{title}</h3>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                        </article>
                    ))}
                    <article className="flex flex-col justify-between gap-4 rounded-[var(--radius-card)] border [border-color:var(--border-strong)] bg-gradient-to-br from-[var(--accent-glow)] to-transparent p-7 md:col-span-6 md:flex-row md:items-center">
                        <div>
                            <h3 className="mb-1 text-2xl font-bold text-[var(--text-heading)]">{text.localTitle}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{text.localDescription}</p>
                        </div>
                        <Icon d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" className="hidden size-12 shrink-0 text-[var(--accent)] md:block" />
                    </article>
                </div>
            </section>

            {/* Gallery */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <Eyebrow>{text.galleryEyebrow}</Eyebrow>
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.galleryTitle}</h2>
                <div role="tablist" aria-label={text.galleryTitle} className="mb-6 flex gap-2 overflow-x-auto rounded-[var(--radius-card)] border p-2 [border-color:var(--border-subtle)] bg-[var(--surface-primary)]">
                    {text.tabs.map(([id, label]) => (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            id={`dl-tab-${id}`}
                            aria-selected={tab === id}
                            aria-controls="dl-panel"
                            onClick={() => setTab(id)}
                            className={`min-w-max cursor-pointer rounded-[calc(var(--radius-card)*0.55)] px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${tab === id ? 'bg-[var(--accent)] text-[var(--text-on-accent)] shadow-[0_0_24px_var(--accent-glow)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-heading)]'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div id="dl-panel" role="tabpanel" aria-labelledby={`dl-tab-${activeTab[0]}`} className="grid items-center gap-8 lg:grid-cols-12">
                    <button type="button" onClick={() => setZoomed(true)} aria-label={`${text.expand}: ${activeTab[1]}`} className="cursor-zoom-in rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:col-span-9">
                        <AppWindow src={`${IMAGES}/${activeTab[0]}.png`} alt={activeTab[2]} />
                    </button>
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-bold text-[var(--text-heading)]">{activeTab[1]}</h3>
                        <p className="leading-relaxed text-[var(--text-secondary)]">{activeTab[2]}</p>
                    </div>
                </div>
                {zoomed && (
                    <div role="dialog" aria-modal="true" aria-label={activeTab[1]} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm" onClick={() => setZoomed(false)}>
                        <button type="button" onClick={() => setZoomed(false)} aria-label={text.close} className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white hover:bg-black/80">✕</button>
                        <Image src={`${IMAGES}/${activeTab[0]}.png`} alt={activeTab[2]} width={1284} height={801} className="max-h-[90vh] w-auto rounded-xl" />
                    </div>
                )}
            </section>

            {/* Install */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow)] md:p-12">
                    <Eyebrow>{text.installEyebrow}</Eyebrow>
                    <h2 className="mb-10 text-3xl font-bold tracking-tight text-[var(--text-heading)]">{text.installTitle}</h2>
                    <div className="mb-10 grid gap-8 md:grid-cols-3">
                        {text.install.map(([title, description], i) => (
                            <article key={title} className="border-l-2 border-[var(--accent)]/30 pl-5">
                                <span className="font-mono text-xs font-bold text-[var(--accent)]">0{i + 1}</span>
                                <h3 className="mb-2 mt-3 font-bold text-[var(--text-heading)]">{title}</h3>
                                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                            </article>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button asChild variant="primary" size="default"><Link href={downloadHref}>{text.download}</Link></Button>
                        <Button asChild variant="secondary" size="default"><a href={FIREFOX_URL} target="_blank" rel="noreferrer">Firefox Add-ons</a></Button>
                        <span className="rounded-full border [border-color:var(--border-subtle)] px-4 py-2 text-xs text-[var(--text-muted)]">{text.chromeSoon}</span>
                    </div>
                </div>
            </section>

            {/* Specs + final CTA */}
            <section className="container mx-auto max-w-6xl px-6">
                <dl className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-6">
                    {text.specs.map(([label, value]) => (
                        <div key={label} className="bg-[var(--surface-1)] p-5">
                            <dt className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{label}</dt>
                            <dd className="font-semibold text-[var(--text-heading)]">{value ?? (version || '—')}</dd>
                        </div>
                    ))}
                </dl>
                <div className="text-center">
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl">{text.finalTitle}</h2>
                    <p className="mb-8 text-[var(--text-secondary)]">{text.finalDescription}</p>
                    <Button asChild variant="primary" size="default"><Link href={downloadHref}>{text.download}</Link></Button>
                </div>
            </section>
        </main>
    );
}
