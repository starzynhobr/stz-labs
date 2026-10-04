"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { downloadPath } from '../lib/downloadPath';
import ProjectFeatureShowcase from './ProjectFeatureShowcase';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const REPO_URL = 'https://github.com/starzynhobr/STZ-XML-Translator';

// Os nomes dos provedores são marcas e não mudam com o idioma; o tipo e a nota sim.
const PROVIDERS = ['Google Translate', 'Gemini', 'DeepL', 'Microsoft Azure', 'Ollama'];

const copy = {
    pt: {
        eyebrow: 'Tradução de XML para modders',
        title: 'Traduza o texto.',
        titleAccent: 'A estrutura fica intacta.',
        description: 'O STZ XML Translator extrai só os campos que você escolhe, traduz em lote com IA ou tradução automática e devolve o arquivo com tags, atributos e ordem dos nós exatamente como estavam.',
        download: 'Baixar para Windows', source: 'Código no GitHub', free: 'Funciona sem chave de API', license: 'GPLv3 / Comercial',
        sample: ['Lâmina de Brasa', 'Uma espada curta que guarda o calor da forja.'],
        sampleOriginal: 'original', sampleTranslated: 'traduzido', sampleNote: 'id, rarity e a ordem das tags não mudam',
        specs: [['Versão', null], ['Sistema', 'Windows 10 e 11'], ['Interface', 'Tauri + React'], ['Provedores', '5'], ['Idiomas do app', '5'], ['Licença', 'GPLv3 / Comercial']],
        flowEyebrow: 'Como funciona', flowTitle: 'Três passos, do arquivo original ao traduzido',
        flow: [
            ['Carregue o XML', 'O app detecta as tags que se repetem. Você escolhe a tag pai e os campos a traduzir, ou aplica um preset salvo.'],
            ['Traduza', 'Em lote ou entrada por entrada. O progresso é salvo a cada lote, então dá para parar e retomar depois.'],
            ['Revise e exporte', 'Ajuste o que quiser, confirme e exporte. O XML sai com a mesma estrutura do original.'],
        ],
        providersEyebrow: 'Provedores', providersTitle: 'Escolha quem traduz',
        providersDescription: 'Troque de provedor a qualquer momento sem perder o progresso da sessão.',
        providerColumns: ['Provedor', 'Tipo', 'O que precisa'],
        providers: [
            ['Tradução automática', 'Nada. Gratuito e sem chave.'],
            ['IA', 'Chave de API. Traduz em lotes de 120 entradas.'],
            ['Tradução automática', 'Chave de API.'],
            ['Tradução automática', 'Chave de API.'],
            ['IA local', 'Ollama instalado. Roda no seu PC, com modelos como Llama 3.'],
        ],
        screensEyebrow: 'Por dentro', screensTitle: 'Conheça as telas',
        featuresEyebrow: 'Recursos', featuresTitle: 'Feito para não quebrar o jogo',
        features: [
            ['Integridade do XML', 'A extração e a injeção preservam atributos, namespaces e a ordem dos nós. Só o texto dos campos escolhidos muda.'],
            ['Retoma de onde parou', 'Cada lote traduzido vira um checkpoint. Feche o app e continue outro dia do mesmo ponto.'],
            ['Salvar no próprio arquivo', 'Sobrescreva o original e recarregue: a tradução vira a nova base para uma segunda passada.'],
            ['Atualização verificada', 'O app avisa quando há versão nova e só instala se o SHA-256 conferir, com a sua confirmação.'],
        ],
        finalTitle: 'Pronto para traduzir?', finalDescription: 'Baixe o instalador para Windows. Não pede permissão de administrador.',
    },
    en: {
        eyebrow: 'XML translation for modders',
        title: 'Translate the text.',
        titleAccent: 'The structure stays intact.',
        description: 'STZ XML Translator extracts only the fields you choose, translates them in batch with AI or machine translation, and returns the file with tags, attributes and node order exactly as they were.',
        download: 'Download for Windows', source: 'Source on GitHub', free: 'Works without an API key', license: 'GPLv3 / Commercial',
        sample: ['Lâmina de Brasa', 'Uma espada curta que guarda o calor da forja.'],
        sampleOriginal: 'original', sampleTranslated: 'translated', sampleNote: 'id, rarity and tag order do not change',
        specs: [['Version', null], ['System', 'Windows 10 and 11'], ['Interface', 'Tauri + React'], ['Providers', '5'], ['App languages', '5'], ['License', 'GPLv3 / Commercial']],
        flowEyebrow: 'How it works', flowTitle: 'Three steps from the original file to the translated one',
        flow: [
            ['Load the XML', 'The app detects repeating tags. You pick the parent tag and the fields to translate, or apply a saved preset.'],
            ['Translate', 'In batch or entry by entry. Progress is saved after each batch, so you can stop and resume later.'],
            ['Review and export', 'Edit what you want, confirm and export. The XML comes out with the same structure as the original.'],
        ],
        providersEyebrow: 'Providers', providersTitle: 'Choose who translates',
        providersDescription: 'Switch providers at any time without losing the session progress.',
        providerColumns: ['Provider', 'Type', 'What it needs'],
        providers: [
            ['Machine translation', 'Nothing. Free and keyless.'],
            ['AI', 'API key. Translates in batches of 120 entries.'],
            ['Machine translation', 'API key.'],
            ['Machine translation', 'API key.'],
            ['Local AI', 'Ollama installed. Runs on your PC with models such as Llama 3.'],
        ],
        screensEyebrow: 'Inside', screensTitle: 'See the screens',
        featuresEyebrow: 'Features', featuresTitle: 'Built not to break the game',
        features: [
            ['XML integrity', 'Extraction and injection preserve attributes, namespaces and node order. Only the text of the chosen fields changes.'],
            ['Resume where you stopped', 'Every translated batch becomes a checkpoint. Close the app and continue another day from the same point.'],
            ['Save in place', 'Overwrite the original and reload: the translation becomes the new base for a second pass.'],
            ['Verified updates', 'The app tells you when a new version exists and only installs it if the SHA-256 matches, after you confirm.'],
        ],
        finalTitle: 'Ready to translate?', finalDescription: 'Download the Windows installer. No administrator permission required.',
    },
    es: {
        eyebrow: 'Traducción de XML para modders',
        title: 'Traduce el texto.',
        titleAccent: 'La estructura queda intacta.',
        description: 'STZ XML Translator extrae solo los campos que eliges, los traduce por lotes con IA o traducción automática y devuelve el archivo con etiquetas, atributos y orden de nodos tal como estaban.',
        download: 'Descargar para Windows', source: 'Código en GitHub', free: 'Funciona sin clave de API', license: 'GPLv3 / Comercial',
        sample: ['Hoja de Brasa', 'Una espada corta que conserva el calor de la forja.'],
        sampleOriginal: 'original', sampleTranslated: 'traducido', sampleNote: 'id, rarity y el orden de las etiquetas no cambian',
        specs: [['Versión', null], ['Sistema', 'Windows 10 y 11'], ['Interfaz', 'Tauri + React'], ['Proveedores', '5'], ['Idiomas de la app', '5'], ['Licencia', 'GPLv3 / Comercial']],
        flowEyebrow: 'Cómo funciona', flowTitle: 'Tres pasos, del archivo original al traducido',
        flow: [
            ['Carga el XML', 'La app detecta las etiquetas que se repiten. Eliges la etiqueta padre y los campos a traducir, o aplicas un preset guardado.'],
            ['Traduce', 'Por lotes o entrada por entrada. El progreso se guarda tras cada lote, así que puedes parar y retomar después.'],
            ['Revisa y exporta', 'Ajusta lo que quieras, confirma y exporta. El XML sale con la misma estructura que el original.'],
        ],
        providersEyebrow: 'Proveedores', providersTitle: 'Elige quién traduce',
        providersDescription: 'Cambia de proveedor en cualquier momento sin perder el progreso de la sesión.',
        providerColumns: ['Proveedor', 'Tipo', 'Qué necesita'],
        providers: [
            ['Traducción automática', 'Nada. Gratis y sin clave.'],
            ['IA', 'Clave de API. Traduce en lotes de 120 entradas.'],
            ['Traducción automática', 'Clave de API.'],
            ['Traducción automática', 'Clave de API.'],
            ['IA local', 'Ollama instalado. Funciona en tu PC con modelos como Llama 3.'],
        ],
        screensEyebrow: 'Por dentro', screensTitle: 'Conoce las pantallas',
        featuresEyebrow: 'Funciones', featuresTitle: 'Hecho para no romper el juego',
        features: [
            ['Integridad del XML', 'La extracción y la inyección conservan atributos, namespaces y el orden de los nodos. Solo cambia el texto de los campos elegidos.'],
            ['Retoma donde lo dejaste', 'Cada lote traducido se convierte en un checkpoint. Cierra la app y continúa otro día desde el mismo punto.'],
            ['Guardar en el propio archivo', 'Sobrescribe el original y recarga: la traducción pasa a ser la nueva base para una segunda pasada.'],
            ['Actualización verificada', 'La app avisa cuando hay una versión nueva y solo la instala si el SHA-256 coincide, con tu confirmación.'],
        ],
        finalTitle: '¿Listo para traducir?', finalDescription: 'Descarga el instalador para Windows. No pide permisos de administrador.',
    },
    fr: {
        eyebrow: 'Traduction de XML pour moddeurs',
        title: 'Traduisez le texte.',
        titleAccent: 'La structure reste intacte.',
        description: 'STZ XML Translator extrait uniquement les champs que vous choisissez, les traduit par lots avec l’IA ou la traduction automatique et rend le fichier avec ses balises, ses attributs et l’ordre des nœuds tels quels.',
        download: 'Télécharger pour Windows', source: 'Code sur GitHub', free: 'Fonctionne sans clé d’API', license: 'GPLv3 / Commerciale',
        sample: ['Lame de Braise', 'Une épée courte qui garde la chaleur de la forge.'],
        sampleOriginal: 'original', sampleTranslated: 'traduit', sampleNote: 'id, rarity et l’ordre des balises ne changent pas',
        specs: [['Version', null], ['Système', 'Windows 10 et 11'], ['Interface', 'Tauri + React'], ['Fournisseurs', '5'], ['Langues de l’app', '5'], ['Licence', 'GPLv3 / Commerciale']],
        flowEyebrow: 'Fonctionnement', flowTitle: 'Trois étapes, du fichier original au fichier traduit',
        flow: [
            ['Chargez le XML', 'L’application détecte les balises répétées. Vous choisissez la balise parente et les champs à traduire, ou appliquez un preset enregistré.'],
            ['Traduisez', 'Par lots ou entrée par entrée. La progression est enregistrée après chaque lot : vous pouvez arrêter et reprendre plus tard.'],
            ['Relisez et exportez', 'Ajustez ce que vous voulez, validez et exportez. Le XML garde la même structure que l’original.'],
        ],
        providersEyebrow: 'Fournisseurs', providersTitle: 'Choisissez qui traduit',
        providersDescription: 'Changez de fournisseur à tout moment sans perdre la progression de la session.',
        providerColumns: ['Fournisseur', 'Type', 'Ce qu’il faut'],
        providers: [
            ['Traduction automatique', 'Rien. Gratuit et sans clé.'],
            ['IA', 'Clé d’API. Traduit par lots de 120 entrées.'],
            ['Traduction automatique', 'Clé d’API.'],
            ['Traduction automatique', 'Clé d’API.'],
            ['IA locale', 'Ollama installé. Tourne sur votre PC avec des modèles comme Llama 3.'],
        ],
        screensEyebrow: 'En détail', screensTitle: 'Découvrez les écrans',
        featuresEyebrow: 'Fonctionnalités', featuresTitle: 'Conçu pour ne pas casser le jeu',
        features: [
            ['Intégrité du XML', 'L’extraction et l’injection préservent les attributs, les espaces de noms et l’ordre des nœuds. Seul le texte des champs choisis change.'],
            ['Reprise là où vous vous êtes arrêté', 'Chaque lot traduit devient un point de reprise. Fermez l’application et continuez un autre jour au même endroit.'],
            ['Enregistrer dans le fichier', 'Écrasez l’original et rechargez : la traduction devient la nouvelle base pour un second passage.'],
            ['Mise à jour vérifiée', 'L’application signale une nouvelle version et ne l’installe que si le SHA-256 correspond, après votre confirmation.'],
        ],
        finalTitle: 'Prêt à traduire ?', finalDescription: 'Téléchargez l’installateur Windows. Aucun droit administrateur requis.',
    },
    de: {
        eyebrow: 'XML-Übersetzung für Modder',
        title: 'Übersetze den Text.',
        titleAccent: 'Die Struktur bleibt unverändert.',
        description: 'STZ XML Translator extrahiert nur die Felder, die du auswählst, übersetzt sie stapelweise mit KI oder maschineller Übersetzung und gibt die Datei mit Tags, Attributen und Knotenreihenfolge genau wie zuvor zurück.',
        download: 'Für Windows herunterladen', source: 'Code auf GitHub', free: 'Funktioniert ohne API-Schlüssel', license: 'GPLv3 / Kommerziell',
        sample: ['Glutklinge', 'Ein Kurzschwert, das die Wärme der Schmiede bewahrt.'],
        sampleOriginal: 'Original', sampleTranslated: 'übersetzt', sampleNote: 'id, rarity und die Reihenfolge der Tags bleiben gleich',
        specs: [['Version', null], ['System', 'Windows 10 und 11'], ['Oberfläche', 'Tauri + React'], ['Anbieter', '5'], ['App-Sprachen', '5'], ['Lizenz', 'GPLv3 / Kommerziell']],
        flowEyebrow: 'So funktioniert es', flowTitle: 'Drei Schritte von der Originaldatei zur Übersetzung',
        flow: [
            ['XML laden', 'Die App erkennt wiederkehrende Tags. Du wählst das Eltern-Tag und die zu übersetzenden Felder oder wendest ein gespeichertes Preset an.'],
            ['Übersetzen', 'Stapelweise oder Eintrag für Eintrag. Der Fortschritt wird nach jedem Stapel gespeichert, du kannst also pausieren und später weitermachen.'],
            ['Prüfen und exportieren', 'Passe an, was du möchtest, bestätige und exportiere. Das XML hat dieselbe Struktur wie das Original.'],
        ],
        providersEyebrow: 'Anbieter', providersTitle: 'Wähle, wer übersetzt',
        providersDescription: 'Wechsle den Anbieter jederzeit, ohne den Fortschritt der Sitzung zu verlieren.',
        providerColumns: ['Anbieter', 'Typ', 'Voraussetzung'],
        providers: [
            ['Maschinelle Übersetzung', 'Nichts. Kostenlos und ohne Schlüssel.'],
            ['KI', 'API-Schlüssel. Übersetzt in Stapeln von 120 Einträgen.'],
            ['Maschinelle Übersetzung', 'API-Schlüssel.'],
            ['Maschinelle Übersetzung', 'API-Schlüssel.'],
            ['Lokale KI', 'Installiertes Ollama. Läuft auf deinem PC mit Modellen wie Llama 3.'],
        ],
        screensEyebrow: 'Im Detail', screensTitle: 'Die Ansichten',
        featuresEyebrow: 'Funktionen', featuresTitle: 'Gebaut, damit das Spiel nicht kaputtgeht',
        features: [
            ['XML-Integrität', 'Extraktion und Injektion erhalten Attribute, Namespaces und Knotenreihenfolge. Nur der Text der gewählten Felder ändert sich.'],
            ['Weitermachen, wo du aufgehört hast', 'Jeder übersetzte Stapel wird zum Checkpoint. Schließe die App und mach an einem anderen Tag an derselben Stelle weiter.'],
            ['In der Datei speichern', 'Überschreibe das Original und lade neu: Die Übersetzung wird zur neuen Basis für einen zweiten Durchgang.'],
            ['Geprüfte Updates', 'Die App meldet neue Versionen und installiert sie nur, wenn der SHA-256 stimmt und du zustimmst.'],
        ],
        finalTitle: 'Bereit zum Übersetzen?', finalDescription: 'Lade das Windows-Installationsprogramm herunter. Keine Administratorrechte nötig.',
    },
    it: {
        eyebrow: 'Traduzione di XML per modder',
        title: 'Traduci il testo.',
        titleAccent: 'La struttura resta intatta.',
        description: 'STZ XML Translator estrae solo i campi che scegli, li traduce in batch con IA o traduzione automatica e restituisce il file con tag, attributi e ordine dei nodi esattamente com’erano.',
        download: 'Scarica per Windows', source: 'Codice su GitHub', free: 'Funziona senza chiave API', license: 'GPLv3 / Commerciale',
        sample: ['Lama di Brace', 'Una spada corta che conserva il calore della forgia.'],
        sampleOriginal: 'originale', sampleTranslated: 'tradotto', sampleNote: 'id, rarity e l’ordine dei tag non cambiano',
        specs: [['Versione', null], ['Sistema', 'Windows 10 e 11'], ['Interfaccia', 'Tauri + React'], ['Provider', '5'], ['Lingue dell’app', '5'], ['Licenza', 'GPLv3 / Commerciale']],
        flowEyebrow: 'Come funziona', flowTitle: 'Tre passaggi, dal file originale a quello tradotto',
        flow: [
            ['Carica l’XML', 'L’app rileva i tag che si ripetono. Scegli il tag padre e i campi da tradurre, oppure applica un preset salvato.'],
            ['Traduci', 'In batch o voce per voce. I progressi vengono salvati dopo ogni batch, così puoi fermarti e riprendere più tardi.'],
            ['Rivedi ed esporta', 'Modifica ciò che vuoi, conferma ed esporta. L’XML esce con la stessa struttura dell’originale.'],
        ],
        providersEyebrow: 'Provider', providersTitle: 'Scegli chi traduce',
        providersDescription: 'Cambia provider in qualsiasi momento senza perdere i progressi della sessione.',
        providerColumns: ['Provider', 'Tipo', 'Cosa serve'],
        providers: [
            ['Traduzione automatica', 'Niente. Gratuito e senza chiave.'],
            ['IA', 'Chiave API. Traduce in batch da 120 voci.'],
            ['Traduzione automatica', 'Chiave API.'],
            ['Traduzione automatica', 'Chiave API.'],
            ['IA locale', 'Ollama installato. Gira sul tuo PC con modelli come Llama 3.'],
        ],
        screensEyebrow: 'All’interno', screensTitle: 'Scopri le schermate',
        featuresEyebrow: 'Funzioni', featuresTitle: 'Fatto per non rompere il gioco',
        features: [
            ['Integrità dell’XML', 'Estrazione e iniezione preservano attributi, namespace e ordine dei nodi. Cambia solo il testo dei campi scelti.'],
            ['Riprendi da dove eri rimasto', 'Ogni batch tradotto diventa un checkpoint. Chiudi l’app e continua un altro giorno dallo stesso punto.'],
            ['Salva nel file stesso', 'Sovrascrivi l’originale e ricarica: la traduzione diventa la nuova base per un secondo passaggio.'],
            ['Aggiornamento verificato', 'L’app avvisa quando c’è una nuova versione e la installa solo se lo SHA-256 corrisponde, dopo la tua conferma.'],
        ],
        finalTitle: 'Pronto a tradurre?', finalDescription: 'Scarica l’installer per Windows. Non richiede permessi di amministratore.',
    },
};

