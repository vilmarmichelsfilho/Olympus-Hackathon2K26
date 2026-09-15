import { reactive } from 'vue'

export const jogos = reactive([
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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 4,
    cod_modalidade: 1,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 5,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 1,
    origem_jogo_b: 2
  },
  {
    cod_jogo: 6,
    cod_modalidade: 1,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 3,
    origem_jogo_b: 4
  },
  {
    cod_jogo: 7,
    cod_modalidade: 1,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-24 10:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 5,
    origem_jogo_b: 6
  },

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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 11,
    cod_modalidade: 2,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 12,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 8,
    origem_jogo_b: 9
  },
  {
    cod_jogo: 13,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 10,
    origem_jogo_b: 11
  },
  {
    cod_jogo: 14,
    cod_modalidade: 2,
    cod_arbitro: 3,
    status_jogo: "AoVivo",
    horario_jogo: "2026-06-24 09:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 12,
    origem_jogo_b: 13
  },

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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 15:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 18,
    cod_modalidade: 3,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-20 16:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 19,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 13:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 15,
    origem_jogo_b: 16
  },
  {
    cod_jogo: 20,
    cod_modalidade: 3,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-22 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 17,
    origem_jogo_b: 18
  },
  {
    cod_jogo: 21,
    cod_modalidade: 3,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-24 14:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 19,
    origem_jogo_b: 20
  },

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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 25,
    cod_modalidade: 4,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 12:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 26,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 22,
    origem_jogo_b: 23
  },
  {
    cod_jogo: 27,
    cod_modalidade: 4,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 09:30:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 24,
    origem_jogo_b: 25
  },
  {
    cod_jogo: 28,
    cod_modalidade: 4,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-25 10:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 26,
    origem_jogo_b: 27
  },

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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 32,
    cod_modalidade: 5,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 33,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 08:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 29,
    origem_jogo_b: 30
  },
  {
    cod_jogo: 34,
    cod_modalidade: 5,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 09:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 31,
    origem_jogo_b: 32
  },
  {
    cod_jogo: 35,
    cod_modalidade: 5,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-25 09:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 33,
    origem_jogo_b: 34
  },

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
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-21 16:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 40,
    cod_modalidade: 6,
    cod_arbitro: 3,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 13:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 36,
    origem_jogo_b: 37
  },
  {
    cod_jogo: 41,
    cod_modalidade: 6,
    cod_arbitro: 1,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-23 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 38,
    origem_jogo_b: 39
  },
  {
    cod_jogo: 42,
    cod_modalidade: 6,
    cod_arbitro: 2,
    status_jogo: "Finalizado",
    horario_jogo: "2026-06-25 15:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 40,
    origem_jogo_b: 41
  },
  {
    cod_jogo: 43,
    cod_modalidade: 7,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 44,
    cod_modalidade: 7,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 45,
    cod_modalidade: 7,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 46,
    cod_modalidade: 7,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 47,
    cod_modalidade: 7,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-20 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 43,
    origem_jogo_b: 44
  },
  {
    cod_jogo: 48,
    cod_modalidade: 7,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-20 15:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 45,
    origem_jogo_b: 46
  },
  {
    cod_jogo: 49,
    cod_modalidade: 7,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-21 16:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 47,
    origem_jogo_b: 48
  },
  {
    cod_jogo: 50,
    cod_modalidade: 8,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 51,
    cod_modalidade: 8,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 09:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 52,
    cod_modalidade: 8,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 53,
    cod_modalidade: 8,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-19 12:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 54,
    cod_modalidade: 8,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-20 14:30:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 50,
    origem_jogo_b: 51
  },
  {
    cod_jogo: 55,
    cod_modalidade: 8,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-20 16:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 52,
    origem_jogo_b: 53
  },
  {
    cod_jogo: 56,
    cod_modalidade: 8,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-21 17:30:00",
    fase_jogo: "Final",
    origem_jogo_a: 54,
    origem_jogo_b: 55
  },

  {
    cod_jogo: 57,
    cod_modalidade: 9,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 58,
    cod_modalidade: 9,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 09:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 59,
    cod_modalidade: 9,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 60,
    cod_modalidade: 9,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 12:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 61,
    cod_modalidade: 9,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-23 14:30:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 57,
    origem_jogo_b: 58
  },
  {
    cod_jogo: 62,
    cod_modalidade: 9,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-23 16:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 59,
    origem_jogo_b: 60
  },
  {
    cod_jogo: 63,
    cod_modalidade: 9,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-24 17:30:00",
    fase_jogo: "Final",
    origem_jogo_a: 61,
    origem_jogo_b: 62
  },
  {
    cod_jogo: 64,
    cod_modalidade: 10,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 65,
    cod_modalidade: 10,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 09:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 66,
    cod_modalidade: 10,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 67,
    cod_modalidade: 10,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-22 12:30:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 68,
    cod_modalidade: 10,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-23 14:30:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 64,
    origem_jogo_b: 65
  },
  {
    cod_jogo: 69,
    cod_modalidade: 10,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-23 16:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 66,
    origem_jogo_b: 67
  },
  {
    cod_jogo: 70,
    cod_modalidade: 10,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-24 17:30:00",
    fase_jogo: "Final",
    origem_jogo_a: 68,
    origem_jogo_b: 69
  },
  {
    cod_jogo: 71,
    cod_modalidade: 11,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 72,
    cod_modalidade: 11,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 73,
    cod_modalidade: 11,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 74,
    cod_modalidade: 11,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 75,
    cod_modalidade: 11,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-26 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 71,
    origem_jogo_b: 72
  },
  {
    cod_jogo: 76,
    cod_modalidade: 11,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-26 15:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 73,
    origem_jogo_b: 74
  },
  {
    cod_jogo: 77,
    cod_modalidade: 11,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-27 16:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 75,
    origem_jogo_b: 76
  },
  {
    cod_jogo: 78,
    cod_modalidade: 12,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 08:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 79,
    cod_modalidade: 12,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 09:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 80,
    cod_modalidade: 12,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 10:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 81,
    cod_modalidade: 12,
    cod_arbitro: 6,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-25 11:00:00",
    fase_jogo: "Quartas de Final",
    origem_jogo_a: null,
    origem_jogo_b: null
  },
  {
    cod_jogo: 82,
    cod_modalidade: 12,
    cod_arbitro: 7,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-26 14:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 78,
    origem_jogo_b: 79
  },
  {
    cod_jogo: 83,
    cod_modalidade: 12,
    cod_arbitro: 4,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-26 15:00:00",
    fase_jogo: "Semifinal",
    origem_jogo_a: 80,
    origem_jogo_b: 81
  },
  {
    cod_jogo: 84,
    cod_modalidade: 12,
    cod_arbitro: 5,
    status_jogo: "Agendado",
    horario_jogo: "2027-06-27 17:00:00",
    fase_jogo: "Final",
    origem_jogo_a: 82,
    origem_jogo_b: 83
  }
])
