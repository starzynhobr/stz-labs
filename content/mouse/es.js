export const hub = {
    title: 'Test de Ratón Online — Clic, Doble Clic, Scroll y Tasa de Sondeo | STZ Labs',
    description: 'Herramientas gratuitas para probar tu ratón en el navegador: clic, doble clic involuntario, CPS, scroll y tasa de sondeo. Sin instalar nada.',
    h1: 'Test de ratón online',
    badge: 'Herramientas gratuitas',
    intro: 'Cinco pruebas que funcionan directamente en el navegador, sin instalar nada y sin enviar datos a ningún sitio. Elige lo que quieres diagnosticar: clics que no registran, dobles clics que se disparan solos, velocidad de clic, rueda de scroll o la tasa de sondeo del sensor.',
    toolsHeading: 'Elige la prueba',
    noteHeading: 'Antes de empezar',
    noteBody: 'Todas las pruebas necesitan un ratón físico — los trackpads y las pantallas táctiles generan eventos distintos y sus resultados no sirven para diagnosticar. Con un ratón inalámbrico, prueba con la batería cargada: una batería baja provoca fallos de clic idénticos a los de un switch defectuoso.',
};

export const toolLabels = {
    click: 'Prueba de clic',
    'double-click': 'Doble clic',
    cps: 'CPS',
    scroll: 'Scroll',
    'polling-rate': 'Tasa de sondeo',
};

export const ui = {
    relatedHeading: 'Herramientas relacionadas',
    faqHeading: 'Preguntas frecuentes',
    productHeading: 'De STZ Labs',
    clearHistory: 'Limpiar historial',
    historyHeading: 'Historial',
    historyEmpty: 'Aún no hay resultados guardados.',
    noMouseWarning: 'Esta prueba requiere un ratón físico. Los trackpads y las pantallas táctiles producen eventos distintos.',
    reset: 'Reiniciar',
    start: 'Empezar',
    stop: 'Parar',
};

