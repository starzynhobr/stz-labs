export const hub = {
    title: 'Teste de Mouse Online — Clique, Double Click, Scroll e Polling Rate | STZ Labs',
    description: 'Ferramentas gratuitas para testar seu mouse no navegador: clique, double click involuntário, CPS, scroll e taxa de atualização. Sem instalar nada.',
    h1: 'Teste de mouse online',
    badge: 'Ferramentas gratuitas',
    intro: 'Cinco testes que rodam direto no navegador, sem instalar nada e sem enviar dados para lugar nenhum. Escolha o que você quer diagnosticar: cliques que não registram, cliques duplos que acontecem sozinhos, velocidade de clique, roda de scroll ou a taxa de atualização do sensor.',
    toolsHeading: 'Escolha o teste',
    noteHeading: 'Antes de começar',
    noteBody: 'Todos os testes precisam de um mouse físico — trackpad e tela sensível ao toque geram eventos diferentes e os resultados não valem para diagnóstico. Se você usa um mouse sem fio, teste com a bateria carregada: bateria fraca causa falhas de clique que parecem defeito de switch.',
};

export const toolLabels = {
    click: 'Teste de clique',
    'double-click': 'Double click',
    cps: 'CPS',
    scroll: 'Scroll',
    'polling-rate': 'Taxa de atualização',
};

export const ui = {
    relatedHeading: 'Ferramentas relacionadas',
    faqHeading: 'Perguntas frequentes',
    productHeading: 'Da STZ Labs',
    clearHistory: 'Limpar histórico',
    historyHeading: 'Histórico',
    historyEmpty: 'Nenhum resultado salvo ainda.',
    noMouseWarning: 'Este teste exige um mouse físico. Trackpads e telas de toque produzem eventos diferentes.',
    reset: 'Reiniciar',
    start: 'Começar',
    stop: 'Parar',
};

