import { reactive } from 'vue'

export const jogos = reactive([
  // Futsal
  {
    cod_jogo: 1,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 2,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 3,
    cod_modalidade: 1,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 4,
    cod_modalidade: 1,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 5,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 1,
    origem_jogo_b: 2
  },
  {
    cod_jogo: 6,
    cod_modalidade: 1,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 3,
    origem_jogo_b: 4
  },
  {
    cod_jogo: 7,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-24 10:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 5,
    origem_jogo_b: 6
  },

  // Voleibol
  {
    cod_jogo: 8,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 9,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 10,
    cod_modalidade: 2,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 11,
    cod_modalidade: 2,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 12,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 8,
    origem_jogo_b: 9
  },
  {
    cod_jogo: 13,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 10,
    origem_jogo_b: 11
  },
  {
    cod_jogo: 14,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-24 09:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 12,
    origem_jogo_b: 13
  },

  // Basquete
  {
    cod_jogo: 15,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 13:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 16,
    cod_modalidade: 3,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 14:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 17,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 15:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 18,
    cod_modalidade: 3,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-20 16:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 19,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 13:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 15,
    origem_jogo_b: 16
  },
  {
    cod_jogo: 20,
    cod_modalidade: 3,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-22 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 17,
    origem_jogo_b: 18
  },
  {
    cod_jogo: 21,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-24 14:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 19,
    origem_jogo_b: 20
  },

  // Valorant
  {
    cod_jogo: 22,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 23,
    cod_modalidade: 4,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 09:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 24,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-21 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 25,
    cod_modalidade: 4,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-21 12:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 26,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 22,
    origem_jogo_b: 23
  },
  {
    cod_jogo: 27,
    cod_modalidade: 4,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 09:30:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 24,
    origem_jogo_b: 25
  },
  {
    cod_jogo: 28,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-25 10:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 26,
    origem_jogo_b: 27
  },

  // Xadrez
  {
    cod_jogo: 29,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 30,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 31,
    cod_modalidade: 5,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-21 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 32,
    cod_modalidade: 5,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-21 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 33,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 29,
    origem_jogo_b: 30
  },
  {
    cod_jogo: 34,
    cod_modalidade: 5,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 31,
    origem_jogo_b: 32
  },
  {
    cod_jogo: 35,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-25 09:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 33,
    origem_jogo_b: 34
  },

  // Brawl Stars
  {
    cod_jogo: 36,
    cod_modalidade: 6,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 13:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 37,
    cod_modalidade: 6,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 14:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 38,
    cod_modalidade: 6,
    cod_arbitro: 1,
    status_jogo: "AoVivo",
    horario_jogo: "2026-06-21 15:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 39,
    cod_modalidade: 6,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-21 16:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 40,
    cod_modalidade: 6,
    cod_arbitro: 3,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 13:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 36,
    origem_jogo_b: 37
  },
  {
    cod_jogo: 41,
    cod_modalidade: 6,
    cod_arbitro: 1,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-23 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 38,
    origem_jogo_b: 39
  },
  {
    cod_jogo: 42,
    cod_modalidade: 6,
    cod_arbitro: 2,
    status_jogo: "Agendado",
    horario_jogo: "2026-06-25 15:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 40,
    origem_jogo_b: 41
  }
])
