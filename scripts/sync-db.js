import { writeFile } from 'node:fs/promises'

// Fonte dos dados demonstrativos: as mesmas coleções usadas pelo frontend.
const chaves = {
  administradores: 'cod_adm',
  arbitros: 'cod_arbitro',
  jogos: 'cod_jogo',
  modalidades: 'cod_modalidade',
  noticias: 'id',
  participa: null,
  times: 'cod_time',
  torneios: 'cod_torneio',
  turmas: 'cod_turma',
}

const db = {}
for (const [colecao, chave] of Object.entries(chaves)) {
  const modulo = await import(`../src/data/${colecao}.js`)
  db[colecao] = modulo[colecao].map((registro, indice) => {
    const normalizado = Object.fromEntries(Object.entries(registro)
      .filter(([campo]) => campo !== chave)
      .map(([campo, valor]) => [
      campo.replace(/^cod_/, 'id_'),
      valor !== null && (campo.startsWith('cod_') || campo.startsWith('origem_jogo_'))
        ? String(valor)
        : valor,
    ]))
    // O código primário vira id; códigos de outras entidades continuam como referências.
    return {
      id: String(chave ? registro[chave] : indice + 1),
      ...normalizado,
    }
  })
}

// Não gerar uma base com jogos fora das datas cadastradas para o torneio.
for (const jogo of db.jogos) {
  const modalidade = db.modalidades.find((item) => item.id === jogo.id_modalidade)
  const torneio = db.torneios.find((item) => item.id === modalidade?.id_torneio)
  const data = jogo.horario_jogo.split(' ')[0]
  if (!torneio || data < torneio.data_inicio_torneio || data > torneio.data_fim_torneio) {
    throw new Error(`Jogo ${jogo.id} fora do período do torneio`)
  }
}

for (const [colecao, registros] of Object.entries(db)) {
  if (registros.some((registro) => registro.id === 'undefined') ||
      new Set(registros.map((registro) => registro.id)).size !== registros.length) {
    throw new Error(`IDs inválidos em ${colecao}`)
  }
  const chave = chaves[colecao]
  if (chave && chave !== 'id' && registros.some((registro) => chave.replace(/^cod_/, 'id_') in registro)) {
    throw new Error(`Código primário duplicado em ${colecao}`)
  }
}

const referencias = {
  id_adm: 'administradores',
  id_arbitro: 'arbitros',
  id_jogo: 'jogos',
  id_modalidade: 'modalidades',
  id_time: 'times',
  id_torneio: 'torneios',
  id_turma: 'turmas',
  origem_jogo_a: 'jogos',
  origem_jogo_b: 'jogos',
}
for (const [colecao, registros] of Object.entries(db)) {
  for (const registro of registros) {
    for (const [campo, destino] of Object.entries(referencias)) {
      if (registro[campo] != null && !db[destino].some((item) => item.id === registro[campo])) {
        throw new Error(`Referência inválida: ${colecao}/${registro.id}, ${campo}`)
      }
    }
  }
}

await writeFile(new URL('../db.json', import.meta.url), `${JSON.stringify(db, null, 2)}\n`)
console.log('db.json sincronizado com os dados e datas do frontend.')
