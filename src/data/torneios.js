import { reactive } from 'vue'

export const torneios = reactive([
  {
    cod_torneio: 1,
    nome_torneio: "Olimpíadas IFC Araquari 2026",
    data_inicio_torneio: "2026-06-20",
    data_fim_torneio: "2026-06-27",
    status_torneio: "Em andamento",
    cod_adm: 1
  },
  {
    cod_torneio: 2,
    nome_torneio: "Olimpíadas IFC Araquari 2027",
    data_inicio_torneio: "2027-06-19",
    data_fim_torneio: "2027-06-26",
    status_torneio: "Agendado",
    cod_adm: 1
  }
])
