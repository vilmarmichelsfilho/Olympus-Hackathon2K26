import { reactive } from "vue";
const jogos = reactive([
    {
        id: 1,
        horario: Date("2026-08-20T12:00:00Z"),
        local: 'Ginasio',
        status: 'Inativo',
        fase: 'Semi-final',
        modalidade: 'Volei',
        time1: 'Preto',
        time2: 'Azul',
    },
])