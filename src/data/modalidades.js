import { reactive } from 'vue'

export const modalidades = reactive([
  {
    cod_modalidade: 1,
    nome_modalidade: "Futsal",
    desc_modalidade: "Competição de futsal",
    tempojogemminutos_modalidade: 40,
    localdojogo_modalidade: "Quadra B",
    foto_modalidade: "/images/imagem-modalidades/futsal.png",
    cod_torneio: 1
  },
  {
    cod_modalidade: 2,
    nome_modalidade: "Voleibol",
    desc_modalidade: "Competição de voleibol",
    tempojogemminutos_modalidade: 60,
    localdojogo_modalidade: "Quadra A",
    foto_modalidade: "/images/imagem-modalidades/voleibol.png",
    cod_torneio: 1
  },
  {
    cod_modalidade: 3,
    nome_modalidade: "Basquete",
    desc_modalidade: "Competição de basquete",
    tempojogemminutos_modalidade: 50,
    localdojogo_modalidade: "Quadra C",
    foto_modalidade: "/images/imagem-modalidades/basquete.png",
    cod_torneio: 1
  },
  {
    cod_modalidade: 4,
    nome_modalidade: "Valorant",
    desc_modalidade: "Competição de Valorant",
    tempojogemminutos_modalidade: 60,
    localdojogo_modalidade: "Sala E-Sports",
    foto_modalidade: "  /images/imagem-modalidades/valorant.png",
    cod_torneio: 1
  },
  {
    cod_modalidade: 5,
    nome_modalidade: "Xadrez",
    desc_modalidade: "Competição de xadrez",
    tempojogemminutos_modalidade: 30,
    localdojogo_modalidade: "Biblioteca",
    foto_modalidade: "/images/imagem-modalidades/xadrez.png",
    cod_torneio: 1
  },
  {
    cod_modalidade: 6,
    nome_modalidade: "Brawl Stars",
    desc_modalidade: "Competição de Brawl Stars",
    tempojogemminutos_modalidade: 30,
    localdojogo_modalidade: "Sala Mobile",
    foto_modalidade: "/images/imagem-modalidades/brawlstars.png",
    cod_torneio: 1
  }
])
