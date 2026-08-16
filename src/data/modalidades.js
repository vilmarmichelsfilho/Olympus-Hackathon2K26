import { reactive } from "vue";
const modalidades = reactive([
  {
    id: 1,
    nome: 'Voleibol',
    image: '/images/imagem-modalidades/volei.png',
    desc: 'Voleibol é um esporte coletivo em que duas equipes de seis jogadores se enfrentam em uma quadra dividida por uma rede.'
  },
  {
    id: 2,
    nome: 'Futsal',
    image: '/images/imagem-modalidades/futsal.png',
    desc: 'Futsal é um esporte coletivo em que duas equipes de 5 jogadores se enfrentam e vence quem marcar o maior número de gols'
  },
  {
    id: 3,
    nome: 'Valorant',
    image: '/images/imagem-modalidades/valorant.png',
    desc: 'Valorant é um jogo de tiro tático em primeira pessoa onde duas equipes de cinco jogadores duelam atacando ou defendendo bombas usando armas de fogo e personagens com habilidades únicas.'
  },
  {
    id: 4,
    nome: 'Basquete',
    image: '/images/imagem-modalidades/basquete.png',
    desc:  'Basquete é um esporte coletivo em que duas equipes de 5 jogadores se enfrentam e vence quem fazer o maior número de cestas'
  },
  {
    id: 5,
    nome: 'Brawl Stars',
    image: '/images/imagem-modalidades/brawlstars.png',
    desc: 'Brawl Stars é um jogo mobile de ação em arenas multijogador onde equipes duelam em partidas rápidas usando personagens únicos com poderes especiais em vários modos de jogo competitivos.'
  },
  {
    id: 6,
    nome: 'Xadrez',
    image: '/images/imagem-modalidades/xadrez.png',
    desc: 'Xadrez é um jogo de tabuleiro estratégico e milenar onde dois jogadores movem dezesseis peças com características únicas em turnos, com o objetivo final de encurralar o rei adversário em xeque-mate.'
  },
  {
    id: 7,
    nome: 'FIFA',
    image: '/images/imagem-modalidades/eafc.png',
    desc: 'EA Sports FC (antigo FIFA) é o principal simulador de futebol virtual do mundo, onde os jogadores controlam times e atletas reais em partidas ultra-realistas e gerenciam seus próprios clubes no modo Ultimate Team.'
  },
  {
    id: 8,
    nome: 'Futebol',
    image: '/images/imagem-modalidades/futebol.png',
    desc: 'O futebol é o esporte mais popular do mundo, disputado por duas equipes de onze jogadores que usam os pés e a cabeça para conduzir e chutar a bola para dentro do gol adversário.'
  }
])
export { modalidades }