const FEATURE_ICONS = [
    'M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16',
    'M4 12a8 8 0 1 0 3-6.2M4 4v5h5M12 8v4l3 2',
    'M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6',
    'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4',
];

const SAMPLE_ORIGINAL = ['Ember Blade', 'A short sword that keeps the warmth of the forge.'];

function Eyebrow({ children }) {
    return <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">{children}</p>;
}

function Icon({ d, className = '' }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d={d} />
        </svg>
    );
}

/**
 * Painel de código sempre escuro, como um editor: as cores fixas mantêm o
 * contraste do realce de sintaxe em qualquer tema do site.
 */
function XmlPanel({ file, label, values, highlight = false }) {
    const tag = 'text-[#7d8799]';
    const attr = 'text-[#9aa5b8]';
    const text = highlight ? 'rounded bg-[var(--accent)]/15 px-1 text-[var(--accent)]' : 'text-[#e6e8ec]';

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f11]">
            <div className="flex h-9 items-center justify-between border-b border-white/5 bg-[#121316] px-4 font-mono text-[11px]">
                <span className="text-white/50">{file}</span>
                <span className={highlight ? 'text-[var(--accent)]' : 'text-white/40'}>{label}</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 md:text-[13px]">
                <code>
                    <span className={tag}>&lt;item </span><span className={attr}>id=&quot;1001&quot; rarity=&quot;rare&quot;</span><span className={tag}>&gt;</span>{'\n'}
                    {'  '}<span className={tag}>&lt;name&gt;</span><span className={text}>{values[0]}</span><span className={tag}>&lt;/name&gt;</span>{'\n'}
                    {'  '}<span className={tag}>&lt;description&gt;</span><span className={text}>{values[1]}</span><span className={tag}>&lt;/description&gt;</span>{'\n'}
                    <span className={tag}>&lt;/item&gt;</span>
                </code>
            </pre>
        </div>
    );
}

