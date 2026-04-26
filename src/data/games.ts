export interface PokemonGame {
  id: number;
  title: string;
  subtitle?: string;
  year: number;
  platform: string;
  region: string;
  description: string;
  starters: number[];
  color: string;
  secondColor: string;
  coverColors: string[];
  isRemake?: boolean;
  originalGame?: string;
  spinoff?: boolean;
}

export interface GameGeneration {
  gen: number;
  name: string;
  region: string;
  year: number;
  color: string;
  description: string;
  games: PokemonGame[];
}

export const GAME_GENERATIONS: GameGeneration[] = [
  {
    gen: 1,
    name: 'Geração I',
    region: 'Kanto',
    year: 1996,
    color: '#CC0000',
    description:
      'O começo de tudo. Em 1996, Satoshi Tajiri lançou Pokémon Red e Green no Japão, inspirados em sua infância caçando insetos. A partir de um Game Boy monocromático, nasceu um fenômeno cultural que mudaria o entretenimento para sempre. Kanto apresentou os 151 Pokémon originais ao mundo.',
    games: [
      {
        id: 1,
        title: 'Pokémon Red Version',
        year: 1996,
        platform: 'Game Boy',
        region: 'Kanto',
        description:
          'A versão vermelha de Kanto. Escolha Bulbasaur, Charmander ou Squirtle e derrote os oito Líderes de Ginásio. Exclusivos: Ekans, Arbok, Oddish, Gloom, Vileplume, Mankey, Primeape, Growlithe, Arcanine, Scyther, Electabuzz.',
        starters: [1, 4, 7],
        color: '#CC0000',
        secondColor: '#FF4444',
        coverColors: ['#CC0000', '#FF6B6B'],
      },
      {
        id: 2,
        title: 'Pokémon Blue Version',
        year: 1996,
        platform: 'Game Boy',
        region: 'Kanto',
        description:
          'A versão azul de Kanto — lançada primeiro no Japão como "Green", chegou ao ocidente como Blue. Com diferentes Pokémon exclusivos que incentivam a troca entre amigos. Exclusivos: Sandshrew, Sandslash, Vulpix, Ninetales, Meowth, Persian, Bellsprout, Weepinbell, Victreebel, Magmar, Pinsir.',
        starters: [1, 4, 7],
        color: '#3B82F6',
        secondColor: '#60A5FA',
        coverColors: ['#1E40AF', '#3B82F6'],
      },
      {
        id: 3,
        title: 'Pokémon Yellow: Special Pikachu Edition',
        year: 1998,
        platform: 'Game Boy',
        region: 'Kanto',
        description:
          'Baseado no anime, Yellow force você a começar com Pikachu que te segue no mapa. Os três iniciais podem ser obtidos de diferentes formas. Jessie e James do Team Rocket aparecem como antagonistas recorrentes. Primeira edição de cores da série.',
        starters: [25],
        color: '#FBBF24',
        secondColor: '#F59E0B',
        coverColors: ['#D97706', '#FBBF24'],
      },
    ],
  },
  {
    gen: 2,
    name: 'Geração II',
    region: 'Johto',
    year: 1999,
    color: '#D97706',
    description:
      'Johto expandiu o mundo Pokémon para além de Kanto, introduzindo 100 novos Pokémon, o ciclo dia/noite, os dias da semana com eventos especiais, Pokémon Shiny, itens equipáveis e multiplicação de Pokémon. Crystal introduziu o primeiro protagonista feminino jogável da série.',
    games: [
      {
        id: 4,
        title: 'Pokémon Gold Version',
        year: 1999,
        platform: 'Game Boy Color',
        region: 'Johto',
        description:
          'A versão dourada de Johto. Com Ho-Oh na capa e uma aventura expandida que culminava com uma visita surpresa a toda a região de Kanto com os líderes de ginásio originais. Considerado por muitos o melhor jogo da série pela sua dupla região.',
        starters: [152, 155, 158],
        color: '#D97706',
        secondColor: '#F59E0B',
        coverColors: ['#92400E', '#D97706'],
      },
      {
        id: 5,
        title: 'Pokémon Silver Version',
        year: 1999,
        platform: 'Game Boy Color',
        region: 'Johto',
        description:
          'A versão prateada com Lugia na capa. Introduziu Pokémon exclusivos como Skarmory e Delibird. A rivalidade entre Gold e Silver (Ho-Oh vs Lugia) definiria o padrão das versões duais da franquia para sempre.',
        starters: [152, 155, 158],
        color: '#9CA3AF',
        secondColor: '#D1D5DB',
        coverColors: ['#6B7280', '#9CA3AF'],
      },
      {
        id: 6,
        title: 'Pokémon Crystal Version',
        year: 2000,
        platform: 'Game Boy Color',
        region: 'Johto',
        description:
          'Versão aprimorada com Suicune como Pokémon central. Primeira vez que é possível jogar como protagonista feminina (Kris). Introduziu animações de batalha para os Pokémon — uma grande novidade para a época. Adicionou a Suicune Quest e o Battle Tower.',
        starters: [152, 155, 158],
        color: '#06B6D4',
        secondColor: '#22D3EE',
        coverColors: ['#0E7490', '#06B6D4'],
      },
    ],
  },
  {
    gen: 3,
    name: 'Geração III',
    region: 'Hoenn',
    year: 2002,
    color: '#10B981',
    description:
      'Hoenn introduziu as habilidades dos Pokémon, nature (natureza), o sistema de contest (concurso), Pokémon Abilities, e uma narrativa ambiental entre Team Aqua e Team Magma. FireRed/LeafGreen trouxeram Kanto de volta com gráficos modernos.',
    games: [
      {
        id: 7,
        title: 'Pokémon Ruby Version',
        year: 2002,
        platform: 'Game Boy Advance',
        region: 'Hoenn',
        description:
          'Com Groudon na capa, Ruby apresentou o Team Magma tentando expandir a terra. Introduziu habilidades (abilities), naturezas e um mundo semi-aquático único. Exclusivos incluem Zangoose, Solrock, Plusle e vários outros.',
        starters: [252, 255, 258],
        color: '#DC2626',
        secondColor: '#EF4444',
        coverColors: ['#991B1B', '#DC2626'],
      },
      {
        id: 8,
        title: 'Pokémon Sapphire Version',
        year: 2002,
        platform: 'Game Boy Advance',
        region: 'Hoenn',
        description:
          'Com Kyogre na capa, Sapphire apresentou o Team Aqua tentando expandir os oceanos. A tensão entre os dois times representava o debate ecológico terra vs. água. Hoenn como mundo mais aquático refletiu isso.',
        starters: [252, 255, 258],
        color: '#3B82F6',
        secondColor: '#60A5FA',
        coverColors: ['#1D4ED8', '#3B82F6'],
      },
      {
        id: 9,
        title: 'Pokémon FireRed Version',
        year: 2004,
        platform: 'Game Boy Advance',
        region: 'Kanto',
        description:
          'Remake de Pokémon Red com gráficos GBA, mapa expandido, tutoriais modernos e a Sevii Islands como conteúdo adicional. Permitiu transferência de Pokémon para a terceira geração. Essencial para completar a Pokédex nacional.',
        starters: [1, 4, 7],
        color: '#F97316',
        secondColor: '#FB923C',
        coverColors: ['#C2410C', '#F97316'],
        isRemake: true,
        originalGame: 'Red',
      },
      {
        id: 10,
        title: 'Pokémon LeafGreen Version',
        year: 2004,
        platform: 'Game Boy Advance',
        region: 'Kanto',
        description:
          'Remake de Pokémon Blue/Green com gráficos modernos. Completo com todas as Sevii Islands. A parceria FireRed/LeafGreen colocou Kanto na era moderna e permitiu que uma nova geração explorasse a região original.',
        starters: [1, 4, 7],
        color: '#16A34A',
        secondColor: '#22C55E',
        coverColors: ['#15803D', '#16A34A'],
        isRemake: true,
        originalGame: 'Blue',
      },
      {
        id: 11,
        title: 'Pokémon Emerald Version',
        year: 2004,
        platform: 'Game Boy Advance',
        region: 'Hoenn',
        description:
          'A versão definitiva de Hoenn com Rayquaza na capa. Combinou as histórias de Ruby e Sapphire com a batalha épica de Groudon vs Kyogre vs Rayquaza na Sky Pillar. Introduziu o Battle Frontier — um dos postgames mais desafiadores da série.',
        starters: [252, 255, 258],
        color: '#059669',
        secondColor: '#10B981',
        coverColors: ['#064E3B', '#059669'],
      },
    ],
  },
  {
    gen: 4,
    name: 'Geração IV',
    region: 'Sinnoh',
    year: 2006,
    color: '#6366F1',
    description:
      'Sinnoh levou a série ao Nintendo DS, introduzindo divisão física/especial de ataques, o Underground, Super Contests, Pokétch e uma narrativa mitológica profunda sobre criação do universo com Dialga, Palkia e Arceus.',
    games: [
      {
        id: 12,
        title: 'Pokémon Diamond Version',
        year: 2006,
        platform: 'Nintendo DS',
        region: 'Sinnoh',
        description:
          'Com Dialga na capa, Diamond explorou o controle do tempo e uma narrativa mais profunda sobre a criação do universo. O Team Galactic buscava recriar o universo segundo a visão distorcida de Cyrus.',
        starters: [387, 390, 393],
        color: '#818CF8',
        secondColor: '#A5B4FC',
        coverColors: ['#4F46E5', '#818CF8'],
      },
      {
        id: 13,
        title: 'Pokémon Pearl Version',
        year: 2006,
        platform: 'Nintendo DS',
        region: 'Sinnoh',
        description:
          'Com Palkia na capa, Pearl focou no controle do espaço. A mesma narrativa de Diamond mas com Pokémon exclusivos diferentes e o Palkia como Pokémon lendário principal.',
        starters: [387, 390, 393],
        color: '#F472B6',
        secondColor: '#F9A8D4',
        coverColors: ['#BE185D', '#F472B6'],
      },
      {
        id: 14,
        title: 'Pokémon Platinum Version',
        year: 2008,
        platform: 'Nintendo DS',
        region: 'Sinnoh',
        description:
          'A versão definitiva de Sinnoh com Giratina na capa. Adicionou o Mundo Distorção como dungeon principal, expandiu a história do Team Galactic, melhorou gráficos e adicionou o Battle Frontier. Considerada a melhor versão de Sinnoh.',
        starters: [387, 390, 393],
        color: '#8B5CF6',
        secondColor: '#A78BFA',
        coverColors: ['#5B21B6', '#8B5CF6'],
      },
      {
        id: 15,
        title: 'Pokémon HeartGold Version',
        year: 2009,
        platform: 'Nintendo DS',
        region: 'Johto',
        description:
          'Remake de Gold para DS com gráficos modernos e o revolucionário Pokéwalker acessório — um pedômetro que permitia levar um Pokémon para passear no mundo real. O primeiro Pokémon da equipe segue o jogador no mapa, igual ao Yellow.',
        starters: [152, 155, 158],
        color: '#D97706',
        secondColor: '#F59E0B',
        coverColors: ['#78350F', '#D97706'],
        isRemake: true,
        originalGame: 'Gold',
      },
      {
        id: 16,
        title: 'Pokémon SoulSilver Version',
        year: 2009,
        platform: 'Nintendo DS',
        region: 'Johto',
        description:
          'Remake de Silver para DS. Junto com HeartGold, frequentemente citados como os melhores jogos da série por combinarem o conteúdo duplo de Johto+Kanto com a qualidade moderna do DS.',
        starters: [152, 155, 158],
        color: '#9CA3AF',
        secondColor: '#D1D5DB',
        coverColors: ['#4B5563', '#9CA3AF'],
        isRemake: true,
        originalGame: 'Silver',
      },
    ],
  },
  {
    gen: 5,
    name: 'Geração V',
    region: 'Unova',
    year: 2010,
    color: '#374151',
    description:
      'Unova foi a geração mais ousada narrativamente — com 156 novos Pokémon que só podiam ser capturados durante a campanha principal. A história explorava temas de liberdade, verdade vs. ideal e questionava a relação entre humanos e Pokémon de forma mais madura.',
    games: [
      {
        id: 17,
        title: 'Pokémon Black Version',
        year: 2010,
        platform: 'Nintendo DS',
        region: 'Unova',
        description:
          'Com Reshiram na capa, Black apresentou N e o Team Plasma questionando se é moral manter Pokémon em batalha. A história foi a mais cinematográfica e filosoficamente profunda da série até então. O White City contrastava com o Black City.',
        starters: [495, 498, 501],
        color: '#1F2937',
        secondColor: '#374151',
        coverColors: ['#111827', '#374151'],
      },
      {
        id: 18,
        title: 'Pokémon White Version',
        year: 2010,
        platform: 'Nintendo DS',
        region: 'Unova',
        description:
          'Com Zekrom na capa, White tinha a White Forest em contraste com a Black City de Black. A mesma narrativa profunda com perspectivas ligeiramente diferentes. Considerado pelos fãs um dos melhores jogos da série por sua narrativa.',
        starters: [495, 498, 501],
        color: '#F3F4F6',
        secondColor: '#E5E7EB',
        coverColors: ['#9CA3AF', '#F3F4F6'],
      },
      {
        id: 19,
        title: 'Pokémon Black 2',
        year: 2012,
        platform: 'Nintendo DS',
        region: 'Unova',
        description:
          'Sequência direta, rara na série. Dois anos após os eventos de Black/White, com novo protagonista, novo vilão (Ghetsis retorna) e Kyurem Negro na capa. Adicionou Join Avenue, Pokéstar Studios e um dos melhores postgames da série.',
        starters: [495, 498, 501],
        color: '#1F2937',
        secondColor: '#4B5563',
        coverColors: ['#0F172A', '#1F2937'],
      },
      {
        id: 20,
        title: 'Pokémon White 2',
        year: 2012,
        platform: 'Nintendo DS',
        region: 'Unova',
        description:
          'Sequência de White com Kyurem Branco na capa. A dupla Black 2/White 2 são as únicas sequências diretas na história da série principal, e oferecem conteúdo pós-game extenso e uma narrativa que satisfez os fãs de Black/White.',
        starters: [495, 498, 501],
        color: '#F9FAFB',
        secondColor: '#F3F4F6',
        coverColors: ['#6B7280', '#F9FAFB'],
      },
    ],
  },
  {
    gen: 6,
    name: 'Geração VI',
    region: 'Kalos',
    year: 2013,
    color: '#0EA5E9',
    description:
      'Kalos marcou a transição para 3D completo no Nintendo 3DS e introduziu a Mega Evolução — uma das mecânicas mais populares da série. Inspirado na França, com X e Y sendo os únicos jogos a terem lançamento simultâneo mundial.',
    games: [
      {
        id: 21,
        title: 'Pokémon X',
        year: 2013,
        platform: 'Nintendo 3DS',
        region: 'Kalos',
        description:
          'Primeiro jogo 3D completo da série. Com Xerneas na capa — o Pokémon da Vida. Introduziu Mega Evolução, customização do personagem, Super Training e Pokémon-Amie. Primeiro lançamento simultâneo mundial da série.',
        starters: [650, 653, 656],
        color: '#0EA5E9',
        secondColor: '#38BDF8',
        coverColors: ['#0369A1', '#0EA5E9'],
      },
      {
        id: 22,
        title: 'Pokémon Y',
        year: 2013,
        platform: 'Nintendo 3DS',
        region: 'Kalos',
        description:
          'Com Yveltal na capa — o Pokémon da Destruição. Yveltal e Xerneas representavam a dualidade clássica vida/morte. Y tem os mesmos features de X com diferentes Mega Pokémon disponíveis e Pokémon exclusivos.',
        starters: [650, 653, 656],
        color: '#EC4899',
        secondColor: '#F472B6',
        coverColors: ['#9D174D', '#EC4899'],
      },
      {
        id: 23,
        title: 'Pokémon Omega Ruby',
        year: 2014,
        platform: 'Nintendo 3DS',
        region: 'Hoenn',
        description:
          'Remake de Ruby com gráficos 3DS, Mega Evoluções de Groudon (Primal Reversion) e novas histórias pós-game envolvendo a Equipe Magma. O Delta Episode adicionou uma história de defesa de asteroides envolvendo Rayquaza e Deoxys.',
        starters: [252, 255, 258],
        color: '#DC2626',
        secondColor: '#EF4444',
        coverColors: ['#7F1D1D', '#DC2626'],
        isRemake: true,
        originalGame: 'Ruby',
      },
      {
        id: 24,
        title: 'Pokémon Alpha Sapphire',
        year: 2014,
        platform: 'Nintendo 3DS',
        region: 'Hoenn',
        description:
          'Remake de Sapphire com Primal Reversion de Kyogre. O Delta Episode incluiu uma aventura épica de salvar o mundo de um meteoro com Rayquaza. Melhorou enormemente a narrativa do original.',
        starters: [252, 255, 258],
        color: '#3B82F6',
        secondColor: '#60A5FA',
        coverColors: ['#1E3A8A', '#3B82F6'],
        isRemake: true,
        originalGame: 'Sapphire',
      },
    ],
  },
  {
    gen: 7,
    name: 'Geração VII',
    region: 'Alola',
    year: 2016,
    color: '#F59E0B',
    description:
      'Alola substituiu os Ginásios por Trials — um sistema de provas de ilha. Introduziu Pokémon Regionais (formas Alola), Z-Moves e as Ultra Beasts. Inspirado no Havaí, Alola trouxe uma cultura diferente de todas as regiões anteriores.',
    games: [
      {
        id: 25,
        title: 'Pokémon Sun',
        year: 2016,
        platform: 'Nintendo 3DS',
        region: 'Alola',
        description:
          'Com Solgaleo na capa, Sun apresentou o sistema de Island Trials e uma narrativa sobre invasões de Ultra Beasts através de Ultra Wormholes. Lillie e Lusamine trouxeram dinâmicas familiares complexas à história.',
        starters: [722, 725, 728],
        color: '#F59E0B',
        secondColor: '#FBBF24',
        coverColors: ['#B45309', '#F59E0B'],
      },
      {
        id: 26,
        title: 'Pokémon Moon',
        year: 2016,
        platform: 'Nintendo 3DS',
        region: 'Alola',
        description:
          'Com Lunala na capa, Moon tinha o ciclo de tempo invertido em relação a Sun. A narrativa era idêntica com foco diferente no aspecto lunar. Populares entre os fãs por sua atmosfera noturna.',
        starters: [722, 725, 728],
        color: '#818CF8',
        secondColor: '#A5B4FC',
        coverColors: ['#3730A3', '#818CF8'],
      },
      {
        id: 27,
        title: 'Pokémon Ultra Sun',
        year: 2017,
        platform: 'Nintendo 3DS',
        region: 'Alola',
        description:
          'Versão aprimorada de Sun com Ultra Necrozma como vilão principal e o Ultra Recon Squad como novos personagens. Adicionou Ultra Space com novas localidades para capturar lendários de outras gerações.',
        starters: [722, 725, 728],
        color: '#F97316',
        secondColor: '#FB923C',
        coverColors: ['#C2410C', '#F97316'],
      },
      {
        id: 28,
        title: 'Pokémon Ultra Moon',
        year: 2017,
        platform: 'Nintendo 3DS',
        region: 'Alola',
        description:
          'Versão aprimorada de Moon. A dupla Ultra Sun/Ultra Moon adicionou o Ultra Megalopolis e uma narrativa mais profunda sobre a origem das Ultra Beasts e do Necrozma.',
        starters: [722, 725, 728],
        color: '#7C3AED',
        secondColor: '#8B5CF6',
        coverColors: ['#4C1D95', '#7C3AED'],
      },
      {
        id: 29,
        title: "Pokémon: Let's Go, Pikachu!",
        year: 2018,
        platform: 'Nintendo Switch',
        region: 'Kanto',
        description:
          "Reimaginação de Yellow para Switch, com mecânicas do Pokémon GO integradas. Captura estilo GO com Poké Ball Plus, sem batalhas de captura. Primeiro jogo mainline para console doméstico. Projetado para recém-chegados à série.",
        starters: [25],
        color: '#FBBF24',
        secondColor: '#F59E0B',
        coverColors: ['#78350F', '#FBBF24'],
      },
      {
        id: 30,
        title: "Pokémon: Let's Go, Eevee!",
        year: 2018,
        platform: 'Nintendo Switch',
        region: 'Kanto',
        description:
          "Par de Let's Go, Pikachu com Eevee como companheiro que fica no ombro. Ambos permitiam Co-Op local e uso da Poké Ball Plus como controle físico. Trouxeram veteranos de volta a Kanto.",
        starters: [133],
        color: '#92400E',
        secondColor: '#B45309',
        coverColors: ['#451A03', '#92400E'],
      },
    ],
  },
  {
    gen: 8,
    name: 'Geração VIII',
    region: 'Galar',
    year: 2019,
    color: '#14B8A6',
    description:
      'Galar, inspirado no Reino Unido, introduziu o Dynamax e Gigantamax — mecânicas de gigantificação de Pokémon. Sword e Shield foram os primeiros jogos mainline em Nintendo Switch com mundo aberto parcial. Crown Tundra e Isle of Armor adicionaram conteúdo DLC substancial.',
    games: [
      {
        id: 31,
        title: 'Pokémon Sword',
        year: 2019,
        platform: 'Nintendo Switch',
        region: 'Galar',
        description:
          'Com Zacian na capa, Sword trouxe a primeira aventura em mundo semi-aberto (Wild Area). O sistema de Gym Challenges inspirado em estádios de futebol britânicos deu personalidade única a Galar. Postergame com Crown Tundra e Isle of Armor.',
        starters: [810, 813, 816],
        color: '#3B82F6',
        secondColor: '#60A5FA',
        coverColors: ['#1E3A8A', '#3B82F6'],
      },
      {
        id: 32,
        title: 'Pokémon Shield',
        year: 2019,
        platform: 'Nintendo Switch',
        region: 'Galar',
        description:
          'Com Zamazenta na capa, Shield tem exclusivos diferentes de Sword e uma narrativa idêntica. O Dynamax e Gigantamax foram aclamados visualmente mas criticados por fácil acesso.',
        starters: [810, 813, 816],
        color: '#EF4444',
        secondColor: '#F87171',
        coverColors: ['#7F1D1D', '#EF4444'],
      },
      {
        id: 33,
        title: 'Pokémon Brilliant Diamond',
        year: 2021,
        platform: 'Nintendo Switch',
        region: 'Sinnoh',
        description:
          'Remake fiel de Diamond para Switch com gráficos chibi estilo "brinquedo de brinquedo". Preservou a experiência original de DS com qualidade moderna. Polêmico entre fãs divididos entre preferir fidelidade ou remakes mais expansivos como ORAS.',
        starters: [387, 390, 393],
        color: '#818CF8',
        secondColor: '#A5B4FC',
        coverColors: ['#3730A3', '#818CF8'],
        isRemake: true,
        originalGame: 'Diamond',
      },
      {
        id: 34,
        title: 'Pokémon Shining Pearl',
        year: 2021,
        platform: 'Nintendo Switch',
        region: 'Sinnoh',
        description:
          'Remake fiel de Pearl com o mesmo estilo chibi. A dupla BDSP foi desenvolvida pela ILCA, não pela Game Freak. Incluiu Grand Underground aprimorado com Pokémon visíveis nas cavernas.',
        starters: [387, 390, 393],
        color: '#F472B6',
        secondColor: '#F9A8D4',
        coverColors: ['#9D174D', '#F472B6'],
        isRemake: true,
        originalGame: 'Pearl',
      },
      {
        id: 35,
        title: 'Pokémon Legends: Arceus',
        year: 2022,
        platform: 'Nintendo Switch',
        region: 'Hisui (Sinnoh Antigo)',
        description:
          'A revolução da série. Ambientado no passado histórico de Sinnoh (chamado Hisui), Legend: Arceus foi o primeiro jogo da série com combate em tempo real integrado com exploração. Sem Pokéballs modernas — o jogador deve se esquivar e capturar Pokémon diretamente. Recebeu grandes elogios por sua ousadia e narrativa mitológica.',
        starters: [155, 390, 501],
        color: '#6D28D9',
        secondColor: '#7C3AED',
        coverColors: ['#2E1065', '#6D28D9'],
      },
    ],
  },
  {
    gen: 9,
    name: 'Geração IX',
    region: 'Paldea',
    year: 2022,
    color: '#F43F5E',
    description:
      'Paldea foi a primeira região com mundo completamente aberto — three stories que o jogador explora livremente. Inspirada na Península Ibérica, trouxe Terastal como mecânica de batalha e expandiu enormemente o conceito de open world na série.',
    games: [
      {
        id: 36,
        title: 'Pokémon Scarlet',
        year: 2022,
        platform: 'Nintendo Switch',
        region: 'Paldea',
        description:
          'Com Koraidon na capa, Scarlet tem temática de passado/antigo com a professora Sada. O primeiro mundo completamente aberto da série, com três histórias paralelas: Victory Road, Starfall Street e Path of Legends. Inclui Pokémon Paradoxo do passado.',
        starters: [906, 909, 912],
        color: '#F43F5E',
        secondColor: '#FB7185',
        coverColors: ['#9F1239', '#F43F5E'],
      },
      {
        id: 37,
        title: 'Pokémon Violet',
        year: 2022,
        platform: 'Nintendo Switch',
        region: 'Paldea',
        description:
          'Com Miraidon na capa, Violet tem temática futurista com o professor Turo. Inclui Pokémon Paradoxo do futuro em vez dos do passado de Scarlet. As DLCs Teal Mask e Indigo Disk expandiram Paldea com novas regiões.',
        starters: [906, 909, 912],
        color: '#7C3AED',
        secondColor: '#8B5CF6',
        coverColors: ['#3B0764', '#7C3AED'],
      },
    ],
  },
];

