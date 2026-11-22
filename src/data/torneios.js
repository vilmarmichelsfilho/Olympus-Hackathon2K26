import { reactive } from 'vue'

const url = 'http://localhost:3000/torneios'

export const torneios = reactive([])

function prepararTorneio(torneio) {
  const codigo = Number(torneio.id)
  return {
    ...torneio,
    cod_torneio: Number.isNaN(codigo) ? torneio.id : codigo,
    cod_adm: Number(torneio.id_adm),
  }
}

function dadosDoFormulario(dados) {
  return {
    nome_torneio: dados.nome || dados.nome_torneio,
    data_inicio_torneio: dados.dataInicio || dados.data_inicio_torneio,
    data_fim_torneio: dados.dataFim || dados.data_fim_torneio,
    status_torneio: dados.status || dados.status_torneio,
    id_adm: '1',
  }
}

async function buscarTorneios() {
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Não foi possível buscar os torneios.')

  const dados = await resposta.json()
  torneios.splice(0, torneios.length, ...dados.map(prepararTorneio))
}

async function salvarTorneio(dados) {
  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosDoFormulario(dados)),
  })
  if (!resposta.ok) throw new Error('Não foi possível salvar o torneio.')

  const torneio = prepararTorneio(await resposta.json())
  torneios.push(torneio)
  return torneio.cod_torneio
}

async function editarTorneio(id, dados) {
  const resposta = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosDoFormulario(dados)),
  })
  if (!resposta.ok) throw new Error('Não foi possível editar o torneio.')

  const torneioAtualizado = prepararTorneio(await resposta.json())
  const indice = torneios.findIndex((torneio) => String(torneio.cod_torneio) === String(id))
  if (indice !== -1) torneios[indice] = torneioAtualizado
}

async function apagarTorneio(id) {
  const resposta = await fetch(`${url}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Não foi possível excluir o torneio.')

  const indice = torneios.findIndex((torneio) => String(torneio.cod_torneio) === String(id))
  if (indice !== -1) torneios.splice(indice, 1)
}

export { buscarTorneios, salvarTorneio, editarTorneio, apagarTorneio }
