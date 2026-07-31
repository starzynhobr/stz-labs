export const hub = {
    title: 'Test del Mouse Online — Clic, Doppio Clic, Rotellina e Polling | STZ Labs',
    description: 'Strumenti gratuiti per testare il mouse dal browser: clic, doppio clic involontario, CPS, rotellina e frequenza di polling. Senza installare nulla.',
    h1: 'Test del mouse online',
    badge: 'Strumenti gratuiti',
    intro: 'Cinque test che funzionano direttamente nel browser, senza installare nulla e senza che alcun dato lasci il tuo computer. Scegli cosa vuoi diagnosticare: clic che non vengono registrati, doppi clic che partono da soli, velocità di clic, rotellina o frequenza di polling del sensore.',
    toolsHeading: 'Scegli il test',
    noteHeading: 'Prima di iniziare',
    noteBody: 'Tutti i test richiedono un mouse fisico — trackpad e schermi touch generano eventi diversi e i loro risultati non servono per una diagnosi. Con un mouse wireless, prova a batteria carica: una batteria scarica provoca clic persi identici a quelli di uno switch difettoso.',
};

export const toolLabels = {
    click: 'Test di clic',
    'double-click': 'Doppio clic',
    cps: 'CPS',
    scroll: 'Scorrimento',
    'polling-rate': 'Polling rate',
};

export const ui = {
    relatedHeading: 'Strumenti correlati',
    faqHeading: 'Domande frequenti',
    productHeading: 'Da STZ Labs',
    clearHistory: 'Cancella cronologia',
    historyHeading: 'Cronologia',
    historyEmpty: 'Nessun risultato salvato finora.',
    noMouseWarning: 'Questo test richiede un mouse fisico. Trackpad e schermi touch producono eventi diversi.',
    reset: 'Reimposta',
    start: 'Inizia',
    stop: 'Ferma',
};

