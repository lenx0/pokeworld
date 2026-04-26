export type TrainerRole = 'Protagonista' | 'Rival' | 'Companheiro' | 'Campeão' | 'Vilão' | 'Líder de Ginásio';

export interface TrainerPokemon {
  id: number;
  isSignature?: boolean;
}

export interface Trainer {
  id: number;
  name: string;
  nameOriginal: string;
  role: TrainerRole;
  region: string;
  description: string;
  quote: string;
  primaryColor: string;
  secondaryColor: string;
  team: TrainerPokemon[];
  firstAppearance: string;
  goal: string;
  badge?: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: 'Ash Ketchum',
    nameOriginal: 'Satoshi',
    role: 'Protagonista',
    region: 'Pallet Town, Kanto',
    description:
      'O protagonista mais icônico do anime Pokémon. Ash partiu de Pallet Town com um Pikachu teimoso e percorreu todas as regiões, tornando-se um dos maiores treinadores de todos os tempos. Sua jornada durou décadas e culminou com o título de Campeão Mundial.',
    quote: '"Eu quero ser o melhor treinador Pokémon do mundo!" ',
    primaryColor: '#3B82F6',
    secondaryColor: '#EF4444',
    team: [
      { id: 25, isSignature: true },
      { id: 6 },
      { id: 143 },
      { id: 94 },
      { id: 448 },
      { id: 658 },
    ],
    firstAppearance: 'Temporada 1 — Pokémon, eu escolho você! (1997)',
    goal: 'Tornar-se o maior Mestre Pokémon do mundo',
    badge: '🏆 Campeão Mundial',
  },
  {
    id: 2,
    name: 'Misty',
    nameOriginal: 'Kasumi',
    role: 'Companheiro',
    region: 'Cerulean City, Kanto',
    description:
      'Líder de Ginásio de Cerulean City e especialista em Pokémon do tipo Água. Misty acompanhou Ash durante toda a saga de Kanto e Johto, tornando-se uma das companheiras mais queridas do anime. Sua bicicleta destruída por Pikachu foi o pretexto para a parceria.',
    quote: '"Pokémon do tipo Água são os melhores do mundo!"',
    primaryColor: '#06B6D4',
    secondaryColor: '#F59E0B',
    team: [
      { id: 121, isSignature: true },
      { id: 120 },
      { id: 54 },
      { id: 175 },
      { id: 130 },
    ],
    firstAppearance: 'Temporada 1 — Ash Pega Pikachu (1997)',
    goal: 'Tornar-se a maior treinadora de Pokémon aquáticos do mundo',
  },
  {
    id: 3,
    name: 'Brock',
    nameOriginal: 'Takeshi',
    role: 'Companheiro',
    region: 'Pewter City, Kanto',
    description:
      'O primeiro Líder de Ginásio enfrentado por Ash, Brock logo se tornaria seu companheiro inseparável. Especialista em Pokémon do tipo Pedra e sonhador de se tornar o melhor criador de Pokémon do mundo. Seu cuidado com os Pokémon e suas habilidades culinárias são inigualáveis.',
    quote: '"Vou ser o maior criador de Pokémon do mundo!"',
    primaryColor: '#B45309',
    secondaryColor: '#6B7280',
    team: [
      { id: 95, isSignature: true },
      { id: 74 },
      { id: 208 },
      { id: 169 },
      { id: 205 },
    ],
    firstAppearance: 'Temporada 1 — Showdown in Pewter City (1997)',
    goal: 'Tornar-se o melhor criador de Pokémon',
  },
  {
    id: 4,
    name: 'Gary Oak',
    nameOriginal: 'Shigeru Okido',
    role: 'Rival',
    region: 'Pallet Town, Kanto',
    description:
      'O rival de longa data de Ash e neto do Professor Carvalho. Gary sempre esteve um passo à frente, provocando Ash com seu estilo arrogante e seu grupo de torcedoras. Eventualmente, Gary abandonou o caminho das batalhas para se tornar um pesquisador Pokémon, seguindo os passos do avô.',
    quote: '"Gary é o número um!"',
    primaryColor: '#7C3AED',
    secondaryColor: '#F97316',
    team: [
      { id: 9, isSignature: true },
      { id: 59 },
      { id: 466 },
      { id: 197 },
      { id: 31 },
    ],
    firstAppearance: 'Temporada 1 — Pokémon Emergency! (1997)',
    goal: 'Superar o Ash e se tornar Mestre Pokémon',
  },
  {
    id: 5,
    name: 'May',
    nameOriginal: 'Haruka',
    role: 'Companheiro',
    region: 'Petalburg City, Hoenn',
    description:
      'Filha do Líder de Ginásio Norman, May iniciou sua jornada sem entusiasmo pelos Pokémon, mas rapidamente se apaixonou pelas Coordenadas Pokémon. Com sua Blaziken e sua criatividade, tornou-se uma das melhores Coordinators do mundo, viajando por Hoenn e Kanto.',
    quote: '"Pokémon Contests são a coisa mais incrível do mundo!"',
    primaryColor: '#EF4444',
    secondaryColor: '#FFFFFF',
    team: [
      { id: 257, isSignature: true },
      { id: 267 },
      { id: 300 },
      { id: 446 },
      { id: 8 },
    ],
    firstAppearance: 'Temporada 6 — Get the Show on the Road! (2002)',
    goal: 'Tornar-se a maior Pokémon Coordinator do mundo',
  },
  {
    id: 6,
    name: 'Dawn',
    nameOriginal: 'Hikari',
    role: 'Companheiro',
    region: 'Twinleaf Town, Sinnoh',
    description:
      'Uma jovem Coordinator de Sinnoh que partiu de Twinleaf Town para participar dos Grandes Festivais. Conhecida por suas apresentações elegantes e sua confiança inabalável, Dawn sempre dizia "Sem problemas!" mesmo nas piores situações. Sua parceria com Piplup é um dos vínculos mais bonitos do anime.',
    quote: '"Sem problemas!"',
    primaryColor: '#3B82F6',
    secondaryColor: '#EC4899',
    team: [
      { id: 393, isSignature: true },
      { id: 427 },
      { id: 417 },
      { id: 418 },
      { id: 473 },
    ],
    firstAppearance: 'Temporada 10 — Following a Maiden\'s Voyage! (2007)',
    goal: 'Vencer o Grande Festival de Sinnoh',
  },
  {
    id: 7,
    name: 'Iris',
    nameOriginal: 'Iris',
    role: 'Companheiro',
    region: 'Village of Dragons, Unova',
    description:
      'Uma garota selvagem da Vila dos Dragões em Unova, Iris sonhava em se tornar uma Mestra dos Dragões. Ela se juntou a Ash em sua jornada por Unova, trazendo sua intuição com Pokémon do tipo Dragão. Anos mais tarde, tornou-se a Campeã da Liga Unova, provando que seus sonhos eram realizáveis.',
    quote: '"Que criancice!"',
    primaryColor: '#7C3AED',
    secondaryColor: '#10B981',
    team: [
      { id: 610, isSignature: true },
      { id: 149 },
      { id: 530 },
      { id: 587 },
    ],
    firstAppearance: 'Temporada 14 — In the Shadow of Zekrom! (2011)',
    goal: 'Tornar-se Mestra dos Pokémon Dragão',
    badge: '🏆 Campeã de Unova',
  },
  {
    id: 8,
    name: 'Serena',
    nameOriginal: 'Serena',
    role: 'Companheiro',
    region: 'Vaniville Town, Kalos',
    description:
      'Serena conheceu Ash em um acampamento de verão quando eram crianças, e o reencontrou anos depois em Kalos. Inicialmente sem objetivo claro, ela descobriu sua paixão pelas Pokémon Showcases — apresentações que combinavam beleza, Pokémon e talento. Sua parceria com Ash é uma das mais emocionantes do anime.',
    quote: '"Hoje é o dia em que tudo começa!"',
    primaryColor: '#F43F5E',
    secondaryColor: '#A78BFA',
    team: [
      { id: 654, isSignature: true },
      { id: 674 },
      { id: 700 },
    ],
    firstAppearance: 'Temporada 17 — Kalos, Where Dreams and Adventures Begin! (2014)',
    goal: 'Tornar-se grande Pokémon Performer',
  },
  {
    id: 9,
    name: 'Paul',
    nameOriginal: 'Shinji',
    role: 'Rival',
    region: 'Veilstone City, Sinnoh',
    description:
      'O rival mais sombrio que Ash já enfrentou. Paul acreditava que apenas Pokémon fortes merecem atenção, dispensando os que considerava fracos. Sua metodologia brutal contrastava com a filosofia de amizade de Ash. Após uma batalha épica de seis contra seis na Liga Sinnoh, Paul finalmente reconheceu o valor da abordagem de Ash.',
    quote: '"Fraqueza me irrita."',
    primaryColor: '#4B5563',
    secondaryColor: '#7C3AED',
    team: [
      { id: 392, isSignature: true },
      { id: 409 },
      { id: 471 },
      { id: 462 },
      { id: 445 },
      { id: 461 },
    ],
    firstAppearance: 'Temporada 10 — Two Degrees of Separation! (2007)',
    goal: 'Construir a equipe Pokémon mais forte do mundo',
  },
  {
    id: 10,
    name: 'Cynthia',
    nameOriginal: 'Shirona',
    role: 'Campeão',
    region: 'Celestic Town, Sinnoh',
    description:
      'A Campeã da Liga Sinnoh e uma das mais poderosas treinadoras já vista no anime. Estudiosa da história e mitologia Pokémon, Cynthia é uma figura misteriosa e elegante. Seu Garchomp é considerado um dos Pokémon mais temidos. Ela derrotou facilmente rivais que Ash levou temporadas para superar.',
    quote: '"Não importa o início. O que importa é o que você escolhe ser."',
    primaryColor: '#1E3A5F',
    secondaryColor: '#FFD700',
    team: [
      { id: 445, isSignature: true },
      { id: 442 },
      { id: 468 },
      { id: 448 },
      { id: 407 },
      { id: 350 },
    ],
    firstAppearance: 'Temporada 10 — Top-Down Training! (2008)',
    goal: 'Explorar e proteger os mistérios do mundo Pokémon',
    badge: '🏆 Campeã de Sinnoh',
  },
  {
    id: 11,
    name: 'Lance',
    nameOriginal: 'Wataru',
    role: 'Campeão',
    region: 'Blackthorn City, Johto',
    description:
      'O Campeão da Liga Johto e um dos quatro membros da Elite Four de Kanto. Lance é um especialista em Pokémon do tipo Dragão e usa sua força para proteger o mundo. Ele ajudou Ash e Misty a desvendar a conspiração do Team Rocket envolvendo Gyarados em fúria em Johto.',
    quote: '"Pokémon do tipo Dragão respondem apenas aos treinadores mais fortes."',
    primaryColor: '#B91C1C',
    secondaryColor: '#FBBF24',
    team: [
      { id: 149, isSignature: true },
      { id: 130 },
      { id: 142 },
      { id: 148 },
    ],
    firstAppearance: 'Temporada 5 — Talkin\' \'Bout an Evolution (2001)',
    goal: 'Proteger o mundo Pokémon usando o poder dos Dragões',
    badge: '🏆 Campeão de Johto',
  },
  {
    id: 12,
    name: 'Giovanni',
    nameOriginal: 'Sakaki',
    role: 'Vilão',
    region: 'Viridian City, Kanto',
    description:
      'O líder secreto do Team Rocket e Líder do Ginásio de Viridian City. Giovanni usa Pokémon como ferramentas para seu domínio de mundo. Seu Persian e seu desejo insaciável de poder tornaram-no o maior vilão do anime. Ele foi o responsável pela criação de Mewtwo, um experimento que lhe custou caro.',
    quote: '"O mundo pertence ao Team Rocket."',
    primaryColor: '#111827',
    secondaryColor: '#B91C1C',
    team: [
      { id: 53, isSignature: true },
      { id: 112 },
      { id: 68 },
      { id: 51 },
      { id: 34 },
    ],
    firstAppearance: 'Temporada 1 — Battle Aboard the St. Anne (1997)',
    goal: 'Dominar o mundo usando o poder dos Pokémon',
  },
  {
    id: 13,
    name: 'Jessie & James',
    nameOriginal: 'Musashi & Kojiro',
    role: 'Vilão',
    region: 'Team Rocket HQ, Kanto',
    description:
      'A dupla mais famosa de vilões incompetentes do mundo Pokémon. Jessie e James (e seu Meowth falante) perseguiram Ash por todas as regiões tentando capturar o Pikachu de Ash. Apesar dos constantes fracassos e explosões, tornaram-se figuras icônicas do anime, mostrando que até vilões podem ter momentos de heroísmo.',
    quote: '"Prepare-se para o problema, e faça o dobro desse problema!"',
    primaryColor: '#B91C1C',
    secondaryColor: '#FFFFFF',
    team: [
      { id: 52, isSignature: true },
      { id: 24 },
      { id: 110 },
      { id: 202 },
    ],
    firstAppearance: 'Temporada 1 — Pokémon Emergency! (1997)',
    goal: 'Capturar o Pikachu de Ash para o Team Rocket',
  },
  {
    id: 14,
    name: 'Red',
    nameOriginal: 'Red',
    role: 'Protagonista',
    region: 'Pallet Town, Kanto',
    description:
      'O protagonista silencioso dos jogos originais, Red é considerado por muitos o maior treinador Pokémon de todos os tempos. Após vencer a Liga Pokémon de Kanto e derrotar seu rival, Red subiu ao cume do Monte Silver em Johto, onde medita em silêncio eterno. Sua equipe lendária inclui todos os Pokémon iniciais de Kanto.',
    quote: '"..."',
    primaryColor: '#DC2626',
    secondaryColor: '#FBBF24',
    team: [
      { id: 25, isSignature: true },
      { id: 3 },
      { id: 6 },
      { id: 9 },
      { id: 143 },
      { id: 196 },
    ],
    firstAppearance: 'Pokémon Red/Green (1996) — Anime: Temporada 14',
    goal: 'O treinamento perfeito no cume do Monte Silver',
    badge: '🏆 Campeão de Kanto',
  },
  {
    id: 15,
    name: 'Goh',
    nameOriginal: 'Go',
    role: 'Companheiro',
    region: 'Vermilion City, Kanto',
    description:
      'Parceiro de Ash nas Viagens Pokémon, Goh tem um sonho peculiar: capturar todos os Pokémon existentes e, acima de tudo, capturar o mítico Mew. Diferentemente de outros treinadores, Goh prefere capturar a batalhar, acumulando uma das maiores coleções de Pokémon já vista no anime.',
    quote: '"Vou capturar todos os Pokémon!"',
    primaryColor: '#0EA5E9',
    secondaryColor: '#10B981',
    team: [
      { id: 819, isSignature: true },
      { id: 123 },
      { id: 245 },
      { id: 133 },
    ],
    firstAppearance: 'Temporada 23 — Enter Pikachu! (2019)',
    goal: 'Capturar o Mew e todos os Pokémon existentes',
  },
];
