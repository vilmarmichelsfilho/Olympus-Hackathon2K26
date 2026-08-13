import { reactive } from "vue";
const modalidades = reactive([
    {
        id: 1,
        nome: 'Voleibol',
        image: '/images/imagem-modalidades/volei.png'
    },
    {
        id: 2,
        nome: 'Futsal',
        image: '/images/imagem-modalidades/futsal.png'
    },
    {
        id: 3,
        nome: 'Valorant',
        image: '/images/imagem-modalidades/valorant.png'
    },
    {
        id: 4,
        nome: 'Basquete',
        image: '/images/imagem-modalidades/basquete.png'
    },
    {
        id: 5,
        nome: 'Brawl Stars',
        image: '/images/imagem-modalidades/brawlstars.png'
    },
    {
        id: 6,
        nome: 'Xadrez',
        image: '/images/imagem-modalidades/xadrez.png'
    },
    {
        id: 7,
        nome: 'Ea fc',
        image: '/images/imagem-modalidades/eafc.png'
    },
    {
      id: 8,
      nome: 'Futebol',
      image: '/images/imagem-modalidades/futebol.png'
    }
])
export{modalidades}
