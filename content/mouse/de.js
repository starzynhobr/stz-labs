export const hub = {
    title: 'Maus Testen Online — Klick, Doppelklick, Scrollrad und Abtastrate | STZ Labs',
    description: 'Kostenlose Browser-Tools zum Testen deiner Maus: Klick, ungewollter Doppelklick, CPS, Scrollrad und Abtastrate. Ohne Installation.',
    h1: 'Maus testen online',
    badge: 'Kostenlose Tools',
    intro: 'Fünf Tests, die direkt im Browser laufen, ohne Installation und ohne dass Daten deinen Rechner verlassen. Wähle aus, was du prüfen willst: Klicks, die nicht ankommen, Doppelklicks, die von allein auslösen, Klickgeschwindigkeit, Scrollrad oder die Abtastrate des Sensors.',
    toolsHeading: 'Test auswählen',
    noteHeading: 'Bevor du startest',
    noteBody: 'Alle Tests brauchen eine physische Maus — Touchpads und Touchscreens erzeugen andere Ereignisse, ihre Ergebnisse taugen nicht zur Diagnose. Bei einer Funkmaus mit geladenem Akku testen: ein schwacher Akku verschluckt Klicks genauso wie ein defekter Switch.',
};

export const toolLabels = {
    click: 'Klicktest',
    'double-click': 'Doppelklick',
    cps: 'CPS',
    scroll: 'Scrollen',
    'polling-rate': 'Abtastrate',
};

export const ui = {
    relatedHeading: 'Verwandte Tools',
    faqHeading: 'Häufige Fragen',
    productHeading: 'Von STZ Labs',
    clearHistory: 'Verlauf löschen',
    historyHeading: 'Verlauf',
    historyEmpty: 'Noch keine gespeicherten Ergebnisse.',
    noMouseWarning: 'Dieser Test benötigt eine physische Maus. Touchpads und Touchscreens erzeugen andere Ereignisse.',
    reset: 'Zurücksetzen',
    start: 'Starten',
    stop: 'Stoppen',
};

