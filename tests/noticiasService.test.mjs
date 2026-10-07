import assert from 'node:assert/strict'
import { test } from 'node:test'
import { reactive } from 'vue'
import { noticiasIniciais } from '../src/data/noticias.js'
import { criarNoticiasStore } from '../src/Utils/noticiasService.js'
import {
  formatarDataNoticia,
  normalizarIdNoticia,
  registroNoticiaValido,
} from '../src/Utils/noticiasSchema.js'

function contexto() {
  const noticias = reactive(noticiasIniciais.map((noticia) => ({ ...noticia })))
  let sessao = { codigo: 1, nome: 'Administrador de teste', tipo: 'administrador' }
  const torneios = [
    { cod_torneio: 1, cod_adm: 1 },
    { cod_torneio: 2, cod_adm: 2 },
  ]
  const criar = () =>
    criarNoticiasStore({
      noticias,
      obterSessao: () => sessao,
      obterTorneios: () => torneios,
      agora: () => new Date('2026-10-07T18:00:00Z'),
    })
  return {
    noticias,
    criar,
    torneios,
    definirSessao: (valor) => {
      sessao = valor
    },
  }
}
const campos = {
  titulo: ' Uma notícia nova ',
  resumo: ' Um resumo válido para a notícia. ',
  conteudo: ' Um conteúdo completo com informações suficientes para a publicação. ',
  cod_torneio: 1,
  imagem: null,
  imagemAlt: '',
  autor: 'Impostor',
  demonstrativa: true,
}

test('publica na coleção reativa compartilhada com autor e data da sessão', () => {
  const ctx = contexto()
  const snapshot = JSON.stringify(noticiasIniciais)
  const store = ctx.criar()
  assert.equal(store.ordenadas.value.length, 6)
  const nova = store.cadastrar(campos)
  assert.equal(nova.id, 7)
  assert.equal(nova.titulo, 'Uma notícia nova')
  assert.equal(nova.autor, 'Administrador de teste')
  assert.equal(nova.demonstrativa, false)
  assert.equal(nova.data_publicacao, '2026-10-07T18:00:00.000Z')
  assert.equal(ctx.noticias.length, 7)
  assert.equal(store.ordenadas.value[0].id, 7)
  assert.equal(ctx.criar().obterPorId('7').titulo, nova.titulo)
  assert.equal(JSON.stringify(noticiasIniciais), snapshot)
})

test('uma nova coleção começa com os exemplos, sem conservar publicações de outra execução', () => {
  const primeiro = contexto().criar()
  primeiro.cadastrar(campos)
  const reiniciado = contexto().criar()
  assert.equal(primeiro.noticias.length, 7)
  assert.equal(reiniciado.noticias.length, 6)
  assert.equal(reiniciado.obterPorId(7), undefined)
})

test('coleção vazia permanece vazia e ordenação não modifica a sequência original', () => {
  const ctx = contexto()
  const store = ctx.criar()
  const ids = ctx.noticias.map((noticia) => noticia.id)
  assert.equal(store.ordenadas.value[0].id, 6)
  assert.deepEqual(
    ctx.noticias.map((noticia) => noticia.id),
    ids,
  )
  ctx.noticias.splice(0)
  assert.equal(store.ordenadas.value.length, 0)
  assert.equal(store.cadastrar(campos).id, 1)
})

test('publicação exige perfil administrativo e propriedade atual do torneio', () => {
  const ctx = contexto()
  const store = ctx.criar()
  assert.throws(() => store.cadastrar({ ...campos, cod_torneio: 2 }), /próprios torneios/)
  assert.throws(() => store.cadastrar({ ...campos, cod_torneio: 999 }), /próprios torneios/)
  ctx.definirSessao({ codigo: 1, nome: 'Árbitro', tipo: 'arbitro' })
  assert.throws(() => store.cadastrar(campos), /sessão de administrador/)
  ctx.definirSessao(null)
  assert.throws(() => store.cadastrar(campos), /sessão de administrador/)
  assert.equal(ctx.noticias.length, 6)
})

test('revalida textos e propriedade sem acrescentar notícia quando falha', () => {
  const ctx = contexto()
  const store = ctx.criar()
  for (const alteracao of [{ titulo: ' ' }, { resumo: 'curto' }, { conteudo: 'x'.repeat(20001) }]) {
    assert.throws(() => store.cadastrar({ ...campos, ...alteracao }), /caracteres/)
  }
  ctx.torneios[0].cod_adm = 2
  assert.throws(() => store.cadastrar(campos), /próprios torneios/)
  assert.equal(ctx.noticias.length, 6)
})

test('publicações consecutivas compartilham IDs únicos e atualizam a leitura', () => {
  const ctx = contexto()
  const primeiro = ctx.criar()
  const segundo = ctx.criar()
  primeiro.cadastrar(campos)
  assert.equal(segundo.cadastrar(campos).id, 8)
  assert.equal(primeiro.ordenadas.value[0].id, 8)
  assert.equal(primeiro.obterPorId(8).titulo, 'Uma notícia nova')
})

test('preserva a imagem opcional e exige descrição para imagem presente', () => {
  const ctx = contexto()
  const store = ctx.criar()
  const imagem = '/images/imagem-modalidades/futsal-foto.jpg'
  assert.throws(() => store.cadastrar({ ...campos, imagem, imagemAlt: '' }), /Descreva/)
  assert.throws(
    () => store.cadastrar({ ...campos, imagem: 'javascript:alert(1)', imagemAlt: 'Teste' }),
    /imagem/,
  )
  const noticia = store.cadastrar({
    ...campos,
    imagem,
    imagemAlt: ' Imagem ilustrativa de futsal ',
  })
  assert.equal(noticia.imagem, imagem)
  assert.equal(noticia.imagemAlt, 'Imagem ilustrativa de futsal')
  assert.equal(store.cadastrar(campos).imagem, null)
})

test('consulta valida IDs e datas são exibidas no fuso do campus', () => {
  const store = contexto().criar()
  for (const id of ['abc', '1e0', '-1', '0', '1.1', '999', '9007199254740992'])
    assert.equal(store.obterPorId(id), undefined)
  assert.equal(normalizarIdNoticia('2'), 2)
  assert.equal(store.obterPorId('2').id, 2)
  assert.match(formatarDataNoticia('2026-10-07T01:00:00Z'), /6 de outubro de 2026/)
})

test('conteúdo HTML permanece texto e os exemplos atendem ao esquema', () => {
  const store = contexto().criar()
  const texto =
    '<script>alert("teste")</script> Texto de notícia que será apresentado como texto simples.'
  assert.equal(store.cadastrar({ ...campos, conteudo: texto }).conteudo, texto)
  assert(noticiasIniciais.every(registroNoticiaValido))
  assert.equal(new Set(noticiasIniciais.map((noticia) => noticia.id)).size, noticiasIniciais.length)
})