export const tools = {
    click: {
        title: 'Teste de Clique do Mouse Online — Esquerdo, Direito e Scroll | STZ Labs',
        description: 'Teste se todos os botões do mouse registram cliques corretamente. Veja o intervalo entre cliques e identifique botões que falham ou repetem.',
        h1: 'Teste de clique do mouse',
        intro: 'Clique na área abaixo com cada botão do mouse. O painel registra qual botão foi acionado, o intervalo desde o clique anterior e monta um histórico completo — útil para provar que um botão está falhando.',
        areaTitle: 'Área de teste',
        areaSubtitle: 'Clique com qualquer botão do mouse',
        sections: [
            {
                heading: 'Como saber se o botão do mouse está falhando',
                body: 'O sintoma mais comum não é o botão parar de funcionar, e sim funcionar de forma intermitente: você clica e nada acontece, clica de novo e funciona. No teste acima isso aparece como cliques que você deu mas não entraram na lista. Faça vinte cliques contando em voz alta e compare com o total registrado. Se o contador mostrar menos, o switch está falhando no contato.\n\nOutro sinal é o clique que solta sozinho no meio de um arraste. Se você seleciona um texto ou arrasta um arquivo e a seleção quebra no caminho, o switch está perdendo contato sob pressão contínua — um defeito diferente do clique duplo, e geralmente mais avançado.',
            },
            {
                heading: 'Hardware, driver ou software?',
                body: 'Antes de abrir o mouse, vale isolar a causa. Teste em outra porta USB, de preferência traseira e diretamente na placa-mãe, sem hub. Hubs sem alimentação própria são uma fonte comum de falha de clique em mouses com RGB, que consomem mais.\n\nDepois teste o mesmo mouse em outro computador. Se o problema acompanha o mouse, é hardware. Se fica no computador, suspeite do driver ou do software do fabricante — perfis de macro mal configurados conseguem engolir cliques legítimos. Vale também testar com o software do fabricante fechado, já que camadas de remapeamento agem antes do navegador receber o evento.',
            },
            {
                heading: 'O que este teste não detecta',
                body: 'O navegador recebe eventos já processados pelo sistema operacional, então alguns problemas passam despercebidos aqui. Latência real de clique, por exemplo, depende do caminho inteiro entre o switch e a tela, e o que medimos é só o intervalo entre eventos que chegaram.\n\nDefeitos de sensor — o cursor tremendo, pulando ou parando — também não aparecem em um teste de clique. Para isso o teste de taxa de atualização dá um retrato melhor, porque mede a regularidade com que o mouse reporta movimento.',
            },
        ],
        faq: [
            {
                q: 'Por que o clique do meio não é detectado?',
                a: 'Alguns navegadores usam o botão do meio para abrir links em nova aba ou ativar a rolagem automática, e interceptam o evento antes da página. O teste bloqueia esse comportamento na área de teste, mas se o clique ainda não aparecer, teste fora do navegador para confirmar se o botão responde.',
            },
            {
                q: 'O teste funciona com mouse sem fio?',
                a: 'Funciona, mas teste com a bateria carregada. Bateria fraca causa perda de pacotes entre o mouse e o receptor, e o sintoma é idêntico ao de um switch com defeito: cliques que somem. Se possível, repita o teste com o cabo conectado.',
            },
            {
                q: 'Quantos cliques devo dar para ter certeza?',
                a: 'Cinquenta cliques por botão dão uma amostra razoável. Falhas de switch são intermitentes por natureza, então um punhado de cliques pode não pegar o problema. Se você suspeita de um botão específico, insista nele.',
            },
            {
                q: 'O site registra meus cliques?',
                a: 'Não. Todo o processamento acontece no seu navegador e nada é enviado para nenhum servidor. Fechar a aba apaga tudo.',
            },
        ],
    },

    'double-click': {
        title: 'Teste de Double Click do Mouse — Detecte Cliques Duplos Involuntários | STZ Labs',
        description: 'Descubra se o seu mouse está dando clique duplo sozinho. O teste mede o intervalo entre cliques e sinaliza repetições abaixo do limiar humano.',
        h1: 'Teste de double click involuntário',
        intro: 'Um switch gasto registra dois cliques onde você deu um só. Clique devagar na área abaixo, um clique de cada vez, com pelo menos um segundo de intervalo. Qualquer par detectado abaixo do limiar escolhido é sinalizado — nenhuma pessoa clica duas vezes em menos de 80 milissegundos por acidente.',
        areaTitle: 'Área de teste',
        areaSubtitle: 'Dê cliques únicos e espaçados',
        sections: [
            {
                heading: 'Por que o switch começa a dar clique duplo',
                body: 'Dentro de cada switch há uma lâmina metálica que encosta em um contato quando você pressiona. Com o uso, essa lâmina perde tensão e passa a quicar no contato em vez de encostar de forma limpa. Cada quique gera um pulso elétrico, e o mouse interpreta cada pulso como um clique.\n\nOxidação acelera o processo. Umidade e a própria gordura da mão criam uma camada fina sobre o contato, o que aumenta a resistência e torna o sinal instável. Por isso o problema costuma aparecer primeiro no botão esquerdo, que recebe muito mais uso, e piora em regiões litorâneas.',
            },
            {
                heading: 'O que é debounce time e como ele mascara o problema',
                body: 'Debounce é o intervalo em que o mouse ignora novos pulsos depois de registrar um clique. Serve justamente para filtrar o quique natural do switch. De fábrica costuma ficar entre 8 e 12 milissegundos.\n\nVários fabricantes permitem aumentar esse valor no software — Razer, Logitech e Corsair expõem o ajuste. Subir para 20 ou 30 ms costuma resolver um clique duplo incipiente. Mas entenda o que está acontecendo: você não consertou o switch, apenas mandou o mouse ignorar os sintomas. O desgaste continua, e chega um ponto em que o debounce necessário fica tão alto que atrapalha cliques rápidos legítimos. É paliativo, e um bom paliativo, desde que você saiba que é temporário.',
            },
            {
                heading: 'Trocar o switch ou trocar o mouse?',
                body: 'Trocar o switch vale a pena quando o mouse é bom e o resto está intacto. Um switch avulso custa poucos reais, e modelos com switch soquetado permitem a troca sem solda. Nos demais é preciso soldar, o que exige ferro de solda, sugador e alguma prática — não é difícil, mas não é o primeiro projeto ideal para quem nunca soldou.\n\nPensar em trocar o mouse faz mais sentido quando há outros sinais de fim de vida: cabo com mau contato perto da saída, patins gastos, sensor falhando ou revestimento emborrachado começando a derreter. Se o clique duplo aparece junto com dois ou três desses, o switch é só o primeiro componente a ceder.\n\nAntes de qualquer coisa, verifique a garantia. Clique duplo em mouse com menos de dois anos é defeito de fabricação reconhecido pela maioria das marcas, e várias trocam sem discussão.',
            },
        ],
        faq: [
            {
                q: 'Qual intervalo indica clique duplo com defeito?',
                a: 'Abaixo de 80 milissegundos é praticamente certo que o mouse repetiu sozinho — o limite humano para dois cliques deliberados fica em torno de 100 ms, e ainda assim exige esforço. Intervalos entre 80 e 150 ms são suspeitos e valem repetir o teste com cliques mais espaçados.',
            },
            {
                q: 'Aumentar o debounce resolve de vez?',
                a: 'Não. Resolve o sintoma enquanto o desgaste for pequeno. O switch continua se degradando, e o valor necessário vai subindo até atrapalhar cliques rápidos legítimos. Trate como uma forma de ganhar tempo até a troca.',
            },
            {
                q: 'Limpar o switch com contato spray funciona?',
                a: 'Funciona quando a causa é oxidação, e pode devolver meses de uso. Não funciona quando a lâmina já perdeu tensão mecânica. Como é barato e reversível, costuma valer a tentativa antes de soldar.',
            },
            {
                q: 'O clique duplo pode ser problema de software?',
                a: 'Raramente, mas acontece. Macros mal configuradas e programas de remapeamento conseguem duplicar cliques. Se o teste acusa repetição, feche o software do fabricante e repita. Se o problema desaparece, é configuração, não hardware.',
            },
        ],
    },

    cps: {
        title: 'Teste de CPS — Meça Seus Cliques Por Segundo Online | STZ Labs',
        description: 'Meça quantos cliques por segundo você consegue. Escolha a duração do teste, veja a média ao vivo e compare com seus resultados anteriores.',
        h1: 'Teste de CPS (cliques por segundo)',
        intro: 'Escolha a duração, clique o mais rápido que conseguir e veja sua média. O cronômetro começa no primeiro clique, então não há tempo perdido na largada.',
        areaTitle: 'Área de teste',
        areaSubtitle: 'O tempo começa no primeiro clique',
        sections: [
            {
                heading: 'Quanto é um CPS normal',
                body: 'Clicando normalmente, com um dedo, a maioria das pessoas fica entre 4 e 7 cliques por segundo. Entre 7 e 10 já indica prática deliberada. Acima de 10 de forma consistente, quase sempre há alguma técnica envolvida.\n\nVale lembrar que o número depende do mouse. Switches leves e com curso curto favorecem cadência alta, e um debounce alto no software impõe um teto artificial: se o mouse ignora pulsos por 20 ms, você não passa de 50 cliques por segundo por definição.',
            },
            {
                heading: 'Jitter, butterfly e drag click',
                body: 'Jitter click é tensionar o antebraço para gerar tremor controlado, transferindo a vibração ao dedo. Passa de 10 CPS com facilidade, e é a técnica com maior risco de lesão — é literalmente tensão muscular sustentada em uma articulação pequena.\n\nButterfly click alterna dois dedos no mesmo botão, dobrando a cadência. É mais gentil com o corpo, mas depende de um switch que aceite acionamentos muito próximos, e cai em cheio no limite do debounce.\n\nDrag click arrasta o dedo pela superfície do botão, usando o atrito para gerar múltiplos acionamentos. Chega a números altíssimos e desgasta o switch rápido, além de ser considerado trapaça em vários servidores de jogos.',
            },
            {
                heading: 'O risco de lesão é real',
                body: 'Tendinite e síndrome do túnel do carpo não vêm de uma sessão de teste, e sim de repetição sustentada com o punho em posição ruim. Jitter click é especialmente arriscado porque a técnica se baseia em manter tensão contínua.\n\nSe você sentir formigamento, dor no punho ou perda de força ao segurar objetos, pare. Esses sinais indicam compressão nervosa e não melhoram sozinhos com a continuidade do estímulo. Nenhum recorde de CPS compensa uma lesão que atrapalha digitar.',
            },
        ],
        faq: [
            {
                q: 'Qual a duração ideal do teste?',
                a: 'Cinco segundos é o padrão da maioria das comparações e o melhor equilíbrio: tempo suficiente para diluir a sorte da largada, curto o bastante para manter o pico. Testes de 30 ou 60 segundos medem resistência, não velocidade — e a média cai bastante.',
            },
            {
                q: 'Por que meu CPS aqui é menor do que em outro site?',
                a: 'A forma de contar muda. Alguns sites começam a contar antes do primeiro clique, o que infla a média; outros contam pressionar e soltar como dois eventos. Aqui o cronômetro parte do primeiro clique e só o pressionar conta.',
            },
            {
                q: 'Um mouse melhor aumenta meu CPS?',
                a: 'Aumenta até certo ponto. Switch leve, curso curto e debounce baixo removem barreiras físicas, mas o limite continua sendo seu. Vale mais ajustar o debounce no software do que trocar de mouse.',
            },
            {
                q: 'O resultado fica salvo?',
                a: 'Fica no seu navegador, apenas para você comparar com tentativas anteriores. Nada é enviado a servidores, e o botão de limpar apaga tudo.',
            },
        ],
    },

    scroll: {
        title: 'Teste de Scroll do Mouse Online — Roda Pulando ou Invertendo | STZ Labs',
        description: 'Teste a roda de scroll do mouse e detecte rolagem pulando, invertendo sozinha ou travando. Veja direção, contagem de passos e eventos irregulares.',
        h1: 'Teste de scroll do mouse',
        intro: 'Role a roda dentro da área abaixo, nos dois sentidos. O teste conta cada passo, mostra a direção e destaca inversões — quando você rola para baixo e o evento chega como para cima.',
        areaTitle: 'Área de teste',
        areaSubtitle: 'Use a roda dentro desta área',
        sections: [
            {
                heading: 'Rolagem pulando: o encoder está sujo',
                body: 'A roda gira um eixo dentro de um encoder, que converte o movimento em pulsos. Poeira e gordura entram por essa abertura e se acumulam nos contatos internos. O resultado é um pulso lido de forma errada: você rola um passo para baixo e a página sobe, ou rola três passos e só dois registram.\n\nÉ o defeito mais comum da roda, e também o mais fácil de resolver. Não é desgaste mecânico, é sujeira atrapalhando a leitura — em muitos casos a limpeza devolve o comportamento original.',
            },
            {
                heading: 'Como limpar o encoder',
                body: 'A forma menos invasiva é aplicar contato spray pela fresta lateral da roda e girá-la bastante nos dois sentidos por um ou dois minutos, para o produto alcançar os contatos. Deixe secar completamente antes de ligar o mouse.\n\nSe não resolver, é preciso abrir. Os parafusos costumam estar sob os patins deslizantes, que saem com cuidado e calor brando de secador. Com o encoder acessível, dá para abrir a carcaça metálica e limpar as lâminas internas com álcool isopropílico. É um reparo de dificuldade média, e o maior risco é danificar os patins na hora de tirar.\n\nEvite óleo lubrificante comum. Ele atrai mais poeira e o problema volta pior em poucas semanas.',
            },
            {
                heading: 'Quando não é o mouse',
                body: 'Antes de abrir qualquer coisa, descarte o software. Windows, navegador e alguns aplicativos aplicam suavização e aceleração de rolagem, e a combinação pode dar a impressão de rolagem irregular mesmo com hardware perfeito.\n\nTeste em programas diferentes. Se a rolagem falha em um só, o problema é dele. Rolagem invertida costuma ser configuração — tanto o Windows quanto o software do fabricante têm a opção de inverter a direção, e ela é ativada por acidente com mais frequência do que se imagina.',
            },
        ],
        faq: [
            {
                q: 'A rolagem pula um pouco para os dois lados. É defeito?',
                a: 'Quase sempre é encoder sujo. Se o comportamento acontece nos dois sentidos e em programas diferentes, o problema é físico, e a limpeza é o primeiro passo antes de pensar em troca.',
            },
            {
                q: 'Por que a página sobe quando eu rolo para baixo?',
                a: 'Se acontece o tempo todo, é a direção invertida na configuração do Windows ou do software do mouse. Se acontece só de vez em quando, é o encoder lendo um pulso errado — aí é sujeira ou desgaste.',
            },
            {
                q: 'Rolagem suave do navegador atrapalha o teste?',
                a: 'Não atrapalha a contagem: o teste lê o evento bruto da roda, antes da animação. A suavização muda o que você vê na tela, não o que o mouse reportou.',
            },
            {
                q: 'Dá para testar a inclinação lateral da roda?',
                a: 'Só quando o mouse envia a inclinação como evento de rolagem horizontal, que é o caso da maioria. O teste mostra o eixo detectado, então dá para conferir se a inclinação está chegando.',
            },
        ],
    },

    'polling-rate': {
        title: 'Teste de Polling Rate do Mouse — Meça a Taxa em Hz Online | STZ Labs',
        description: 'Meça a taxa de atualização real do seu mouse em Hz. Descubra se ele entrega os 1000Hz prometidos e compare com o valor configurado no software.',
        h1: 'Teste de taxa de atualização (polling rate)',
        intro: 'Mova o mouse continuamente dentro da área abaixo por alguns segundos. O teste mede o intervalo entre eventos de movimento e estima a taxa em hertz. Movimento constante e sem pausas dá a leitura mais confiável.',
        areaTitle: 'Área de teste',
        areaSubtitle: 'Mova o mouse sem parar dentro desta área',
        sections: [
            {
                heading: 'O que a taxa de atualização significa',
                body: 'Polling rate é quantas vezes por segundo o mouse informa sua posição ao computador. A 125 Hz isso acontece a cada 8 milissegundos; a 1000 Hz, a cada 1 milissegundo. É a frequência com que o sistema descobre onde o cursor está.\n\nO ganho é maior na base da escala. Sair de 125 para 500 Hz corta o atraso de 8 para 2 ms, uma diferença perceptível em movimentos rápidos. De 500 para 1000 Hz o corte é de apenas 1 ms — mensurável, raramente perceptível. É por isso que os saltos de marketing para 4000 ou 8000 Hz entregam tão pouco: a curva já achatou.',
            },
            {
                heading: 'O custo em CPU',
                body: 'Cada relatório do mouse gera uma interrupção que o processador atende. A 1000 Hz são mil interrupções por segundo, e a 8000 Hz são oito mil. Em máquinas modernas o impacto é pequeno, mas existe, e aparece justamente quando a CPU já está no limite — que é o cenário de jogos competitivos, o mesmo em que a alta taxa deveria ajudar.\n\nEm computadores mais antigos ou processadores de entrada, taxas muito altas chegam a reduzir o FPS médio. Se você caiu aqui investigando queda de desempenho, vale testar 500 Hz e comparar: várias vezes o resultado é mais estável do que a 1000.',
            },
            {
                heading: 'Como alterar e por que a medição pode divergir',
                body: 'A taxa se ajusta no software do fabricante — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — normalmente em uma seção de desempenho. Alguns mouses têm um botão físico ou combinação de teclas para alternar sem software.\n\nSe o valor medido aqui ficar bem abaixo do configurado, o cabo, a distância do receptor sem fio ou interferência de USB 3.0 são os suspeitos mais comuns — portas 3.0 são uma fonte clássica de ruído para receptores de 2,4 GHz. Antes de concluir, repita a medição com movimentos amplos e contínuos: amostra pequena distorce o resultado.\n\nVale saber como a medição funciona. O navegador não entrega um evento por relatório do mouse: ele agrupa os relatórios e entrega em lotes, então contar eventos daria sempre algo perto de 60 por segundo, qualquer que fosse o mouse. Este teste usa `getCoalescedEvents`, que devolve as amostras brutas de cada lote — é assim que dá para enxergar 500 ou 1000 Hz. Isso funciona em navegadores baseados no Chromium: Chrome, Edge e Opera. O Firefox e seus derivados implementam o método mas não expõem as amostras intermediárias, e a entrega fica travada em torno de 60 Hz — inclusive em monitores de 144 Hz, porque o limite é do navegador e não da tela. Quando detecta esse padrão, o teste avisa em vez de apresentar o teto do navegador como se fosse a taxa do mouse.',
            },
        ],
        faq: [
            {
                q: 'Por que a medição não bate com os 1000 Hz configurados?',
                a: 'Movimento curto ou intermitente derruba a média, então insista com movimentos amplos por alguns segundos. Se o número continuar baixo, verifique o cabo, a distância do receptor sem fio e se ele não está numa porta USB 3.0. E confira em qual navegador você está: no Firefox e derivados a leitura fica travada em torno de 60 Hz independentemente do monitor, e o teste sinaliza quando isso acontece.',
            },
            {
                q: 'Vale a pena usar 1000 Hz?',
                a: 'Vale se o computador tem folga de CPU. O ganho real está em sair de 125 Hz; de 500 para 1000 a diferença é de 1 ms. Em máquinas mais fracas, 500 Hz costuma dar um resultado mais estável.',
            },
            {
                q: 'Taxa alta gasta mais bateria no mouse sem fio?',
                a: 'Gasta, e bastante. Reportar mil vezes por segundo consome muito mais que 125, e é comum a autonomia cair pela metade ou mais entre os dois extremos.',
            },
            {
                q: 'Mouse sem fio tem taxa menor que com fio?',
                a: 'Hoje não necessariamente — receptores dedicados alcançam 1000 Hz de forma estável. Bluetooth é outra história: costuma ficar em 125 Hz e sofrer mais interferência.',
            },
        ],
    },
};