export const tools = {
    click: {
        title: 'Prueba de Clic del Ratón Online — Izquierdo, Derecho y Central | STZ Labs',
        description: 'Comprueba si todos los botones del ratón registran clics correctamente. Ve el intervalo entre clics e identifica botones que fallan o repiten.',
        h1: 'Prueba de clic del ratón',
        intro: 'Haz clic en el área de abajo con cada botón del ratón. El panel registra qué botón se accionó, el intervalo desde el clic anterior y construye un historial completo — útil para demostrar que un botón está fallando.',
        areaTitle: 'Área de prueba',
        areaSubtitle: 'Haz clic con cualquier botón del ratón',
        sections: [
            {
                heading: 'Cómo saber si el botón del ratón está fallando',
                body: 'El síntoma más común no es que el botón deje de funcionar, sino que funcione de forma intermitente: haces clic y no pasa nada, vuelves a hacer clic y funciona. En la prueba de arriba eso aparece como clics que diste pero no entraron en la lista. Haz veinte clics contando en voz alta y compara con el total registrado. Si el contador muestra menos, el switch está fallando en el contacto.\n\nOtra señal es el clic que se suelta solo en mitad de un arrastre. Si seleccionas un texto o arrastras un archivo y la selección se rompe por el camino, el switch está perdiendo contacto bajo presión continua — un defecto distinto del doble clic y normalmente más avanzado.',
            },
            {
                heading: '¿Hardware, controlador o software?',
                body: 'Antes de abrir el ratón, conviene aislar la causa. Prueba en otro puerto USB, preferiblemente trasero y conectado directamente a la placa base, sin hub. Los hubs sin alimentación propia son una fuente habitual de fallos de clic en ratones con RGB, que consumen más.\n\nDespués prueba el mismo ratón en otro ordenador. Si el problema acompaña al ratón, es hardware. Si se queda en el ordenador, sospecha del controlador o del software del fabricante — un perfil de macros mal configurado se traga clics legítimos sin problema. También vale la pena probar con el software del fabricante cerrado, ya que las capas de reasignación actúan antes de que el navegador reciba el evento.',
            },
            {
                heading: 'Lo que esta prueba no detecta',
                body: 'El navegador recibe eventos ya procesados por el sistema operativo, así que algunos problemas pasan desapercibidos aquí. La latencia real de clic, por ejemplo, depende de todo el camino entre el switch y la pantalla, mientras que aquí solo medimos el intervalo entre eventos que llegaron.\n\nLos defectos de sensor — el cursor temblando, saltando o parándose — tampoco aparecen en una prueba de clic. Para eso la prueba de tasa de sondeo da un retrato mejor, porque mide con qué regularidad el ratón informa del movimiento.',
            },
        ],
        faq: [
            {
                q: '¿Por qué no se detecta el clic central?',
                a: 'Algunos navegadores usan el botón central para abrir enlaces en una pestaña nueva o activar el desplazamiento automático, e interceptan el evento antes que la página. La prueba bloquea ese comportamiento dentro del área, pero si el clic sigue sin aparecer, prueba fuera del navegador para confirmar que el botón responde.',
            },
            {
                q: '¿La prueba funciona con ratón inalámbrico?',
                a: 'Funciona, pero prueba con la batería cargada. Una batería baja provoca pérdida de paquetes entre el ratón y el receptor, y el síntoma es idéntico al de un switch defectuoso: clics que desaparecen. Si puedes, repite la prueba con cable.',
            },
            {
                q: '¿Cuántos clics debo hacer para estar seguro?',
                a: 'Cincuenta clics por botón dan una muestra razonable. Los fallos de switch son intermitentes por naturaleza, así que un puñado de clics puede no detectar el problema. Si sospechas de un botón concreto, insiste con ese.',
            },
            {
                q: '¿El sitio registra mis clics?',
                a: 'No. Todo el procesamiento ocurre en tu navegador y no se envía nada a ningún servidor. Cerrar la pestaña lo borra todo.',
            },
        ],
    },

    'double-click': {
        title: 'Prueba de Doble Clic del Ratón — Detecta Clics Dobles Involuntarios | STZ Labs',
        description: 'Descubre si tu ratón hace doble clic solo. La prueba mide el intervalo entre clics y señala repeticiones por debajo del umbral humano.',
        h1: 'Prueba de doble clic involuntario',
        intro: 'Un switch desgastado registra dos clics donde tú diste uno. Haz clic despacio en el área de abajo, uno cada vez, dejando al menos un segundo entre ellos. Cualquier par por debajo del umbral elegido queda señalado — nadie hace dos clics en menos de 80 milisegundos por accidente.',
        areaTitle: 'Área de prueba',
        areaSubtitle: 'Haz clics únicos y espaciados',
        sections: [
            {
                heading: 'Por qué el switch empieza a hacer doble clic',
                body: 'Dentro de cada switch hay una lámina metálica que toca un contacto cuando presionas. Con el uso, esa lámina pierde tensión y empieza a rebotar contra el contacto en vez de posarse limpiamente. Cada rebote genera un pulso eléctrico, y el ratón interpreta cada pulso como un clic.\n\nLa oxidación acelera el proceso. La humedad y la propia grasa de la mano crean una capa fina sobre el contacto, lo que aumenta la resistencia y vuelve inestable la señal. Por eso el problema suele aparecer primero en el botón izquierdo, que recibe mucho más uso, y empeora en zonas costeras.',
            },
            {
                heading: 'Qué es el debounce time y cómo enmascara el problema',
                body: 'El debounce es el intervalo durante el cual el ratón ignora nuevos pulsos después de registrar un clic. Existe precisamente para filtrar el rebote natural del switch, y de fábrica suele estar entre 8 y 12 milisegundos.\n\nVarios fabricantes permiten aumentar ese valor por software — Razer, Logitech y Corsair exponen el ajuste. Subirlo a 20 o 30 ms suele resolver un doble clic incipiente. Pero entiende lo que ha pasado: no has reparado el switch, le has dicho al ratón que ignore los síntomas. El desgaste continúa, y llega un punto en que el debounce necesario es tan alto que estorba a los clics rápidos legítimos. Es un parche, y uno bueno, siempre que sepas que es temporal.',
            },
            {
                heading: '¿Cambiar el switch o cambiar el ratón?',
                body: 'Cambiar el switch merece la pena cuando el ratón es bueno y el resto está intacto. Un switch suelto cuesta muy poco, y los modelos con switch en zócalo permiten el cambio sin soldar. En los demás hay que soldar, lo que exige soldador, desoldador y algo de práctica — no es difícil, pero tampoco es el primer proyecto ideal para quien nunca ha soldado.\n\nPensar en cambiar el ratón tiene más sentido cuando hay otras señales de fin de vida: cable con falso contacto cerca de la salida, patines gastados, sensor fallando o recubrimiento gomoso empezando a derretirse. Si el doble clic aparece junto a dos o tres de esas, el switch es solo el primer componente en ceder.\n\nAntes de nada, comprueba la garantía. El doble clic en un ratón con menos de dos años es un defecto de fabricación reconocido por la mayoría de las marcas, y varias lo cambian sin discutir.',
            },
        ],
        faq: [
            {
                q: '¿Qué intervalo indica un doble clic defectuoso?',
                a: 'Por debajo de 80 milisegundos es prácticamente seguro que el ratón repitió solo — el límite humano para dos clics deliberados ronda los 100 ms, y aun así cuesta. Los intervalos entre 80 y 150 ms son sospechosos y conviene repetir la prueba con clics más espaciados.',
            },
            {
                q: '¿Aumentar el debounce lo soluciona definitivamente?',
                a: 'No. Soluciona el síntoma mientras el desgaste sea pequeño. El switch sigue degradándose y el valor necesario va subiendo hasta estorbar a los clics rápidos legítimos. Tómalo como una forma de ganar tiempo hasta el cambio.',
            },
            {
                q: '¿Limpiar el switch con limpiador de contactos funciona?',
                a: 'Funciona cuando la causa es la oxidación, y puede devolver meses de uso. No funciona cuando la lámina ya ha perdido tensión mecánica. Como es barato y reversible, suele merecer el intento antes de soldar.',
            },
            {
                q: '¿El doble clic puede ser un problema de software?',
                a: 'Raramente, pero ocurre. Las macros mal configuradas y los programas de reasignación pueden duplicar clics. Si la prueba señala repeticiones, cierra el software del fabricante y repite. Si el problema desaparece, era configuración, no hardware.',
            },
        ],
    },

    cps: {
        title: 'Test de CPS — Mide Tus Clics Por Segundo Online | STZ Labs',
        description: 'Mide cuántos clics por segundo consigues. Elige la duración de la prueba, ve la media en vivo y compara con tus resultados anteriores.',
        h1: 'Test de CPS (clics por segundo)',
        intro: 'Elige la duración, haz clic lo más rápido que puedas y observa tu media. El cronómetro arranca con el primer clic, así que no se pierde tiempo en la salida.',
        areaTitle: 'Área de prueba',
        areaSubtitle: 'El tiempo arranca con el primer clic',
        sections: [
            {
                heading: 'Cuánto es un CPS normal',
                body: 'Haciendo clic con normalidad, con un dedo, la mayoría de la gente queda entre 4 y 7 clics por segundo. Entre 7 y 10 ya indica práctica deliberada. Por encima de 10 de forma constante, casi siempre hay alguna técnica de por medio.\n\nConviene recordar que el número depende del ratón. Los switches ligeros y de recorrido corto favorecen una cadencia alta, y un debounce alto en el software impone un techo artificial: si el ratón ignora pulsos durante 20 ms, no pasas de 50 clics por segundo por definición.',
            },
            {
                heading: 'Jitter, butterfly y drag click',
                body: 'El jitter click consiste en tensar el antebrazo para generar un temblor controlado que se transmite al dedo. Supera los 10 CPS con facilidad, y es la técnica con mayor riesgo de lesión — es literalmente tensión muscular sostenida en una articulación pequeña.\n\nEl butterfly click alterna dos dedos sobre el mismo botón, duplicando la cadencia. Es más amable con el cuerpo, pero depende de un switch que acepte accionamientos muy seguidos, y choca de lleno con el límite del debounce.\n\nEl drag click arrastra el dedo por la superficie del botón, usando la fricción para generar múltiples accionamientos. Alcanza cifras altísimas, desgasta el switch rápido y se considera trampa en muchos servidores de juego.',
            },
            {
                heading: 'El riesgo de lesión es real',
                body: 'La tendinitis y el síndrome del túnel carpiano no vienen de una sesión de prueba, sino de la repetición sostenida con la muñeca en mala posición. El jitter click es especialmente arriesgado porque la técnica se basa en mantener tensión continua.\n\nSi notas hormigueo, dolor en la muñeca o pérdida de fuerza al sujetar objetos, para. Esas señales indican compresión nerviosa y no mejoran solas si sigues con el estímulo. Ningún récord de CPS compensa una lesión que dificulte escribir.',
            },
        ],
        faq: [
            {
                q: '¿Cuál es la duración ideal de la prueba?',
                a: 'Cinco segundos es el estándar de la mayoría de las comparativas y el mejor equilibrio: tiempo suficiente para diluir la suerte de la salida, corto como para mantener el pico. Las pruebas de 30 o 60 segundos miden resistencia, no velocidad, y la media baja bastante.',
            },
            {
                q: '¿Por qué mi CPS aquí es menor que en otro sitio?',
                a: 'La forma de contar cambia. Algunos sitios empiezan a contar antes del primer clic, lo que infla la media; otros cuentan pulsar y soltar como dos eventos. Aquí el cronómetro parte del primer clic y solo cuenta la pulsación.',
            },
            {
                q: '¿Un ratón mejor aumenta mi CPS?',
                a: 'Hasta cierto punto. Un switch ligero, recorrido corto y debounce bajo eliminan barreras físicas, pero el límite lo sigues poniendo tú. Suele compensar más ajustar el debounce por software que cambiar de ratón.',
            },
            {
                q: '¿El resultado queda guardado?',
                a: 'Queda en tu navegador, solo para que compares con intentos anteriores. No se envía nada a servidores, y el botón de limpiar lo borra todo.',
            },
        ],
    },

    scroll: {
        title: 'Prueba de Scroll del Ratón Online — Rueda que Salta o se Invierte | STZ Labs',
        description: 'Prueba la rueda de scroll del ratón y detecta desplazamiento que salta, se invierte solo o se traba. Ve dirección, conteo de pasos y eventos irregulares.',
        h1: 'Prueba de scroll del ratón',
        intro: 'Gira la rueda dentro del área de abajo, en ambos sentidos. La prueba cuenta cada paso, muestra la dirección y destaca las inversiones — cuando desplazas hacia abajo y el evento llega como hacia arriba.',
        areaTitle: 'Área de prueba',
        areaSubtitle: 'Usa la rueda dentro de esta área',
        sections: [
            {
                heading: 'Desplazamiento que salta: el encoder está sucio',
                body: 'La rueda gira un eje dentro de un encoder, que convierte el movimiento en pulsos. El polvo y la grasa entran por esa abertura y se acumulan en los contactos internos. El resultado es un pulso leído de forma equivocada: desplazas un paso hacia abajo y la página sube, o desplazas tres pasos y solo se registran dos.\n\nEs el defecto más común de la rueda, y también el más fácil de resolver. No es desgaste mecánico, es suciedad estorbando la lectura — en muchos casos la limpieza devuelve el comportamiento original.',
            },
            {
                heading: 'Cómo limpiar el encoder',
                body: 'La forma menos invasiva es aplicar limpiador de contactos por la ranura lateral de la rueda y girarla mucho en ambos sentidos durante uno o dos minutos, para que el producto alcance los contactos. Déjalo secar por completo antes de conectar el ratón.\n\nSi no se resuelve, hay que abrirlo. Los tornillos suelen estar bajo los patines deslizantes, que salen con cuidado y calor suave de un secador. Con el encoder accesible, se puede abrir la carcasa metálica y limpiar las láminas internas con alcohol isopropílico. Es una reparación de dificultad media, y el mayor riesgo es dañar los patines al retirarlos.\n\nEvita el aceite lubricante común. Atrae más polvo y el problema vuelve peor en pocas semanas.',
            },
            {
                heading: 'Cuando no es el ratón',
                body: 'Antes de abrir nada, descarta el software. Windows, el navegador y algunas aplicaciones aplican suavizado y aceleración de desplazamiento, y la combinación puede dar la impresión de scroll irregular incluso con hardware perfecto.\n\nPrueba en programas distintos. Si el desplazamiento falla solo en uno, el problema es de ese programa. El scroll invertido suele ser configuración — tanto Windows como el software del fabricante tienen la opción de invertir la dirección, y se activa por accidente más a menudo de lo que parece.',
            },
        ],
        faq: [
            {
                q: 'El desplazamiento salta un poco en ambos sentidos. ¿Es un defecto?',
                a: 'Casi siempre es el encoder sucio. Si ocurre en ambos sentidos y en programas distintos, el problema es físico, y la limpieza es el primer paso antes de pensar en cambiarlo.',
            },
            {
                q: '¿Por qué la página sube cuando desplazo hacia abajo?',
                a: 'Si pasa todo el rato, es la dirección invertida en la configuración de Windows o del software del ratón. Si pasa solo de vez en cuando, es el encoder leyendo mal un pulso — ahí es suciedad o desgaste.',
            },
            {
                q: '¿El desplazamiento suave del navegador afecta a la prueba?',
                a: 'No afecta al conteo: la prueba lee el evento bruto de la rueda, antes de la animación. El suavizado cambia lo que ves en pantalla, no lo que informó el ratón.',
            },
            {
                q: '¿Se puede probar la inclinación lateral de la rueda?',
                a: 'Solo cuando el ratón envía la inclinación como evento de desplazamiento horizontal, que es el caso de la mayoría. La prueba muestra el eje detectado, así que puedes comprobar si la inclinación está llegando.',
            },
        ],
    },

    'polling-rate': {
        title: 'Prueba de Tasa de Sondeo del Ratón — Mide los Hz Online | STZ Labs',
        description: 'Mide la tasa de sondeo real de tu ratón en Hz. Descubre si entrega los 1000Hz prometidos y compara con el valor configurado en el software.',
        h1: 'Prueba de tasa de sondeo (polling rate)',
        intro: 'Mueve el ratón continuamente dentro del área de abajo durante unos segundos. La prueba mide el intervalo entre eventos de movimiento y estima la tasa en hercios. Un movimiento constante y sin pausas da la lectura más fiable.',
        areaTitle: 'Área de prueba',
        areaSubtitle: 'Mueve el ratón sin parar dentro de esta área',
        sections: [
            {
                heading: 'Qué significa la tasa de sondeo',
                body: 'La tasa de sondeo es cuántas veces por segundo el ratón informa de su posición al ordenador. A 125 Hz eso ocurre cada 8 milisegundos; a 1000 Hz, cada milisegundo. Es la frecuencia con la que el sistema descubre dónde está el cursor.\n\nLa ganancia es mayor en la base de la escala. Pasar de 125 a 500 Hz recorta el retraso de 8 a 2 ms, una diferencia perceptible en movimientos rápidos. De 500 a 1000 Hz el recorte es de apenas 1 ms — medible, rara vez perceptible. Por eso los saltos de marketing a 4000 u 8000 Hz aportan tan poco: la curva ya se ha aplanado.',
            },
            {
                heading: 'El coste en CPU',
                body: 'Cada informe del ratón genera una interrupción que el procesador atiende. A 1000 Hz son mil interrupciones por segundo, y a 8000 Hz son ocho mil. En máquinas modernas el impacto es pequeño, pero existe, y aparece justo cuando la CPU ya está al límite — que es el escenario de los juegos competitivos, el mismo en el que la tasa alta debería ayudar.\n\nEn ordenadores más antiguos o procesadores de gama de entrada, las tasas muy altas llegan a reducir los FPS medios. Si has llegado aquí investigando una caída de rendimiento, prueba a 500 Hz y compara: muchas veces el resultado es más estable que a 1000.',
            },
            {
                heading: 'Cómo cambiarla y por qué la medición puede diferir',
                body: 'La tasa se ajusta en el software del fabricante — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — normalmente en una sección de rendimiento. Algunos ratones tienen un botón físico o combinación de teclas para alternarla sin software.\n\nSi el valor medido aquí queda muy por debajo del configurado, el cable, la distancia del receptor inalámbrico o interferencias de USB 3.0 son los sospechosos más comunes — los puertos 3.0 son una fuente clásica de ruido para receptores de 2,4 GHz. Antes de concluir, repite la medición con movimientos amplios y continuos: una muestra pequeña distorsiona el resultado.\n\nConviene saber cómo funciona la medición. El navegador no entrega un evento por cada informe del ratón: agrupa los informes y los entrega en lotes, así que contar eventos daría siempre algo cercano a 60 por segundo, fuera cual fuera el ratón. Esta prueba usa `getCoalescedEvents`, que devuelve las muestras brutas de cada lote — así es como se pueden ver 500 o 1000 Hz. Funciona en navegadores basados en Chromium: Chrome, Edge y Opera. Firefox y sus derivados implementan el método pero no exponen las muestras intermedias, y la entrega queda fijada en torno a 60 Hz — incluso en monitores de 144 Hz, porque el límite es del navegador y no de la pantalla. Cuando detecta ese patrón, la prueba avisa en vez de presentar el techo del navegador como si fuera la tasa del ratón.',
            },
        ],
        faq: [
            {
                q: '¿Por qué la medición no coincide con los 1000 Hz configurados?',
                a: 'Un movimiento corto o intermitente baja la media, así que insiste con movimientos amplios durante unos segundos. Si el número sigue bajo, revisa el cable, la distancia del receptor inalámbrico y si está en un puerto USB 3.0. Y comprueba en qué navegador estás: en Firefox y derivados la lectura se queda en torno a 60 Hz sea cual sea el monitor, y la prueba lo señala cuando ocurre.',
            },
            {
                q: '¿Merece la pena usar 1000 Hz?',
                a: 'Merece la pena si el ordenador tiene margen de CPU. La ganancia real está en salir de 125 Hz; de 500 a 1000 la diferencia es de 1 ms. En máquinas más flojas, 500 Hz suele dar un resultado más estable.',
            },
            {
                q: '¿Una tasa alta gasta más batería en un ratón inalámbrico?',
                a: 'Gasta, y bastante. Informar mil veces por segundo consume mucho más que 125, y es habitual que la autonomía caiga a la mitad o menos entre ambos extremos.',
            },
            {
                q: '¿Un ratón inalámbrico tiene menos tasa que uno con cable?',
                a: 'Hoy no necesariamente — los receptores dedicados alcanzan 1000 Hz de forma estable. El Bluetooth es otra historia: suele quedarse en 125 Hz y sufre más interferencias.',
            },
        ],
    },
};
