export const hub = {
    title: 'Test de Souris en Ligne — Clic, Double Clic, Molette et Fréquence | STZ Labs',
    description: 'Outils gratuits pour tester votre souris dans le navigateur : clic, double clic involontaire, CPS, molette et fréquence d’interrogation. Sans rien installer.',
    h1: 'Test de souris en ligne',
    badge: 'Outils gratuits',
    intro: 'Cinq tests qui fonctionnent directement dans le navigateur, sans rien installer et sans qu’aucune donnée ne quitte votre machine. Choisissez ce que vous voulez diagnostiquer : clics qui ne s’enregistrent pas, doubles clics qui partent tout seuls, vitesse de clic, molette ou fréquence d’interrogation du capteur.',
    toolsHeading: 'Choisissez le test',
    noteHeading: 'Avant de commencer',
    noteBody: 'Tous les tests nécessitent une souris physique — les pavés tactiles et les écrans tactiles génèrent des événements différents et leurs résultats ne valent rien pour un diagnostic. Avec une souris sans fil, testez batterie chargée : une batterie faible provoque des pertes de clic identiques à celles d’un switch défectueux.',
};

export const toolLabels = {
    click: 'Test de clic',
    'double-click': 'Double clic',
    cps: 'CPS',
    scroll: 'Défilement',
    'polling-rate': 'Fréquence',
};

export const ui = {
    relatedHeading: 'Outils associés',
    faqHeading: 'Questions fréquentes',
    productHeading: 'De STZ Labs',
    clearHistory: 'Effacer l’historique',
    historyHeading: 'Historique',
    historyEmpty: 'Aucun résultat enregistré pour l’instant.',
    noMouseWarning: 'Ce test nécessite une souris physique. Les pavés tactiles et écrans tactiles produisent des événements différents.',
    reset: 'Réinitialiser',
    start: 'Démarrer',
    stop: 'Arrêter',
};

