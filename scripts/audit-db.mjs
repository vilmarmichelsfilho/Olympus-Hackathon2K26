import { readFile } from 'node:fs/promises'

const db = JSON.parse(await readFile(process.argv[2] || 'db.json', 'utf8'))
const erros = []
const mapas = {}
for (const [nome, itens] of Object.entries(db)) {
  if (!Array.isArray(itens)) continue
  mapas[nome] = new Map()
  for (const item of itens) {
    if (item.id == null || mapas[nome].has(String(item.id))) erros.push(`${nome}: ID ausente/repetido ${item.id}`)
    mapas[nome].set(String(item.id), item)
  }
  console.log(`${nome}: ${itens.length}`)
}
const referencias = {
  id_torneio: 'torneios', id_adm: 'administradores', id_time: 'times',
  id_modalidade: 'modalidades', id_arbitro: 'arbitros', id_jogo: 'jogos',
  origem_jogo_a: 'jogos', origem_jogo_b: 'jogos',
}
for (const [nome, itens] of Object.entries(db)) {
  if (!Array.isArray(itens)) continue
  for (const item of itens) {
    for (const [campo, destino] of Object.entries(referencias)) {
      if (item[campo] != null && !mapas[destino]?.has(String(item[campo]))) erros.push(`${nome}/${item.id}: ${campo} inválido (${item[campo]})`)
    }
  }
}
for (const jogo of db.jogos) {
  const modalidade = mapas.modalidades.get(String(jogo.id_modalidade))
  const torneio = mapas.torneios.get(String(modalidade?.id_torneio))
  const arbitro = mapas.arbitros.get(String(jogo.id_arbitro))
  const data = String(jogo.horario_jogo).slice(0, 10)
  if (torneio && (data < torneio.data_inicio_torneio || data > torneio.data_fim_torneio)) erros.push(`jogo ${jogo.id}: data fora do torneio`)
  if (modalidade && arbitro && String(modalidade.id_torneio) !== String(arbitro.id_torneio)) erros.push(`jogo ${jogo.id}: árbitro de outro torneio`)
  const participantes = db.participa.filter(p => String(p.id_jogo) === String(jogo.id))
  if (participantes.length !== 2 || new Set(participantes.map(p => p.posicao_participante)).size !== 2) erros.push(`jogo ${jogo.id}: participantes inconsistentes`)
  for (const participante of participantes) {
    const time = mapas.times.get(String(participante.id_time))
    if (time && modalidade && String(time.id_torneio) !== String(modalidade.id_torneio)) erros.push(`jogo ${jogo.id}: time de outro torneio`)
  }
}
for (const turma of db.turmas) {
  const time = mapas.times.get(String(turma.id_time))
  if (time && String(time.id_torneio) !== String(turma.id_torneio)) erros.push(`turma ${turma.id}: time de outro torneio`)
}
if (erros.length) {
  console.error(erros.join('\n'))
  process.exitCode = 1
} else console.log('PASS: JSON, IDs, referências, datas e participantes consistentes')
