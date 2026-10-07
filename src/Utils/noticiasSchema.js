import { dataUrlImagemValida } from './noticiasImagemUtils.js'

export const LIMITES_NOTICIA = {
  titulo: [5, 120],
  resumo: [10, 300],
  conteudo: [30, 20000],
}

export function validarCamposNoticia(campos) {
  const erros = {}
  const nomes = { titulo: 'O título', resumo: 'O resumo', conteudo: 'O conteúdo' }
  for (const [campo, [min, max]] of Object.entries(LIMITES_NOTICIA)) {
    const texto = typeof campos[campo] === 'string' ? campos[campo].trim() : ''
    if (texto.length < min || texto.length > max) {
      erros[campo] =
        `${nomes[campo]} deve ter entre ${min} e ${max.toLocaleString('pt-BR')} caracteres.`
    }
  }
  if (!Number.isSafeInteger(campos.cod_torneio) || campos.cod_torneio <= 0) {
    erros.cod_torneio = 'Selecione um torneio válido.'
  }
  if (campos.imagem != null) {
    const assetLocal =
      typeof campos.imagem === 'string' &&
      /^\/images\/[A-Za-z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/.test(campos.imagem)
    if (!assetLocal && !dataUrlImagemValida(campos.imagem)) {
      erros.imagem = 'Escolha uma imagem JPEG, PNG ou WebP válida de até 1 MiB.'
    }
    if (
      typeof campos.imagemAlt !== 'string' ||
      !campos.imagemAlt.trim() ||
      campos.imagemAlt.trim().length > 200
    ) {
      erros.imagemAlt = 'Descreva a imagem em até 200 caracteres.'
    }
  }
  return erros
}

export function registroNoticiaValido(noticia) {
  return (
    noticia &&
    typeof noticia === 'object' &&
    Number.isSafeInteger(noticia.id) &&
    noticia.id > 0 &&
    Object.keys(validarCamposNoticia(noticia)).length === 0 &&
    typeof noticia.autor === 'string' &&
    noticia.autor.trim().length > 0 &&
    noticia.autor.length <= 200 &&
    typeof noticia.data_publicacao === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(
      noticia.data_publicacao,
    ) &&
    Number.isFinite(Date.parse(noticia.data_publicacao)) &&
    typeof noticia.demonstrativa === 'boolean' &&
    (noticia.imagem === null || typeof noticia.imagem === 'string') &&
    typeof noticia.imagemAlt === 'string' &&
    (noticia.imagem !== null || noticia.imagemAlt === '')
  )
}

export function normalizarIdNoticia(id) {
  if (!/^\d+$/.test(String(id))) return null
  const numero = Number(id)
  return Number.isSafeInteger(numero) && numero > 0 ? numero : null
}

export function formatarDataNoticia(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(data))
}
