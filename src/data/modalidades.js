import { reactive } from 'vue'

const url = 'http://localhost:3000/modalidades'

export const modalidades = reactive([])

function prepararModalidade(modalidade) {
  const codigo = Number(modalidade.id)
  const torneio = Number(modalidade.id_torneio)

  return {
    ...modalidade,
    cod_modalidade: Number.isNaN(codigo) ? modalidade.id : codigo,
    cod_torneio: Number.isNaN(torneio) ? modalidade.id_torneio : torneio,
  }
}

function dadosDaModalidade(dados, modalidadeAtual = {}) {
  const torneio = dados.cod_torneio ?? dados.id_torneio ?? modalidadeAtual.cod_torneio

  return {
    nome_modalidade: dados.nome_modalidade,
    desc_modalidade: dados.desc_modalidade,
    tempojogemminutos_modalidade: dados.tempojogemminutos_modalidade,
    localdojogo_modalidade: dados.localdojogo_modalidade,
    foto_modalidade: dados.foto_modalidade,
    id_torneio: String(torneio),
  }
}

async function buscarModalidades() {
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Não foi possível buscar as modalidades.')

  const dados = await resposta.json()
  modalidades.splice(0, modalidades.length, ...dados.map(prepararModalidade))
}

async function salvarModalidade(dados) {
  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosDaModalidade(dados)),
  })
  if (!resposta.ok) throw new Error('Não foi possível salvar a modalidade.')

  const modalidade = prepararModalidade(await resposta.json())
  modalidades.push(modalidade)
  return modalidade
}

async function editarModalidade(id, dados) {
  const indice = modalidades.findIndex((modalidade) => String(modalidade.cod_modalidade) === String(id))
  const resposta = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosDaModalidade(dados, modalidades[indice])),
  })
  if (!resposta.ok) throw new Error('Não foi possível editar a modalidade.')

  if (indice !== -1) modalidades[indice] = prepararModalidade(await resposta.json())
}

async function apagarModalidade(id) {
  const resposta = await fetch(`${url}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Não foi possível excluir a modalidade.')

  const indice = modalidades.findIndex((modalidade) => String(modalidade.cod_modalidade) === String(id))
  if (indice !== -1) modalidades.splice(indice, 1)
}

export { buscarModalidades, salvarModalidade, editarModalidade, apagarModalidade }
