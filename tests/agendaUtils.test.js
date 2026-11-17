import assert from 'node:assert/strict'
import { test } from 'node:test'
import { obterAgendaPorTime, obterProximosJogos } from '../src/Utils/agendaUtils.js'

const times = [
  { cod_time: 1, nome_time: 'Azul' },
  { cod_time: 2, nome_time: 'Verde' },
  { cod_time: 3, nome_time: 'Roxo' },
]
const modalidades = [
  { cod_modalidade: 1, nome_modalidade: 'Futsal', localdojogo_modalidade: 'Quadra A' },
  { cod_modalidade: 2, nome_modalidade: 'Xadrez' },
]
const agora = new Date('2026-10-05T12:00:00Z') // 09:00 no campus.
const jogo = (cod_jogo, horario_jogo, status_jogo = 'Agendado', cod_modalidade = 1) => ({
  cod_jogo, horario_jogo, status_jogo, cod_modalidade,
})
const participa = [
  { cod_jogo: 1, posicao_participante: 2, cod_time: 2 },
  { cod_jogo: 1, posicao_participante: 1, cod_time: 1 },
  { cod_jogo: 2, posicao_participante: 1, cod_time: 2 },
  { cod_jogo: 2, posicao_participante: 2, cod_time: null },
]

test('exibe apenas jogos agendados futuros, em ordem, no horário do campus', () => {
  const jogos = [
    jogo(2, '2026-10-06 08:00:00'),
    jogo(3, '2026-10-05 08:59:59'),
    jogo(4, '2026-10-06 10:00:00', 'Finalizado'),
    jogo(5, '2026-10-06 11:00:00', 'AoVivo'),
    jogo(6, 'horário inválido'),
    jogo(1, '2026-10-05 09:00:00'),
  ]
  const resultado = obterProximosJogos(jogos, modalidades, participa, times, agora)
  assert.deepEqual(resultado.map((item) => item.cod_jogo), [1, 2])
  assert.equal(resultado[0].horario, '09:00')
  assert.equal(resultado[0].dataHora, '2026-10-05T09:00:00-03:00')
  assert.equal(jogos[0].cod_jogo, 2)
})

test('respeita a posição dos participantes e exibe adversário ainda não definido', () => {
  const resultado = obterProximosJogos([
    jogo(1, '2026-10-06 09:00:00'),
    jogo(2, '2026-10-06 10:00:00'),
  ], modalidades, participa, times, agora)
  assert.deepEqual(resultado[0].participantes.map((item) => item.nome_time), ['Azul', 'Verde'])
  assert.deepEqual(resultado[1].participantes[1], { cod_time: null, nome_time: 'A definir' })
  assert.equal(resultado[0].local, 'Quadra A')
})

test('combina modalidade e time, mantendo visíveis times sem jogos nessa modalidade', () => {
  const futuros = obterProximosJogos([
    jogo(1, '2026-10-06 09:00:00'),
    jogo(2, '2026-10-06 10:00:00', 'Agendado', 2),
  ], modalidades, participa, times, agora)
  const agenda = obterAgendaPorTime(times, futuros, 2)
  assert.deepEqual(agenda.map((time) => time.jogos.length), [0, 1, 0])
  const filtrada = obterAgendaPorTime(times, futuros, 1, 2)
  assert.equal(filtrada.length, 1)
  assert.equal(filtrada[0].nome_time, 'Verde')
  assert.deepEqual(filtrada[0].jogos.map((item) => item.cod_jogo), [1])
  assert.equal(obterAgendaPorTime(times, futuros, 1, 3)[0].jogos.length, 0)
})

test('mostra cada time sem jogos quando a agenda estiver vazia', () => {
  assert.deepEqual(obterAgendaPorTime(times, []).map((time) => time.jogos), [[], [], []])
  assert.deepEqual(obterAgendaPorTime([], []), [])
})

test('prioriza o local específico do jogo e mantém informação ausente legível', () => {
  const resultado = obterProximosJogos([
    { ...jogo(1, '2026-10-06 09:00:00'), local_jogo: 'Quadra B' },
    jogo(2, '2026-10-06 10:00:00', 'Agendado', 99),
  ], modalidades, [], times, agora)
  assert.equal(resultado[0].local, 'Quadra B')
  assert.equal(resultado[1].local, 'Local a definir')
  assert.equal(resultado[1].modalidade, 'Modalidade a definir')
  assert.deepEqual(resultado[1].participantes.map((item) => item.nome_time), ['A definir', 'A definir'])
})