export const tools = {
    click: {
        title: 'Maustasten Testen Online — Links, Rechts und Mausrad | STZ Labs',
        description: 'Prüfe, ob alle Maustasten Klicks zuverlässig registrieren. Sieh den Abstand zwischen Klicks und erkenne Tasten, die aussetzen oder doppeln.',
        h1: 'Klicktest für die Maus',
        intro: 'Klicke unten in den Bereich mit jeder Maustaste. Das Panel erfasst, welche Taste ausgelöst hat, den Abstand zum vorherigen Klick, und baut einen vollständigen Verlauf auf — nützlich als Beleg, dass eine Taste defekt ist.',
        areaTitle: 'Testbereich',
        areaSubtitle: 'Klicke mit einer beliebigen Maustaste',
        sections: [
            {
                heading: 'Woran du eine defekte Maustaste erkennst',
                body: 'Das häufigste Symptom ist keine tote Taste, sondern eine unzuverlässige: Du klickst, nichts passiert, du klickst erneut und es funktioniert. Im Test oben zeigt sich das als Klicks, die du gemacht hast, die aber nie in der Liste erschienen. Klicke zwanzig Mal und zähle laut mit, dann vergleiche mit der erfassten Gesamtzahl. Zeigt der Zähler weniger, verliert der Switch den Kontakt.\n\nEin weiteres Zeichen ist ein Klick, der sich mitten im Ziehen von selbst löst. Bricht die Auswahl beim Markieren von Text oder beim Verschieben einer Datei ab, verliert der Switch unter dauerhaftem Druck den Kontakt — ein anderer Defekt als der Doppelklick, und meist weiter fortgeschritten.',
            },
            {
                heading: 'Hardware, Treiber oder Software?',
                body: 'Bevor du die Maus öffnest, grenze die Ursache ein. Teste an einem anderen USB-Anschluss, am besten hinten und direkt am Mainboard, ohne Hub. Hubs ohne eigene Stromversorgung sind eine häufige Ursache für Klickaussetzer bei RGB-Mäusen, die mehr Strom ziehen.\n\nTeste danach dieselbe Maus an einem anderen Rechner. Wandert das Problem mit der Maus, ist es Hardware. Bleibt es am Rechner, verdächtige den Treiber oder die Hersteller-Software — ein falsch konfiguriertes Makro-Profil schluckt bereitwillig legitime Klicks. Ein Test mit geschlossener Hersteller-Software lohnt ebenfalls, da Remapping-Schichten wirken, bevor der Browser das Ereignis überhaupt sieht.',
            },
            {
                heading: 'Was dieser Test nicht erkennt',
                body: 'Der Browser bekommt Ereignisse, die das Betriebssystem bereits verarbeitet hat, deshalb bleiben manche Probleme hier unsichtbar. Die echte Klicklatenz etwa hängt vom gesamten Weg zwischen Switch und Bildschirm ab, während wir nur den Abstand zwischen angekommenen Ereignissen messen.\n\nSensorfehler — ein Cursor, der zittert, springt oder hängt — tauchen in einem Klicktest ebenfalls nicht auf. Dafür gibt der Abtastraten-Test ein besseres Bild, denn er misst, wie regelmäßig die Maus Bewegung meldet.',
            },
        ],
        faq: [
            {
                q: 'Warum wird der Mittelklick nicht erkannt?',
                a: 'Manche Browser belegen die mittlere Taste mit dem Öffnen von Links in neuen Tabs oder mit Autoscroll und fangen das Ereignis vor der Seite ab. Der Test unterbindet das im Testbereich; erscheint der Klick trotzdem nicht, prüfe außerhalb des Browsers, ob die Taste überhaupt reagiert.',
            },
            {
                q: 'Funktioniert der Test mit einer Funkmaus?',
                a: 'Ja, aber teste mit geladenem Akku. Ein schwacher Akku führt zu Paketverlusten zwischen Maus und Empfänger, und das Symptom gleicht exakt einem defekten Switch: Klicks verschwinden. Wenn möglich, wiederhole den Test per Kabel.',
            },
            {
                q: 'Wie viele Klicks brauche ich für ein verlässliches Ergebnis?',
                a: 'Fünfzig Klicks pro Taste sind eine brauchbare Stichprobe. Switch-Fehler sind naturgemäß sporadisch, ein paar Klicks können das Problem komplett verfehlen. Verdächtigst du eine bestimmte Taste, konzentriere dich auf diese.',
            },
            {
                q: 'Zeichnet die Seite meine Klicks auf?',
                a: 'Nein. Alles läuft in deinem Browser, nichts wird an einen Server gesendet. Beim Schließen des Tabs ist alles weg.',
            },
        ],
    },

    'double-click': {
        title: 'Doppelklick-Test für die Maus — Ungewollte Doppelklicks Erkennen | STZ Labs',
        description: 'Finde heraus, ob deine Maus von allein doppelt klickt. Der Test misst den Abstand zwischen Klicks und markiert Wiederholungen unter der menschlichen Schwelle.',
        h1: 'Test auf ungewollten Doppelklick',
        intro: 'Ein verschlissener Switch registriert zwei Klicks, wo du einen gemacht hast. Klicke langsam in den Bereich unten, einzeln, mit mindestens einer Sekunde Abstand. Jedes Paar unter der gewählten Schwelle wird markiert — niemand klickt versehentlich zweimal innerhalb von 80 Millisekunden.',
        areaTitle: 'Testbereich',
        areaSubtitle: 'Setze einzelne, weit auseinanderliegende Klicks',
        sections: [
            {
                heading: 'Warum Switches anfangen zu doppeln',
                body: 'In jedem Switch berührt eine Metallfeder beim Drücken einen Kontakt. Mit der Zeit verliert diese Feder ihre Spannung und prellt gegen den Kontakt, statt sauber aufzuliegen. Jedes Prellen erzeugt einen elektrischen Impuls, und die Maus liest jeden Impuls als Klick.\n\nOxidation beschleunigt das. Feuchtigkeit und das Hautfett der Hand bilden einen dünnen Film auf dem Kontakt, der den Widerstand erhöht und das Signal instabil macht. Deshalb trifft es meist zuerst die linke Taste, die weit mehr genutzt wird, und in Küstenregionen tritt es früher auf.',
            },
            {
                heading: 'Was Debounce Time ist und wie sie das Problem verdeckt',
                body: 'Debounce ist das Zeitfenster, in dem die Maus nach einem registrierten Klick neue Impulse ignoriert. Es existiert genau dafür, das natürliche Prellen zu filtern, und liegt ab Werk zwischen 8 und 12 Millisekunden.\n\nViele Hersteller lassen den Wert per Software erhöhen — Razer, Logitech und Corsair bieten die Einstellung. 20 oder 30 ms beheben einen beginnenden Doppelklick meist. Sei dir aber im Klaren, was passiert ist: Du hast den Switch nicht repariert, sondern der Maus gesagt, sie soll das Symptom ignorieren. Der Verschleiß geht weiter, und irgendwann ist der nötige Debounce so hoch, dass er legitime schnelle Klicks blockiert. Es ist ein Provisorium, und ein gutes, solange du weißt, dass es temporär ist.',
            },
            {
                heading: 'Switch tauschen oder Maus tauschen?',
                body: 'Den Switch zu tauschen lohnt sich, wenn die Maus gut und der Rest intakt ist. Ein einzelner Switch kostet wenig, und Modelle mit gesockelten Switches lassen sich ohne Löten tauschen. Bei allen anderen muss entlötet werden, was Lötkolben, Entlötpumpe und etwas Übung verlangt — nicht schwer, aber kein ideales erstes Projekt.\n\nÜber eine neue Maus nachzudenken ergibt mehr Sinn, wenn weitere Alterserscheinungen zusammenkommen: Wackelkontakt am Kabelaustritt, abgenutzte Gleitfüße, aussetzender Sensor oder gummierte Beschichtung, die klebrig wird. Kommt der Doppelklick zusammen mit zwei oder drei davon, ist der Switch nur das erste Bauteil, das nachgibt.\n\nPrüfe vorher die Garantie. Doppelklick bei einer Maus unter zwei Jahren gilt bei den meisten Marken als anerkannter Herstellungsfehler, und mehrere tauschen ohne Diskussion.',
            },
        ],
        faq: [
            {
                q: 'Welcher Abstand deutet auf einen defekten Doppelklick hin?',
                a: 'Unter 80 Millisekunden hat die Maus praktisch sicher von allein wiederholt — die menschliche Grenze für zwei bewusste Klicks liegt bei etwa 100 ms und erfordert schon Mühe. Werte zwischen 80 und 150 ms sind verdächtig; wiederhole den Test mit größeren Abständen.',
            },
            {
                q: 'Behebt ein höherer Debounce das Problem dauerhaft?',
                a: 'Nein. Es behebt das Symptom, solange der Verschleiß gering ist. Der Switch degradiert weiter, und der nötige Wert steigt, bis er legitime schnelle Klicks stört. Sieh es als Zeitgewinn bis zum Austausch.',
            },
            {
                q: 'Hilft Kontaktspray im Switch?',
                a: 'Es hilft, wenn Oxidation die Ursache ist, und kann Monate Nutzung zurückgeben. Es hilft nicht, wenn die Feder ihre mechanische Spannung verloren hat. Da es günstig und reversibel ist, lohnt der Versuch meist vor dem Lötkolben.',
            },
            {
                q: 'Kann der Doppelklick ein Softwareproblem sein?',
                a: 'Selten, aber es kommt vor. Falsch konfigurierte Makros und Remapping-Tools können Klicks verdoppeln. Meldet der Test Wiederholungen, schließe die Hersteller-Software und wiederhole. Verschwindet das Problem, war es Konfiguration und keine Hardware.',
            },
        ],
    },

    cps: {
        title: 'CPS-Test — Klicks pro Sekunde Online Messen | STZ Labs',
        description: 'Miss, wie viele Klicks pro Sekunde du schaffst. Wähle die Testdauer, verfolge den Durchschnitt live und vergleiche mit früheren Versuchen.',
        h1: 'CPS-Test (Klicks pro Sekunde)',
        intro: 'Wähle die Dauer, klicke so schnell du kannst und sieh deinen Durchschnitt. Die Stoppuhr startet mit dem ersten Klick, es geht also keine Zeit am Start verloren.',
        areaTitle: 'Testbereich',
        areaSubtitle: 'Die Zeit startet mit dem ersten Klick',
        sections: [
            {
                heading: 'Was ein normaler CPS-Wert ist',
                body: 'Beim normalen Klicken mit einem Finger liegen die meisten zwischen 4 und 7 Klicks pro Sekunde. Zwischen 7 und 10 steckt bereits gezieltes Üben dahinter. Dauerhaft über 10 ist fast immer eine Technik im Spiel.\n\nDer Wert hängt auch von der Maus ab. Leichte Switches mit kurzem Weg begünstigen eine hohe Kadenz, und ein hoher Debounce in der Software setzt eine künstliche Obergrenze: Ignoriert die Maus Impulse für 20 ms, kommst du per Definition nicht über 50 Klicks pro Sekunde.',
            },
            {
                heading: 'Jitter, Butterfly und Drag Click',
                body: 'Beim Jitter Click spannt man den Unterarm an, um ein kontrolliertes Zittern zu erzeugen, das sich auf den Finger überträgt. Damit sind 10 CPS leicht zu überschreiten, und es ist die Technik mit dem höchsten Verletzungsrisiko — es ist buchstäblich dauerhafte Muskelspannung an einem kleinen Gelenk.\n\nBeim Butterfly Click wechseln zwei Finger auf derselben Taste ab und verdoppeln so die Kadenz. Das ist schonender, verlangt aber einen Switch, der sehr eng aufeinanderfolgende Betätigungen annimmt, und stößt direkt an die Debounce-Grenze.\n\nBeim Drag Click zieht man den Finger über die Tastenoberfläche und nutzt die Reibung für viele Auslösungen. Das erreicht extreme Werte, verschleißt den Switch schnell und gilt auf vielen Spieleservern als Cheat.',
            },
            {
                heading: 'Das Verletzungsrisiko ist real',
                body: 'Sehnenscheidenentzündung und Karpaltunnelsyndrom kommen nicht von einer Testsitzung, sondern von dauerhafter Wiederholung bei schlechter Handgelenkshaltung. Jitter Click ist besonders riskant, weil die Technik auf gehaltener Spannung beruht.\n\nWenn du Kribbeln, Schmerzen im Handgelenk oder Kraftverlust beim Greifen spürst, hör auf. Diese Zeichen deuten auf Nervenkompression und bessern sich nicht, wenn du weitermachst. Kein CPS-Rekord ist eine Verletzung wert, die das Tippen erschwert.',
            },
        ],
        faq: [
            {
                q: 'Welche Testdauer ist sinnvoll?',
                a: 'Fünf Sekunden sind der übliche Standard und der beste Kompromiss: lang genug, um Glück beim Start auszugleichen, kurz genug, um die Spitze zu halten. Läufe über 30 oder 60 Sekunden messen Ausdauer statt Geschwindigkeit, und der Durchschnitt fällt deutlich.',
            },
            {
                q: 'Warum ist mein CPS hier niedriger als auf anderen Seiten?',
                a: 'Die Zählweise unterscheidet sich. Manche Seiten starten die Uhr vor dem ersten Klick, was den Durchschnitt aufbläht; andere zählen Drücken und Loslassen als zwei Ereignisse. Hier startet die Uhr mit dem ersten Klick, und nur das Drücken zählt.',
            },
            {
                q: 'Erhöht eine bessere Maus meinen CPS?',
                a: 'Bis zu einem gewissen Punkt. Leichter Switch, kurzer Weg und niedriger Debounce räumen physische Hürden weg, die Grenze bleibst aber du. Den Debounce in der Software anzupassen bringt meist mehr als eine neue Maus.',
            },
            {
                q: 'Wird das Ergebnis gespeichert?',
                a: 'Es bleibt in deinem Browser, nur zum Vergleich mit früheren Versuchen. Nichts geht an einen Server, und die Löschen-Schaltfläche entfernt alles.',
            },
        ],
    },

    scroll: {
        title: 'Mausrad Testen Online — Scrollen Springt oder Kehrt Um | STZ Labs',
        description: 'Teste dein Mausrad und erkenne Scrollen, das springt, von selbst umkehrt oder hängt. Sieh Richtung, Rastungen und unregelmäßige Ereignisse.',
        h1: 'Mausrad-Test',
        intro: 'Drehe das Rad im Bereich unten, in beide Richtungen. Der Test zählt jede Rastung, zeigt die Richtung und hebt Umkehrungen hervor — wenn du nach unten scrollst und das Ereignis als nach oben ankommt.',
        areaTitle: 'Testbereich',
        areaSubtitle: 'Benutze das Rad in diesem Bereich',
        sections: [
            {
                heading: 'Springendes Scrollen heißt verschmutzter Encoder',
                body: 'Das Rad dreht eine Achse in einem Encoder, der die Bewegung in Impulse umsetzt. Staub und Fett gelangen durch diese Öffnung und sammeln sich an den inneren Kontakten. Das Ergebnis ist ein falsch gelesener Impuls: Du scrollst eine Rastung nach unten und die Seite geht nach oben, oder du scrollst drei Rastungen und nur zwei kommen an.\n\nDas ist der häufigste Raddefekt und zugleich der am leichtesten zu behebende. Es ist kein mechanischer Verschleiß, sondern Schmutz, der die Abtastung stört — oft stellt eine Reinigung das ursprüngliche Verhalten wieder her.',
            },
            {
                heading: 'So reinigst du den Encoder',
                body: 'Am wenigsten invasiv ist Kontaktspray durch den seitlichen Spalt am Rad, danach das Rad ein bis zwei Minuten kräftig in beide Richtungen drehen, damit das Mittel die Kontakte erreicht. Vollständig trocknen lassen, bevor die Maus wieder angeschlossen wird.\n\nHilft das nicht, muss geöffnet werden. Die Schrauben sitzen meist unter den Gleitfüßen, die sich mit etwas Wärme vom Föhn vorsichtig lösen lassen. Ist der Encoder zugänglich, kann man sein Metallgehäuse öffnen und die inneren Lamellen mit Isopropylalkohol reinigen. Eine Reparatur mittlerer Schwierigkeit; das größte Risiko ist, die Gleitfüße beim Abnehmen zu beschädigen.\n\nVermeide gewöhnliches Schmieröl. Es zieht mehr Staub an und das Problem kommt binnen weniger Wochen schlimmer zurück.',
            },
            {
                heading: 'Wenn es nicht an der Maus liegt',
                body: 'Bevor du etwas öffnest, schließe Software aus. Windows, Browser und manche Anwendungen glätten und beschleunigen das Scrollen, und die Kombination kann sich wie unregelmäßiges Scrollen anfühlen, obwohl die Hardware einwandfrei ist.\n\nProbiere verschiedene Programme. Hakt das Scrollen nur in einem, liegt es an diesem Programm. Umgekehrtes Scrollen ist meist Konfiguration — sowohl Windows als auch die Hersteller-Software bieten eine Umkehroption, die häufiger versehentlich aktiviert wird, als man denkt.',
            },
        ],
        faq: [
            {
                q: 'Das Scrollen springt in beide Richtungen leicht. Ist das ein Defekt?',
                a: 'Fast immer ein verschmutzter Encoder. Tritt es in beide Richtungen und in verschiedenen Programmen auf, ist das Problem physisch, und die Reinigung ist der erste Schritt vor einem Austausch.',
            },
            {
                q: 'Warum geht die Seite nach oben, wenn ich nach unten scrolle?',
                a: 'Passiert es ständig, ist die Richtung in Windows oder in der Maus-Software umgekehrt. Passiert es nur gelegentlich, liest der Encoder einen Impuls falsch — also Schmutz oder Verschleiß.',
            },
            {
                q: 'Beeinflusst das weiche Scrollen des Browsers den Test?',
                a: 'Die Zählung nicht: Der Test liest das rohe Radereignis, vor jeder Animation. Die Glättung ändert, was du auf dem Bildschirm siehst, nicht das, was die Maus gemeldet hat.',
            },
            {
                q: 'Lässt sich das seitliche Kippen des Rads testen?',
                a: 'Nur wenn die Maus das Kippen als horizontales Scrollereignis sendet, was die meisten tun. Der Test zeigt die erkannte Achse, du kannst also prüfen, ob das Kippen ankommt.',
            },
        ],
    },

    'polling-rate': {
        title: 'Maus-Abtastrate Testen — Polling Rate in Hz Online Messen | STZ Labs',
        description: 'Miss die tatsächliche Abtastrate deiner Maus in Hz. Finde heraus, ob sie die versprochenen 1000Hz liefert, und vergleiche mit dem eingestellten Wert.',
        h1: 'Abtastraten-Test (Polling Rate)',
        intro: 'Bewege die Maus einige Sekunden lang ununterbrochen im Bereich unten. Der Test misst den Abstand zwischen Bewegungsereignissen und schätzt die Rate in Hertz. Gleichmäßige Bewegung ohne Pausen liefert die zuverlässigste Messung.',
        areaTitle: 'Testbereich',
        areaSubtitle: 'Bewege die Maus ununterbrochen in diesem Bereich',
        sections: [
            {
                heading: 'Was die Abtastrate bedeutet',
                body: 'Die Abtastrate gibt an, wie oft pro Sekunde die Maus ihre Position an den Rechner meldet. Bei 125 Hz geschieht das alle 8 Millisekunden, bei 1000 Hz jede Millisekunde. Es ist die Frequenz, mit der das System erfährt, wo der Cursor steht.\n\nDer Gewinn ist am unteren Ende am größten. Von 125 auf 500 Hz sinkt die Verzögerung von 8 auf 2 ms, was bei schnellen Bewegungen spürbar ist. Von 500 auf 1000 Hz beträgt der Gewinn nur noch eine Millisekunde — messbar, selten spürbar. Deshalb bringen die Marketingsprünge auf 4000 oder 8000 Hz so wenig: Die Kurve ist längst flach.',
            },
            {
                heading: 'Die CPU-Kosten',
                body: 'Jede Meldung der Maus löst einen Interrupt aus, den der Prozessor bearbeiten muss. Bei 1000 Hz sind das tausend Interrupts pro Sekunde, bei 8000 Hz achttausend. Auf modernen Rechnern ist die Auswirkung gering, aber real — und sie zeigt sich genau dann, wenn die CPU ohnehin am Limit läuft, also im kompetitiven Spiel, dem Szenario, in dem die hohe Rate eigentlich helfen soll.\n\nAuf älteren Rechnern oder Einsteigerprozessoren können sehr hohe Raten die durchschnittlichen FPS senken. Wenn du wegen eines Leistungseinbruchs hier gelandet bist, teste 500 Hz und vergleiche: Das Ergebnis ist oft stabiler als bei 1000.',
            },
            {
                heading: 'Wie du sie änderst und warum die Messung abweichen kann',
                body: 'Die Rate wird in der Hersteller-Software eingestellt — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — meist unter einem Leistungsbereich. Manche Mäuse haben eine physische Taste oder Tastenkombination zum Umschalten ohne Software.\n\nLiegt der hier gemessene Wert deutlich unter dem eingestellten, sind das Kabel, der Abstand zum Funkempfänger oder USB-3.0-Störungen die üblichen Verdächtigen — 3.0-Anschlüsse sind eine klassische Störquelle für 2,4-GHz-Empfänger. Bevor du etwas schließt, wiederhole die Messung mit weiten, durchgehenden Bewegungen: eine kleine Stichprobe verzerrt das Ergebnis.\n\nEs hilft zu wissen, wie die Messung funktioniert. Der Browser liefert nicht ein Ereignis pro Mausmeldung: Er bündelt die Meldungen und liefert sie in Paketen, weshalb reines Zählen von Ereignissen immer bei etwa 60 pro Sekunde landen würde, egal welche Maus. Dieser Test nutzt `getCoalescedEvents`, das die Rohwerte jedes Pakets zurückgibt — so werden 500 oder 1000 Hz sichtbar. Das funktioniert in Chromium-basierten Browsern: Chrome, Edge und Opera. Firefox und seine Ableger implementieren die Methode, geben die Zwischenwerte aber nicht preis, und die Auslieferung bleibt bei rund 60 Hz stehen — auch auf einem 144-Hz-Monitor, denn die Grenze liegt beim Browser und nicht am Bildschirm. Erkennt der Test dieses Muster, weist er darauf hin, statt die Browsergrenze als Mausrate auszugeben.',
            },
        ],
        faq: [
            {
                q: 'Warum passt die Messung nicht zu meinen eingestellten 1000 Hz?',
                a: 'Kurze oder abgehackte Bewegung drückt den Durchschnitt; bewege dich einige Sekunden lang weiträumig weiter. Bleibt der Wert niedrig, prüfe Kabel, Abstand zum Funkempfänger und ob er an einem USB-3.0-Port steckt. Prüfe außerdem den Browser: In Firefox und seinen Ablegern bleibt die Messung unabhängig vom Monitor bei etwa 60 Hz, und der Test weist darauf hin.',
            },
            {
                q: 'Lohnen sich 1000 Hz?',
                a: 'Ja, wenn die CPU Luft hat. Der echte Gewinn liegt darin, 125 Hz zu verlassen; von 500 auf 1000 beträgt der Unterschied eine Millisekunde. Auf schwächeren Rechnern liefert 500 Hz oft ein stabileres Ergebnis.',
            },
            {
                q: 'Verbraucht eine hohe Rate bei Funkmäusen mehr Akku?',
                a: 'Deutlich mehr. Tausendmal pro Sekunde zu melden kostet weit mehr als 125, und die Laufzeit halbiert sich zwischen beiden Extremen häufig oder fällt noch stärker.',
            },
            {
                q: 'Haben Funkmäuse eine niedrigere Rate als Kabelmäuse?',
                a: 'Heute nicht zwangsläufig — dedizierte Empfänger halten 1000 Hz stabil. Bluetooth ist eine andere Geschichte: Es liegt meist bei 125 Hz und leidet stärker unter Störungen.',
            },
        ],
    },
};