// Spin-offs
export interface SpinoffGame {
  title: string;
  year: number;
  platform: string;
  description: string;
  color: string;
}

export const SPINOFF_GAMES: SpinoffGame[] = [
  {
    title: 'Pokémon Snap',
    year: 1999,
    platform: 'Nintendo 64',
    description: 'Jogo de fotografia em trilhos onde você fotografa Pokémon em seus habitats naturais. Um dos jogos com melhor imersão do mundo Pokémon.',
    color: '#F59E0B',
  },
  {
    title: 'Pokémon Stadium',
    year: 2000,
    platform: 'Nintendo 64',
    description: 'Batalhas Pokémon em 3D pela primeira vez. Permitia transferir Pokémon do Game Boy para batalhar em estádios 3D impressionantes para a época.',
    color: '#6366F1',
  },
  {
    title: 'Pokémon Colosseum',
    year: 2003,
    platform: 'GameCube',
    description: 'RPG para console com mundo pós-apocalíptico onde o jogador rouba "Shadow Pokémon" de vilões para purificá-los. Narrativa sombria única na série.',
    color: '#7C3AED',
  },
  {
    title: 'Pokémon Mystery Dungeon: Red/Blue Rescue Team',
    year: 2005,
    platform: 'GBA / DS',
    description: 'Você É um Pokémon! Dungeon-crawler onde você e seu parceiro formam uma equipe de resgate em um mundo habitado apenas por Pokémon.',
    color: '#059669',
  },
  {
    title: 'Pokémon Ranger',
    year: 2006,
    platform: 'Nintendo DS',
    description: 'Você é um Ranger Pokémon que captura Pokémon temporariamente usando círculos desenhados na tela de toque do DS.',
    color: '#F97316',
  },
  {
    title: 'Pokémon GO',
    year: 2016,
    platform: 'iOS / Android',
    description: 'O fenômeno de realidade aumentada que trouxe milhões de pessoas às ruas para capturar Pokémon no mundo real. Maior evento de AR da história.',
    color: '#EF4444',
  },
  {
    title: 'Pokémon Masters EX',
    year: 2019,
    platform: 'iOS / Android',
    description: 'Batalhas 3v3 com pares de treinadores e Pokémon. Reúne treinadores de todas as gerações em um único jogo de batalhas mobile.',
    color: '#3B82F6',
  },
  {
    title: 'New Pokémon Snap',
    year: 2021,
    platform: 'Nintendo Switch',
    description: 'Sequel moderno do Pokémon Snap original com gráficos HD, centenas de Pokémon para fotografar e mecânicas sociais de compartilhamento.',
    color: '#0EA5E9',
  },
  {
    title: 'Pokémon UNITE',
    year: 2021,
    platform: 'Switch / iOS / Android',
    description: 'MOBA (estilo League of Legends) com Pokémon. Batalhas 5v5 competitivas que geraram uma comunidade de e-sports dedicada.',
    color: '#6366F1',
  },
  {
    title: 'Pokémon Sleep',
    year: 2023,
    platform: 'iOS / Android',
    description: 'O primeiro jogo onde você joga dormindo. O app monitora seu sono e você acorda para descobrir quais Pokémon apareceram durante a noite.',
    color: '#8B5CF6',
  },
];