export const tools = {
    click: {
        title: 'Test di Clic del Mouse Online — Sinistro, Destro e Centrale | STZ Labs',
        description: 'Verifica se tutti i tasti del mouse registrano i clic correttamente. Guarda l’intervallo tra i clic e individua i tasti che saltano o raddoppiano.',
        h1: 'Test di clic del mouse',
        intro: 'Clicca nell’area qui sotto con ogni tasto del mouse. Il pannello registra quale tasto è stato premuto, l’intervallo dal clic precedente e costruisce una cronologia completa — utile per dimostrare che un tasto sta cedendo.',
        areaTitle: 'Area di test',
        areaSubtitle: 'Clicca con un tasto qualsiasi del mouse',
        sections: [
            {
                heading: 'Come capire se un tasto del mouse sta cedendo',
                body: 'Il sintomo più comune non è un tasto morto, ma un tasto intermittente: clicchi e non succede nulla, riclicchi e funziona. Nel test qui sopra questo appare come clic che hai fatto ma che non sono mai entrati nella lista. Fai venti clic contando ad alta voce e confronta con il totale registrato. Se il contatore ne mostra di meno, lo switch sta perdendo il contatto.\n\nUn altro segnale è il clic che si rilascia da solo a metà trascinamento. Se selezioni del testo o sposti un file e la selezione si interrompe per strada, lo switch perde contatto sotto pressione continua — un difetto diverso dal doppio clic, e di solito più avanzato.',
            },
            {
                heading: 'Hardware, driver o software?',
                body: 'Prima di aprire il mouse, isola la causa. Prova un’altra porta USB, meglio se posteriore e collegata direttamente alla scheda madre, senza hub. Gli hub senza alimentazione propria sono una causa frequente di clic persi sui mouse RGB, che consumano di più.\n\nPoi prova lo stesso mouse su un altro computer. Se il problema segue il mouse, è hardware. Se resta sul computer, sospetta del driver o del software del produttore — un profilo di macro mal configurato si mangia volentieri clic legittimi. Vale anche provare con il software del produttore chiuso, dato che i livelli di rimappatura agiscono prima che il browser riceva l’evento.',
            },
            {
                heading: 'Cosa questo test non rileva',
                body: 'Il browser riceve eventi già elaborati dal sistema operativo, quindi alcuni problemi restano invisibili qui. La latenza reale di clic, per esempio, dipende dall’intero percorso tra switch e schermo, mentre noi misuriamo solo l’intervallo tra eventi arrivati.\n\nAnche i difetti del sensore — cursore che trema, salta o si blocca — non compaiono in un test di clic. Per quello il test di polling rate offre un quadro migliore, perché misura con quale regolarità il mouse riporta il movimento.',
            },
        ],
        faq: [
            {
                q: 'Perché il clic centrale non viene rilevato?',
                a: 'Alcuni browser usano il tasto centrale per aprire i link in una nuova scheda o attivare lo scorrimento automatico, e intercettano l’evento prima della pagina. Il test blocca questo comportamento nell’area di test, ma se il clic continua a non comparire, prova fuori dal browser per confermare che il tasto risponda.',
            },
            {
                q: 'Il test funziona con un mouse wireless?',
                a: 'Funziona, ma prova a batteria carica. Una batteria scarica provoca perdita di pacchetti tra mouse e ricevitore, e il sintomo è identico a quello di uno switch difettoso: clic che spariscono. Se puoi, ripeti il test via cavo.',
            },
            {
                q: 'Quanti clic servono per esserne certi?',
                a: 'Cinquanta clic per tasto sono un campione ragionevole. I guasti degli switch sono intermittenti per natura, quindi pochi clic possono non intercettare il problema. Se sospetti di un tasto preciso, insisti su quello.',
            },
            {
                q: 'Il sito registra i miei clic?',
                a: 'No. Tutta l’elaborazione avviene nel tuo browser e nulla viene inviato ad alcun server. Chiudere la scheda cancella tutto.',
            },
        ],
    },

    'double-click': {
        title: 'Test del Doppio Clic del Mouse — Rileva i Clic Doppi Involontari | STZ Labs',
        description: 'Scopri se il tuo mouse fa doppio clic da solo. Il test misura l’intervallo tra i clic e segnala le ripetizioni sotto la soglia umana.',
        h1: 'Test del doppio clic involontario',
        intro: 'Uno switch usurato registra due clic dove ne hai fatto uno. Clicca lentamente nell’area qui sotto, un clic alla volta, lasciando almeno un secondo tra uno e l’altro. Ogni coppia sotto la soglia scelta viene segnalata — nessuno clicca due volte in meno di 80 millisecondi per sbaglio.',
        areaTitle: 'Area di test',
        areaSubtitle: 'Fai clic singoli e ben distanziati',
        sections: [
            {
                heading: 'Perché uno switch inizia a fare doppio clic',
                body: 'Dentro ogni switch una lamella metallica tocca un contatto quando premi. Con l’uso quella lamella perde tensione e inizia a rimbalzare sul contatto invece di appoggiarsi in modo pulito. Ogni rimbalzo genera un impulso elettrico, e il mouse interpreta ogni impulso come un clic.\n\nL’ossidazione accelera il processo. L’umidità e il grasso naturale della mano formano una pellicola sottile sul contatto, che aumenta la resistenza e rende il segnale instabile. Per questo il problema compare prima sul tasto sinistro, molto più sollecitato, e peggiora nelle zone costiere.',
            },
            {
                heading: 'Cos’è il debounce time e come maschera il problema',
                body: 'Il debounce è la finestra in cui il mouse ignora nuovi impulsi dopo aver registrato un clic. Esiste proprio per filtrare il rimbalzo naturale dello switch, e di fabbrica sta tra 8 e 12 millisecondi.\n\nDiversi produttori permettono di alzare questo valore via software — Razer, Logitech e Corsair espongono l’impostazione. Portarlo a 20 o 30 ms di solito risolve un doppio clic iniziale. Ma sii consapevole di cosa è successo: non hai riparato lo switch, hai detto al mouse di ignorare il sintomo. L’usura continua, e arriva un punto in cui il debounce necessario è così alto da ostacolare i clic rapidi legittimi. È un rimedio temporaneo, e valido, purché tu sappia che è temporaneo.',
            },
            {
                heading: 'Sostituire lo switch o il mouse?',
                body: 'Sostituire lo switch conviene quando il mouse è buono e il resto è intatto. Uno switch singolo costa pochissimo, e i modelli con switch su zoccolo permettono il cambio senza saldare. Sugli altri bisogna dissaldare, il che richiede saldatore, pompetta e un po’ di pratica — non è difficile, ma non è il primo progetto ideale per chi non ha mai saldato.\n\nPensare di cambiare il mouse ha più senso quando si sommano altri segni di fine vita: cavo con falso contatto vicino all’uscita, piedini consumati, sensore che salta o rivestimento gommato che inizia a sciogliersi. Se il doppio clic arriva insieme a due o tre di questi, lo switch è solo il primo componente a cedere.\n\nPrima di tutto, controlla la garanzia. Il doppio clic su un mouse con meno di due anni è un difetto di fabbricazione riconosciuto dalla maggior parte dei marchi, e diversi lo sostituiscono senza discutere.',
            },
        ],
        faq: [
            {
                q: 'Quale intervallo indica un doppio clic difettoso?',
                a: 'Sotto gli 80 millisecondi è praticamente certo che il mouse abbia ripetuto da solo — il limite umano per due clic voluti si aggira sui 100 ms, e richiede comunque sforzo. Gli intervalli tra 80 e 150 ms sono sospetti e conviene ripetere il test con clic più distanziati.',
            },
            {
                q: 'Alzare il debounce risolve definitivamente?',
                a: 'No. Risolve il sintomo finché l’usura è lieve. Lo switch continua a degradarsi e il valore necessario sale fino a interferire con i clic rapidi legittimi. Consideralo un modo per guadagnare tempo prima della sostituzione.',
            },
            {
                q: 'Pulire lo switch con lo spray per contatti funziona?',
                a: 'Funziona quando la causa è l’ossidazione, e può restituire mesi di utilizzo. Non serve a nulla quando la lamella ha già perso tensione meccanica. Essendo economico e reversibile, il tentativo di solito vale prima di prendere il saldatore.',
            },
            {
                q: 'Il doppio clic può essere un problema software?',
                a: 'Raramente, ma succede. Macro mal configurate e strumenti di rimappatura possono duplicare i clic. Se il test segnala ripetizioni, chiudi il software del produttore e riprova. Se il problema sparisce, era configurazione e non hardware.',
            },
        ],
    },

    cps: {
        title: 'Test CPS — Misura i Tuoi Clic al Secondo Online | STZ Labs',
        description: 'Misura quanti clic al secondo raggiungi. Scegli la durata del test, guarda la media in tempo reale e confronta con i tentativi precedenti.',
        h1: 'Test CPS (clic al secondo)',
        intro: 'Scegli la durata, clicca il più velocemente possibile e guarda la tua media. Il cronometro parte dal primo clic, quindi non si perde tempo alla partenza.',
        areaTitle: 'Area di test',
        areaSubtitle: 'Il tempo parte dal primo clic',
        sections: [
            {
                heading: 'Quanto è un CPS normale',
                body: 'Cliccando normalmente, con un dito, la maggior parte delle persone sta tra 4 e 7 clic al secondo. Tra 7 e 10 c’è già pratica deliberata. Sopra i 10 in modo costante, quasi sempre c’è una tecnica di mezzo.\n\nIl numero dipende anche dal mouse. Switch leggeri e con corsa breve favoriscono una cadenza alta, e un debounce alto nel software impone un tetto artificiale: se il mouse ignora gli impulsi per 20 ms, non superi i 50 clic al secondo per definizione.',
            },
            {
                heading: 'Jitter, butterfly e drag click',
                body: 'Il jitter click consiste nel tendere l’avambraccio per generare un tremore controllato che si trasmette al dito. Supera i 10 CPS con facilità, ed è la tecnica con il rischio di infortunio più alto — è letteralmente tensione muscolare sostenuta su una piccola articolazione.\n\nIl butterfly click alterna due dita sullo stesso tasto, raddoppiando la cadenza. È più gentile con il corpo, ma dipende da uno switch che accetti azionamenti molto ravvicinati, e sbatte in pieno contro il limite del debounce.\n\nIl drag click trascina il dito sulla superficie del tasto, usando l’attrito per generare più azionamenti. Raggiunge numeri altissimi, consuma lo switch in fretta ed è considerato imbroglio su molti server di gioco.',
            },
            {
                heading: 'Il rischio di infortunio è reale',
                body: 'Tendinite e sindrome del tunnel carpale non arrivano da una sessione di test, ma dalla ripetizione prolungata con il polso in posizione sbagliata. Il jitter click è particolarmente rischioso perché la tecnica si basa sul mantenere tensione continua.\n\nSe senti formicolio, dolore al polso o perdita di forza nell’afferrare oggetti, fermati. Sono segnali di compressione nervosa e non migliorano insistendo. Nessun record di CPS ripaga un infortunio che rende doloroso digitare.',
            },
        ],
        faq: [
            {
                q: 'Qual è la durata ideale del test?',
                a: 'Cinque secondi è lo standard della maggior parte dei confronti e il miglior equilibrio: abbastanza lungo da diluire la fortuna della partenza, abbastanza corto da reggere il picco. I test da 30 o 60 secondi misurano resistenza, non velocità, e la media cala parecchio.',
            },
            {
                q: 'Perché il mio CPS qui è più basso che su altri siti?',
                a: 'Cambia il modo di contare. Alcuni siti avviano il cronometro prima del primo clic, gonfiando la media; altri contano pressione e rilascio come due eventi. Qui il cronometro parte dal primo clic e conta solo la pressione.',
            },
            {
                q: 'Un mouse migliore aumenta il mio CPS?',
                a: 'Fino a un certo punto. Switch leggero, corsa breve e debounce basso tolgono barriere fisiche, ma il limite resti tu. Regolare il debounce nel software rende di solito più che cambiare mouse.',
            },
            {
                q: 'Il risultato resta salvato?',
                a: 'Resta nel tuo browser, solo per confrontare i tentativi. Nulla viene inviato a server, e il pulsante di cancellazione elimina tutto.',
            },
        ],
    },

    scroll: {
        title: 'Test della Rotellina del Mouse Online — Scorrimento che Salta o si Inverte | STZ Labs',
        description: 'Testa la rotellina del mouse e rileva scorrimenti che saltano, si invertono da soli o si bloccano. Guarda direzione, scatti e eventi irregolari.',
        h1: 'Test della rotellina del mouse',
        intro: 'Gira la rotellina nell’area qui sotto, in entrambi i versi. Il test conta ogni scatto, mostra la direzione ed evidenzia le inversioni — quando scorri verso il basso e l’evento arriva come verso l’alto.',
        areaTitle: 'Area di test',
        areaSubtitle: 'Usa la rotellina in quest’area',
        sections: [
            {
                heading: 'Scorrimento che salta: l’encoder è sporco',
                body: 'La rotellina fa girare un asse dentro un encoder, che converte il movimento in impulsi. Polvere e grasso entrano da quell’apertura e si accumulano sui contatti interni. Il risultato è un impulso letto male: scorri di uno scatto verso il basso e la pagina sale, oppure fai tre scatti e ne vengono registrati due.\n\nÈ il difetto più comune della rotellina, e anche il più facile da risolvere. Non è usura meccanica, è sporcizia che disturba la lettura — in molti casi la pulizia riporta il comportamento originale.',
            },
            {
                heading: 'Come pulire l’encoder',
                body: 'Il modo meno invasivo è spruzzare spray per contatti dalla fessura laterale della rotellina, poi girarla a lungo in entrambi i versi per un minuto o due, così il prodotto raggiunge i contatti. Lascia asciugare del tutto prima di ricollegare il mouse.\n\nSe non basta, bisogna aprire. Le viti si trovano di solito sotto i piedini di scorrimento, che si staccano con attenzione e un po’ di calore dal phon. Con l’encoder accessibile si può aprire il suo involucro metallico e pulire le lamelle interne con alcol isopropilico. È una riparazione di media difficoltà, e il rischio maggiore è danneggiare i piedini durante lo smontaggio.\n\nEvita il comune olio lubrificante. Attira più polvere e il problema torna peggiore nel giro di poche settimane.',
            },
            {
                heading: 'Quando non è il mouse',
                body: 'Prima di aprire qualsiasi cosa, escludi il software. Windows, il browser e alcune applicazioni applicano smorzamento e accelerazione allo scorrimento, e la combinazione può dare l’impressione di uno scorrimento irregolare anche con hardware perfetto.\n\nProva programmi diversi. Se lo scorrimento fa i capricci solo in uno, il problema è di quel programma. Lo scorrimento invertito di solito è configurazione — sia Windows sia il software del produttore hanno l’opzione di invertire la direzione, e viene attivata per sbaglio più spesso di quanto si pensi.',
            },
        ],
        faq: [
            {
                q: 'Lo scorrimento salta un po’ in entrambi i versi. È un difetto?',
                a: 'Quasi sempre è l’encoder sporco. Se succede in entrambi i versi e in programmi diversi, il problema è fisico, e la pulizia è il primo passo prima di pensare alla sostituzione.',
            },
            {
                q: 'Perché la pagina sale quando scorro verso il basso?',
                a: 'Se succede sempre, è la direzione invertita nelle impostazioni di Windows o del software del mouse. Se succede solo ogni tanto, è l’encoder che legge male un impulso — quindi sporco o usura.',
            },
            {
                q: 'Lo scorrimento fluido del browser altera il test?',
                a: 'Non il conteggio: il test legge l’evento grezzo della rotellina, prima dell’animazione. Lo smorzamento cambia ciò che vedi a schermo, non ciò che il mouse ha riportato.',
            },
            {
                q: 'Si può testare l’inclinazione laterale della rotellina?',
                a: 'Solo quando il mouse invia l’inclinazione come evento di scorrimento orizzontale, cosa che fanno quasi tutti. Il test mostra l’asse rilevato, così puoi verificare se l’inclinazione arriva.',
            },
        ],
    },

    'polling-rate': {
        title: 'Test del Polling Rate del Mouse — Misura gli Hz Online | STZ Labs',
        description: 'Misura la frequenza di polling reale del tuo mouse in Hz. Scopri se raggiunge i 1000Hz promessi e confronta con il valore impostato nel software.',
        h1: 'Test della frequenza di polling',
        intro: 'Muovi il mouse in modo continuo nell’area qui sotto per qualche secondo. Il test misura l’intervallo tra gli eventi di movimento e stima la frequenza in hertz. Un movimento costante e senza pause dà la lettura più affidabile.',
        areaTitle: 'Area di test',
        areaSubtitle: 'Muovi il mouse senza fermarti in quest’area',
        sections: [
            {
                heading: 'Cosa significa la frequenza di polling',
                body: 'La frequenza di polling indica quante volte al secondo il mouse comunica la propria posizione al computer. A 125 Hz succede ogni 8 millisecondi; a 1000 Hz, ogni millisecondo. È la frequenza con cui il sistema scopre dove si trova il cursore.\n\nIl guadagno è maggiore nella parte bassa della scala. Passare da 125 a 500 Hz taglia il ritardo da 8 a 2 ms, una differenza percepibile nei movimenti rapidi. Da 500 a 1000 Hz il taglio è di un solo millisecondo — misurabile, raramente percepibile. Ecco perché i salti di marketing a 4000 o 8000 Hz portano così poco: la curva si è già appiattita.',
            },
            {
                heading: 'Il costo in CPU',
                body: 'Ogni report del mouse genera un interrupt che il processore deve gestire. A 1000 Hz sono mille interrupt al secondo, a 8000 Hz ottomila. Su macchine moderne l’impatto è ridotto, ma esiste, e si manifesta proprio quando la CPU è già al limite — cioè nel gioco competitivo, lo stesso scenario in cui la frequenza alta dovrebbe aiutare.\n\nSu computer più vecchi o processori di fascia bassa, frequenze molto alte arrivano a ridurre gli FPS medi. Se sei arrivato qui indagando su un calo di prestazioni, prova a 500 Hz e confronta: spesso il risultato è più stabile che a 1000.',
            },
            {
                heading: 'Come cambiarla e perché la misura può divergere',
                body: 'La frequenza si imposta nel software del produttore — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — di solito in una sezione prestazioni. Alcuni mouse hanno un tasto fisico o una combinazione per cambiarla senza software.\n\nSe il valore misurato qui è molto sotto quello impostato, il cavo, la distanza dal ricevitore wireless o interferenze USB 3.0 sono i sospetti più comuni — le porte 3.0 sono una classica fonte di rumore per i ricevitori a 2,4 GHz. Prima di concludere, ripeti la misura con movimenti ampi e continui: un campione piccolo distorce il risultato.\n\nVale la pena sapere come funziona la misura. Il browser non consegna un evento per ogni report del mouse: raggruppa i report e li consegna a lotti, quindi contare gli eventi darebbe sempre qualcosa vicino a 60 al secondo, qualunque mouse tu abbia. Questo test usa `getCoalescedEvents`, che restituisce i campioni grezzi di ogni lotto — è così che 500 o 1000 Hz diventano visibili. Funziona nei browser basati su Chromium: Chrome, Edge e Opera. Firefox e i suoi derivati implementano il metodo ma non espongono i campioni intermedi, e la consegna resta ferma intorno ai 60 Hz — anche su monitor a 144 Hz, perché il limite è del browser e non dello schermo. Quando rileva questo schema, il test lo segnala invece di presentare il tetto del browser come se fosse la frequenza del mouse.',
            },
        ],
        faq: [
            {
                q: 'Perché la misura non corrisponde ai 1000 Hz impostati?',
                a: 'Un movimento breve o intermittente abbassa la media, quindi insisti con movimenti ampi per qualche secondo. Se il numero resta basso, controlla il cavo, la distanza dal ricevitore wireless e se è collegato a una porta USB 3.0. E verifica in quale browser sei: su Firefox e derivati la lettura resta intorno ai 60 Hz qualunque sia il monitor, e il test lo segnala quando accade.',
            },
            {
                q: 'Vale la pena usare 1000 Hz?',
                a: 'Vale se il computer ha margine di CPU. Il guadagno vero sta nel lasciare i 125 Hz; da 500 a 1000 la differenza è di un millisecondo. Su macchine più deboli, 500 Hz dà spesso un risultato più stabile.',
            },
            {
                q: 'Una frequenza alta consuma più batteria sui mouse wireless?',
                a: 'Consuma, e parecchio. Riportare mille volte al secondo costa molto più di 125, ed è comune che l’autonomia si dimezzi o peggio tra i due estremi.',
            },
            {
                q: 'I mouse wireless hanno una frequenza più bassa di quelli cablati?',
                a: 'Oggi non necessariamente — i ricevitori dedicati reggono 1000 Hz in modo stabile. Il Bluetooth è un altro discorso: di solito resta a 125 Hz e soffre di più le interferenze.',
            },
        ],
    },
};
