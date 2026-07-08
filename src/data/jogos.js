import { reactive } from "vue";
const jogos = reactive([
    {
        id: 1,
        data: '23/06/2026',
        horario: '11:55',
        local: 'Ginasio',
        status: 'AoVivo',
        fase: 'Semi-final',
        modalidade: 'Volei',
         escudo1:'src/assets/Ellipse 24.png',
        escudo2:'src/assets/Ellipse 24.png',
        time1: 'Preto',
        time2: 'Azul',
        pontuacao1: 0,
        pontuacao2: 0,
    },
    {
        id: 2,
        data: '23/06/2026',
        horario: '11:00',
        local: 'Ginasio',
        status: 'AoVivo',
        fase: 'Semi-final',
        modalidade: 'futebol',
        escudo1:'src/assets/Ellipse 24.png',
        escudo2:'src/assets/Ellipse 24.png',
        time1: ' Time Roxo',
        time2: 'Time Azul',
        pontuacao1: 1,
        pontuacao2: 2,
    }
])
export{jogos}