export default function XmlTranslatorProjectPage({ initialRelease = null, showcase = [] }) {
    const { lang } = useLanguage();
    const text = copy[lang] || copy.en;
    const version = initialRelease?.version || null;
    const downloadHref = downloadPath(lang, 'stz-xml-translator');
    const releaseUrl = version ? `${REPO_URL}/releases/tag/v${version}` : `${REPO_URL}/releases/latest`;

    return (
        <main className="min-h-screen overflow-hidden bg-transparent pb-24 pt-28 text-[var(--text-primary)]">
            {/* Hero */}
            <section className="container mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                    <Badge variant="stable" className="mb-6">{version ? `STZ XML Translator ${version}` : 'STZ XML Translator'}</Badge>
                    <Eyebrow>{text.eyebrow}</Eyebrow>
                    <h1 className="mb-6 text-4xl font-bold tracking-[-0.04em] text-[var(--text-heading)] md:text-5xl">
                        {text.title}
                        <span className="block text-[var(--accent)]">{text.titleAccent}</span>
                    </h1>
                    <p className="mb-9 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{text.description}</p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="default">
                            <Link href={downloadHref}>{text.download}{version ? ` · ${version}` : ''}</Link>
                        </Button>
                        <Button asChild variant="secondary" size="default">
                            <a href={REPO_URL} target="_blank" rel="noreferrer">{text.source}</a>
                        </Button>
                    </div>
                    <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-muted)]">
                        <span className="font-semibold text-[var(--accent)]">{text.free}</span>
                        <span aria-hidden="true">·</span>
                        <span>{text.license}</span>
                    </p>
                </div>

                <div className="grid gap-3 lg:col-span-7">
                    <XmlPanel file="items_en.xml" label={text.sampleOriginal} values={SAMPLE_ORIGINAL} />
                    <div aria-hidden="true" className="flex items-center gap-3 px-2 font-mono text-[11px] text-[var(--text-muted)]">
                        <span className="text-lg leading-none text-[var(--accent)]">↓</span>
                        {text.sampleNote}
                    </div>
                    <XmlPanel file="items_translated.xml" label={text.sampleTranslated} values={text.sample} highlight />
                </div>
            </section>

            {/* Flow */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <Eyebrow>{text.flowEyebrow}</Eyebrow>
                <h2 className="mb-10 max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.flowTitle}</h2>
                <ol className="grid gap-4 md:grid-cols-3">
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

            {/* Providers */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Eyebrow>{text.providersEyebrow}</Eyebrow>
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.providersTitle}</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">{text.providersDescription}</p>
                    </div>
                    <div className="overflow-x-auto rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] lg:col-span-8">
                        <table className="w-full min-w-[520px] text-left text-sm">
                            <thead>
                                <tr className="border-b [border-color:var(--border-subtle)]">
                                    {text.providerColumns.map((column) => (
                                        <th key={column} scope="col" className="px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {PROVIDERS.map((name, i) => (
                                    <tr key={name} className="border-b [border-color:var(--border-subtle)] last:border-0">
                                        <th scope="row" className="whitespace-nowrap px-5 py-4 font-bold text-[var(--text-heading)]">{name}</th>
                                        <td className="whitespace-nowrap px-5 py-4 text-[var(--text-secondary)]">{text.providers[i][0]}</td>
                                        <td className="px-5 py-4 text-[var(--text-secondary)]">{text.providers[i][1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Screens */}
            {showcase.length > 0 && (
                <>
                    <section className="container mx-auto max-w-6xl px-6 pb-10">
                        <Eyebrow>{text.screensEyebrow}</Eyebrow>
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.screensTitle}</h2>
                    </section>
                    <ProjectFeatureShowcase items={showcase} />
                </>
            )}

            {/* Features */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <Eyebrow>{text.featuresEyebrow}</Eyebrow>
                <h2 className="mb-10 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-4xl">{text.featuresTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {text.features.map(([title, description], i) => (
                        <article key={title} className="rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-7 shadow-[var(--shadow-card)] transition-colors hover:[border-color:var(--border-hover)]">
                            <Icon d={FEATURE_ICONS[i]} className="mb-5 size-8 text-[var(--accent)]" />
                            <h3 className="mb-2 text-lg font-bold text-[var(--text-heading)]">{title}</h3>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Specs */}
            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-6">
                    {text.specs.map(([label, value]) => (
                        <div key={label} className="bg-[var(--surface-1)] p-5">
                            <dt className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{label}</dt>
                            <dd className="font-semibold text-[var(--text-heading)]">
                                {value ?? (
                                    <a href={releaseUrl} target="_blank" rel="noreferrer" className="underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)]">
                                        {version || '—'}
                                    </a>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto max-w-6xl px-6 text-center">
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl">{text.finalTitle}</h2>
                <p className="mb-8 text-[var(--text-secondary)]">{text.finalDescription}</p>
                <Button asChild variant="primary" size="default"><Link href={downloadHref}>{text.download}</Link></Button>
            </section>
        </main>
    );
}