export const tools = {
    click: {
        title: 'Test de Clic de Souris en Ligne — Gauche, Droit et Molette | STZ Labs',
        description: 'Vérifiez que tous les boutons de la souris enregistrent bien les clics. Voyez l’intervalle entre clics et repérez les boutons qui sautent ou répètent.',
        h1: 'Test de clic de souris',
        intro: 'Cliquez dans la zone ci-dessous avec chaque bouton de la souris. Le panneau enregistre quel bouton a été actionné, l’intervalle depuis le clic précédent et construit un historique complet — utile pour prouver qu’un bouton défaille.',
        areaTitle: 'Zone de test',
        areaSubtitle: 'Cliquez avec n’importe quel bouton de la souris',
        sections: [
            {
                heading: 'Comment savoir si un bouton de souris défaille',
                body: 'Le symptôme le plus courant n’est pas un bouton mort, mais un bouton irrégulier : vous cliquez, rien ne se passe, vous recliquez et ça marche. Dans le test ci-dessus, cela apparaît comme des clics que vous avez faits mais qui ne sont jamais entrés dans la liste. Faites vingt clics en comptant à voix haute, puis comparez avec le total enregistré. Si le compteur en affiche moins, le switch perd le contact.\n\nAutre signe : le clic qui se relâche seul au milieu d’un glisser-déposer. Si vous sélectionnez du texte ou déplacez un fichier et que la sélection se casse en route, le switch perd le contact sous pression continue — un défaut différent du double clic, et généralement plus avancé.',
            },
            {
                heading: 'Matériel, pilote ou logiciel ?',
                body: 'Avant d’ouvrir la souris, isolez la cause. Testez sur un autre port USB, de préférence à l’arrière et branché directement à la carte mère, sans hub. Les hubs sans alimentation propre sont une source fréquente de pertes de clic sur les souris RGB, plus gourmandes.\n\nEssayez ensuite la même souris sur un autre ordinateur. Si le problème suit la souris, c’est du matériel. S’il reste sur la machine, suspectez le pilote ou le logiciel du fabricant — un profil de macros mal configuré avale volontiers des clics légitimes. Testez aussi avec le logiciel du fabricant fermé, car les couches de remappage agissent avant que le navigateur ne reçoive l’événement.',
            },
            {
                heading: 'Ce que ce test ne détecte pas',
                body: 'Le navigateur reçoit des événements déjà traités par le système d’exploitation, donc certains problèmes passent inaperçus ici. La latence réelle de clic, par exemple, dépend de tout le trajet entre le switch et l’écran, alors que nous ne mesurons que l’intervalle entre les événements arrivés.\n\nLes défauts de capteur — curseur qui tremble, saute ou se fige — n’apparaissent pas non plus dans un test de clic. Le test de fréquence d’interrogation donne un meilleur portrait, puisqu’il mesure la régularité avec laquelle la souris rapporte le mouvement.',
            },
        ],
        faq: [
            {
                q: 'Pourquoi le clic du milieu n’est-il pas détecté ?',
                a: 'Certains navigateurs réservent le bouton du milieu pour ouvrir des liens dans un nouvel onglet ou activer le défilement automatique, et interceptent l’événement avant la page. Le test bloque ce comportement dans la zone, mais si le clic n’apparaît toujours pas, testez hors du navigateur pour confirmer que le bouton répond.',
            },
            {
                q: 'Le test fonctionne-t-il avec une souris sans fil ?',
                a: 'Oui, mais testez batterie chargée. Une batterie faible provoque des pertes de paquets entre la souris et le récepteur, et le symptôme est identique à celui d’un switch défectueux : des clics qui disparaissent. Si possible, refaites le test en filaire.',
            },
            {
                q: 'Combien de clics faut-il pour être sûr ?',
                a: 'Cinquante clics par bouton donnent un échantillon raisonnable. Les défaillances de switch sont intermittentes par nature, donc quelques clics peuvent passer à côté du problème. Si vous suspectez un bouton précis, insistez sur celui-là.',
            },
            {
                q: 'Le site enregistre-t-il mes clics ?',
                a: 'Non. Tout le traitement se fait dans votre navigateur et rien n’est envoyé à un serveur. Fermer l’onglet efface tout.',
            },
        ],
    },

    'double-click': {
        title: 'Test de Double Clic de Souris — Détectez les Clics Doubles Parasites | STZ Labs',
        description: 'Découvrez si votre souris double-clique toute seule. Le test mesure l’intervalle entre clics et signale les répétitions sous le seuil humain.',
        h1: 'Test de double clic involontaire',
        intro: 'Un switch usé enregistre deux clics là où vous n’en avez fait qu’un. Cliquez lentement dans la zone ci-dessous, un clic à la fois, en laissant au moins une seconde entre chacun. Toute paire sous le seuil choisi est signalée — personne ne clique deux fois en moins de 80 millisecondes par accident.',
        areaTitle: 'Zone de test',
        areaSubtitle: 'Faites des clics uniques et espacés',
        sections: [
            {
                heading: 'Pourquoi un switch se met à double-cliquer',
                body: 'Dans chaque switch, une lame métallique touche un contact quand vous appuyez. Avec l’usage, cette lame perd sa tension et se met à rebondir sur le contact au lieu de s’y poser proprement. Chaque rebond génère une impulsion électrique, et la souris interprète chaque impulsion comme un clic.\n\nL’oxydation accélère le processus. L’humidité et le gras naturel de la main forment une fine couche sur le contact, ce qui augmente la résistance et rend le signal instable. C’est pourquoi le problème apparaît d’abord sur le bouton gauche, bien plus sollicité, et s’aggrave en bord de mer.',
            },
            {
                heading: 'Le debounce time et comment il masque le problème',
                body: 'Le debounce est l’intervalle pendant lequel la souris ignore de nouvelles impulsions après avoir enregistré un clic. Il existe précisément pour filtrer le rebond naturel du switch, et sort d’usine entre 8 et 12 millisecondes.\n\nPlusieurs fabricants permettent d’augmenter cette valeur par logiciel — Razer, Logitech et Corsair exposent le réglage. Passer à 20 ou 30 ms règle souvent un double clic naissant. Mais comprenez ce qui se passe : vous n’avez pas réparé le switch, vous avez demandé à la souris d’ignorer le symptôme. L’usure continue, et arrive un moment où le debounce nécessaire devient si élevé qu’il gêne les clics rapides légitimes. C’est un palliatif, et un bon, tant que vous savez qu’il est temporaire.',
            },
            {
                heading: 'Changer le switch ou changer la souris ?',
                body: 'Changer le switch vaut le coup quand la souris est bonne et que le reste est intact. Un switch à l’unité coûte très peu, et les modèles à switch sur support permettent l’échange sans soudure. Sur les autres il faut dessouder, ce qui demande un fer, une pompe et un peu de pratique — ce n’est pas difficile, mais ce n’est pas le projet idéal pour un premier essai.\n\nEnvisager de changer la souris a plus de sens quand d’autres signes de fin de vie s’accumulent : câble avec faux contact près de la sortie, patins usés, capteur défaillant ou revêtement gommé qui commence à coller. Si le double clic arrive avec deux ou trois de ces signes, le switch n’est que le premier composant à lâcher.\n\nAvant tout, vérifiez la garantie. Le double clic sur une souris de moins de deux ans est un défaut de fabrication reconnu par la plupart des marques, et plusieurs l’échangent sans discuter.',
            },
        ],
        faq: [
            {
                q: 'Quel intervalle indique un double clic défectueux ?',
                a: 'Sous 80 millisecondes, il est quasi certain que la souris a répété toute seule — la limite humaine pour deux clics volontaires tourne autour de 100 ms, et demande déjà un effort. Entre 80 et 150 ms, c’est suspect et il vaut mieux refaire le test avec des clics plus espacés.',
            },
            {
                q: 'Augmenter le debounce règle-t-il le problème définitivement ?',
                a: 'Non. Cela règle le symptôme tant que l’usure reste faible. Le switch continue de se dégrader et la valeur nécessaire monte jusqu’à gêner les clics rapides légitimes. Voyez-le comme un moyen de gagner du temps avant le remplacement.',
            },
            {
                q: 'Nettoyer le switch au nettoyant contact fonctionne-t-il ?',
                a: 'Cela fonctionne quand la cause est l’oxydation, et peut redonner des mois d’usage. Cela ne fait rien une fois que la lame a perdu sa tension mécanique. Comme c’est peu coûteux et réversible, l’essai vaut généralement le coup avant de sortir le fer à souder.',
            },
            {
                q: 'Le double clic peut-il venir d’un logiciel ?',
                a: 'Rarement, mais oui. Des macros mal configurées et des outils de remappage peuvent dupliquer des clics. Si le test signale des répétitions, fermez le logiciel du fabricant et recommencez. Si le problème disparaît, c’était de la configuration, pas du matériel.',
            },
        ],
    },

    cps: {
        title: 'Test de CPS — Mesurez Vos Clics Par Seconde en Ligne | STZ Labs',
        description: 'Mesurez combien de clics par seconde vous atteignez. Choisissez la durée du test, suivez la moyenne en direct et comparez avec vos essais précédents.',
        h1: 'Test de CPS (clics par seconde)',
        intro: 'Choisissez la durée, cliquez aussi vite que possible et regardez votre moyenne. Le chronomètre démarre au premier clic, donc rien n’est perdu au départ.',
        areaTitle: 'Zone de test',
        areaSubtitle: 'Le temps démarre au premier clic',
        sections: [
            {
                heading: 'Ce qu’est un CPS normal',
                body: 'En cliquant normalement, avec un doigt, la plupart des gens se situent entre 4 et 7 clics par seconde. Entre 7 et 10, cela indique déjà une pratique délibérée. Au-dessus de 10 de façon constante, il y a presque toujours une technique derrière.\n\nCe chiffre dépend aussi de la souris. Les switches légers à course courte favorisent une cadence élevée, et un debounce élevé dans le logiciel impose un plafond artificiel : si la souris ignore les impulsions pendant 20 ms, vous ne dépassez pas 50 clics par seconde, par définition.',
            },
            {
                heading: 'Jitter, butterfly et drag click',
                body: 'Le jitter click consiste à tendre l’avant-bras pour produire un tremblement contrôlé transmis au doigt. Il dépasse 10 CPS sans peine, et c’est la technique la plus à risque pour les articulations — c’est littéralement une tension musculaire soutenue sur une petite articulation.\n\nLe butterfly click alterne deux doigts sur le même bouton, doublant la cadence. Il est plus doux pour le corps, mais dépend d’un switch acceptant des actionnements très rapprochés, et se heurte de plein fouet à la limite du debounce.\n\nLe drag click fait glisser le doigt sur la surface du bouton, utilisant le frottement pour générer plusieurs actionnements. Il atteint des chiffres très élevés, use le switch rapidement, et est considéré comme de la triche sur de nombreux serveurs de jeu.',
            },
            {
                heading: 'Le risque de blessure est réel',
                body: 'La tendinite et le syndrome du canal carpien ne viennent pas d’une session de test, mais d’une répétition soutenue avec le poignet mal placé. Le jitter click est particulièrement risqué parce que la technique repose sur le maintien d’une tension continue.\n\nSi vous ressentez des fourmillements, une douleur au poignet ou une perte de force en saisissant des objets, arrêtez. Ces signes indiquent une compression nerveuse et ne s’améliorent pas en continuant. Aucun record de CPS ne compense une blessure qui rend la frappe douloureuse.',
            },
        ],
        faq: [
            {
                q: 'Quelle durée de test choisir ?',
                a: 'Cinq secondes est le standard de la plupart des comparaisons et le meilleur équilibre : assez long pour diluer la chance du départ, assez court pour tenir le pic. Les tests de 30 ou 60 secondes mesurent l’endurance, pas la vitesse, et la moyenne chute nettement.',
            },
            {
                q: 'Pourquoi mon CPS est-il plus bas ici qu’ailleurs ?',
                a: 'La méthode de comptage change. Certains sites démarrent le chrono avant le premier clic, ce qui gonfle la moyenne ; d’autres comptent l’appui et le relâchement comme deux événements. Ici le chrono part du premier clic et seul l’appui compte.',
            },
            {
                q: 'Une meilleure souris augmente-t-elle mon CPS ?',
                a: 'Jusqu’à un certain point. Un switch léger, une course courte et un debounce bas suppriment des barrières physiques, mais la limite reste vous. Régler le debounce dans le logiciel rapporte souvent plus que changer de souris.',
            },
            {
                q: 'Le résultat est-il conservé ?',
                a: 'Il reste dans votre navigateur, uniquement pour comparer vos essais. Rien n’est envoyé à un serveur, et le bouton d’effacement supprime tout.',
            },
        ],
    },

    scroll: {
        title: 'Test de Molette de Souris en Ligne — Défilement qui Saute ou s’Inverse | STZ Labs',
        description: 'Testez la molette de votre souris et détectez un défilement qui saute, s’inverse tout seul ou se bloque. Voyez la direction, le nombre de crans et les événements irréguliers.',
        h1: 'Test de molette de souris',
        intro: 'Faites tourner la molette dans la zone ci-dessous, dans les deux sens. Le test compte chaque cran, affiche la direction et met en évidence les inversions — quand vous défilez vers le bas et que l’événement arrive comme vers le haut.',
        areaTitle: 'Zone de test',
        areaSubtitle: 'Utilisez la molette dans cette zone',
        sections: [
            {
                heading: 'Défilement qui saute : l’encodeur est encrassé',
                body: 'La molette entraîne un axe dans un encodeur, qui convertit le mouvement en impulsions. La poussière et le gras entrent par cette ouverture et s’accumulent sur les contacts internes. Résultat : une impulsion mal lue, vous défilez d’un cran vers le bas et la page monte, ou vous faites trois crans et deux seulement sont enregistrés.\n\nC’est le défaut le plus courant de la molette, et aussi le plus simple à corriger. Ce n’est pas de l’usure mécanique, c’est de la saleté qui gêne la lecture — dans bien des cas le nettoyage rétablit le comportement d’origine.',
            },
            {
                heading: 'Comment nettoyer l’encodeur',
                body: 'La méthode la moins invasive consiste à pulvériser du nettoyant contact par la fente latérale de la molette, puis à la faire tourner beaucoup dans les deux sens pendant une à deux minutes pour que le produit atteigne les contacts. Laissez sécher complètement avant de rebrancher la souris.\n\nSi cela ne suffit pas, il faut ouvrir. Les vis se cachent généralement sous les patins de glisse, qui se retirent délicatement avec un peu de chaleur au sèche-cheveux. L’encodeur accessible, on peut ouvrir son boîtier métallique et nettoyer les lames internes à l’alcool isopropylique. C’est une réparation de difficulté moyenne, et le principal risque est d’abîmer les patins au démontage.\n\nÉvitez l’huile lubrifiante ordinaire. Elle attire davantage de poussière et le problème revient en pire en quelques semaines.',
            },
            {
                heading: 'Quand ce n’est pas la souris',
                body: 'Avant d’ouvrir quoi que ce soit, écartez le logiciel. Windows, le navigateur et certaines applications appliquent lissage et accélération du défilement, et la combinaison peut donner une impression d’irrégularité même avec un matériel parfait.\n\nTestez dans plusieurs programmes. Si le défilement ne déraille que dans un seul, le problème vient de ce programme. Le défilement inversé relève généralement de la configuration — Windows comme le logiciel du fabricant proposent une option d’inversion, activée par accident plus souvent qu’on ne le croit.',
            },
        ],
        faq: [
            {
                q: 'Le défilement saute un peu dans les deux sens. Est-ce un défaut ?',
                a: 'Presque toujours un encodeur encrassé. Si cela se produit dans les deux sens et dans plusieurs programmes, le problème est physique, et le nettoyage est la première étape avant d’envisager un remplacement.',
            },
            {
                q: 'Pourquoi la page monte quand je défile vers le bas ?',
                a: 'Si cela arrive en permanence, c’est la direction inversée dans Windows ou dans le logiciel de la souris. Si cela n’arrive que de temps en temps, c’est l’encodeur qui lit mal une impulsion — donc saleté ou usure.',
            },
            {
                q: 'Le défilement fluide du navigateur fausse-t-il le test ?',
                a: 'Pas le comptage : le test lit l’événement brut de la molette, avant l’animation. Le lissage change ce que vous voyez à l’écran, pas ce que la souris a rapporté.',
            },
            {
                q: 'Peut-on tester l’inclinaison latérale de la molette ?',
                a: 'Seulement quand la souris envoie l’inclinaison comme un événement de défilement horizontal, ce qui est le cas de la plupart. Le test affiche l’axe détecté, vous pouvez donc vérifier si l’inclinaison passe bien.',
            },
        ],
    },

    'polling-rate': {
        title: 'Test de Fréquence d’Interrogation de Souris — Mesurez les Hz en Ligne | STZ Labs',
        description: 'Mesurez la fréquence d’interrogation réelle de votre souris en Hz. Vérifiez si elle atteint les 1000Hz promis et comparez avec la valeur configurée.',
        h1: 'Test de fréquence d’interrogation (polling rate)',
        intro: 'Déplacez la souris en continu dans la zone ci-dessous pendant quelques secondes. Le test mesure l’intervalle entre les événements de mouvement et estime la fréquence en hertz. Un mouvement constant et sans pause donne la lecture la plus fiable.',
        areaTitle: 'Zone de test',
        areaSubtitle: 'Bougez la souris sans arrêt dans cette zone',
        sections: [
            {
                heading: 'Ce que signifie la fréquence d’interrogation',
                body: 'La fréquence d’interrogation, c’est le nombre de fois par seconde où la souris communique sa position à l’ordinateur. À 125 Hz cela se produit toutes les 8 millisecondes ; à 1000 Hz, toutes les millisecondes. C’est la fréquence à laquelle le système apprend où se trouve le curseur.\n\nLe gain est le plus important en bas de l’échelle. Passer de 125 à 500 Hz réduit le délai de 8 à 2 ms, une différence perceptible dans les mouvements rapides. De 500 à 1000 Hz, la réduction n’est que d’une milliseconde — mesurable, rarement perceptible. C’est pourquoi les sauts marketing vers 4000 ou 8000 Hz apportent si peu : la courbe est déjà plate.',
            },
            {
                heading: 'Le coût en CPU',
                body: 'Chaque rapport de la souris déclenche une interruption que le processeur doit traiter. À 1000 Hz, cela fait mille interruptions par seconde ; à 8000 Hz, huit mille. Sur les machines modernes l’impact est faible, mais réel, et il se manifeste précisément quand le CPU est déjà saturé — c’est-à-dire en jeu compétitif, le scénario même où la fréquence élevée devrait aider.\n\nSur des ordinateurs plus anciens ou des processeurs d’entrée de gamme, des fréquences très élevées peuvent faire baisser le FPS moyen. Si vous êtes arrivé ici en cherchant une baisse de performance, testez à 500 Hz et comparez : le résultat est souvent plus stable qu’à 1000.',
            },
            {
                heading: 'Comment la changer et pourquoi la mesure peut diverger',
                body: 'La fréquence se règle dans le logiciel du fabricant — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — généralement dans une section performance. Certaines souris disposent d’un bouton physique ou d’une combinaison de touches pour basculer sans logiciel.\n\nSi la valeur mesurée ici est nettement inférieure à celle configurée, le câble, la distance du récepteur sans fil ou des interférences USB 3.0 sont les suspects habituels — les ports 3.0 sont une source classique de bruit pour les récepteurs 2,4 GHz. Avant de conclure, refaites la mesure avec des mouvements amples et continus : un petit échantillon fausse le résultat.\n\nIl est utile de savoir comment la mesure fonctionne. Le navigateur ne livre pas un événement par rapport de la souris : il regroupe les rapports et les livre par lots, si bien que compter les événements donnerait toujours environ 60 par seconde, quelle que soit la souris. Ce test utilise `getCoalescedEvents`, qui renvoie les échantillons bruts de chaque lot — c’est ainsi que 500 ou 1000 Hz deviennent visibles. Cela fonctionne sur les navigateurs basés sur Chromium : Chrome, Edge et Opera. Firefox et ses dérivés implémentent la méthode mais n’exposent pas les échantillons intermédiaires, et la livraison reste bloquée autour de 60 Hz — y compris sur un écran 144 Hz, car la limite vient du navigateur et non de l’écran. Lorsqu’il détecte ce schéma, le test le signale au lieu de présenter le plafond du navigateur comme s’il s’agissait de la fréquence de la souris.',
            },
        ],
        faq: [
            {
                q: 'Pourquoi la mesure ne correspond-elle pas aux 1000 Hz configurés ?',
                a: 'Un mouvement court ou intermittent fait chuter la moyenne : insistez avec des mouvements amples pendant quelques secondes. Si le chiffre reste bas, vérifiez le câble, la distance du récepteur sans fil et s’il est branché sur un port USB 3.0. Vérifiez aussi votre navigateur : sur Firefox et ses dérivés la lecture reste autour de 60 Hz quel que soit l’écran, et le test le signale quand cela se produit.',
            },
            {
                q: 'Faut-il utiliser 1000 Hz ?',
                a: 'Oui si l’ordinateur a de la marge côté CPU. Le vrai gain est de quitter 125 Hz ; de 500 à 1000 la différence est d’une milliseconde. Sur des machines plus modestes, 500 Hz donne souvent un résultat plus stable.',
            },
            {
                q: 'Une fréquence élevée consomme-t-elle plus de batterie en sans fil ?',
                a: 'Oui, nettement. Rapporter mille fois par seconde coûte bien plus que 125, et il est courant que l’autonomie soit divisée par deux ou davantage entre les deux extrêmes.',
            },
            {
                q: 'Une souris sans fil a-t-elle une fréquence plus basse qu’une filaire ?',
                a: 'Plus nécessairement aujourd’hui — les récepteurs dédiés tiennent 1000 Hz de façon stable. Le Bluetooth est une autre histoire : il reste généralement à 125 Hz et souffre davantage des interférences.',
            },
        ],
    },
};
