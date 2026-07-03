import { reactive } from "vue";
const jogos = reactive([
    {
        id: 1,
        data: '23/06/2026',
        horario: '11:55',
        local: 'Ginasio',
        status: 'Inativo',
        fase: 'Semi-final',
        modalidade: 'Volei',
        time1: 'Preto',
        time2: 'Azul',
        pontuacao1: 0,
        pontuacao2: 0,
    },
])
export{jogos}