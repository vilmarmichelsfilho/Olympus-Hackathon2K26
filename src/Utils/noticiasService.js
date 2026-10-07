import { computed, readonly } from 'vue'
import {
  normalizarIdNoticia,
  registroNoticiaValido,
  validarCamposNoticia,
} from './noticiasSchema.js'

// Usa a coleção reativa compartilhada, como os demais cadastros do projeto.
export function criarNoticiasStore({
  noticias,
  obterSessao,
  obterTorneios,
  agora = () => new Date(),
}) {
  function sessaoAdministrativa() {
    const sessao = obterSessao()
    if (
      sessao?.tipo !== 'administrador' ||
      !Number.isSafeInteger(sessao.codigo) ||
      typeof sessao.nome !== 'string' ||
      !sessao.nome.trim() ||
      sessao.nome.length > 200
    ) {
      throw new Error('Sua sessão de administrador expirou. Entre novamente para publicar.')
    }
    return sessao
  }

  function cadastrar(campos) {
    const sessao = sessaoAdministrativa()
    const torneio = obterTorneios().find((item) => item.cod_torneio === campos.cod_torneio)
    if (!torneio || torneio.cod_adm !== sessao.codigo) {
      throw new Error('Você só pode publicar notícias em seus próprios torneios.')
    }
    const erros = validarCamposNoticia(campos)
    if (Object.keys(erros).length) throw new Error(Object.values(erros)[0])
    const noticia = {
      id: noticias.reduce((max, item) => Math.max(max, item.id), 0) + 1,
      titulo: campos.titulo.trim(),
      resumo: campos.resumo.trim(),
      conteudo: campos.conteudo.trim(),
      imagem: campos.imagem ?? null,
      imagemAlt: campos.imagem ? campos.imagemAlt.trim() : '',
      autor: sessao.nome.trim(),
      data_publicacao: agora().toISOString(),
      cod_torneio: campos.cod_torneio,
      demonstrativa: false,
    }
    if (!registroNoticiaValido(noticia))
      throw new Error('Não foi possível gerar uma notícia válida.')
    noticias.push(noticia)
    return noticia
  }

  const ordenadas = computed(() =>
    [...noticias].sort(
      (a, b) => Date.parse(b.data_publicacao) - Date.parse(a.data_publicacao) || b.id - a.id,
    ),
  )
  return {
    noticias: readonly(noticias),
    ordenadas: readonly(ordenadas),
    obterPorId: (id) => noticias.find((noticia) => noticia.id === normalizarIdNoticia(id)),
    cadastrar,
  }
}
