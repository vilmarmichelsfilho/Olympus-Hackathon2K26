import { reactive } from "vue";
const jogos = reactive([
    {
        id: 1,
        data: Date("2026-07-07"),
        horario: '14:30',
        local: 'Ginasio',
        fase: 'Semi-final',
        modalidade: 'Volei',
        time1: 'Preto',
        time2: 'Azul',
        pontuacao1: 0,
        pontuacao2: 0,
    },
])
export{jogos}