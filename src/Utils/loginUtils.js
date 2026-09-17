import { administradores } from '@/data/administradores'
import { arbitros } from '@/data/arbitros'

const CHAVE_SESSAO = 'sessaoOlympus'

function salvarSessao(sessao) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
  localStorage.setItem('logado', 'true')
}

function obterSessao() {
  const sessaoSalva = localStorage.getItem(CHAVE_SESSAO)

  if (!sessaoSalva) return null

  try {
    return JSON.parse(sessaoSalva)
  } catch {
    encerrarSessao()
    return null
  }
}

function logar(usuario, senha) {
  const loginInformado = usuario.trim().toLowerCase()
  const administrador = administradores.find(
    (item) => item.login_adm.toLowerCase() === loginInformado,
  )
  const arbitro = arbitros.find((item) => item.login_arbitro.toLowerCase() === loginInformado)
  const conta = administrador ?? arbitro

  if (!conta) {
    alert('Este usuário não existe.')
    return null
  }

  const senhaCorreta = administrador
    ? administrador.senha_adm === senha
    : arbitro.senha_arbitro === senha

  if (!senhaCorreta) {
    alert('Senha incorreta.')
    return null
  }

  const sessao = administrador
    ? {
        codigo: administrador.cod_adm,
        nome: administrador.nome_adm,
        tipo: 'administrador',
      }
    : {
        codigo: arbitro.cod_arbitro,
        codTorneio: arbitro.cod_torneio,
        nome: arbitro.nome_arbitro,
        tipo: 'arbitro',
      }

  salvarSessao(sessao)
  return sessao
}

function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO)
  localStorage.setItem('logado', 'false')
}

function rotaDaSessao(sessao) {
  return sessao?.tipo === 'arbitro' ? '/arbitro' : '/administradores'
}

export { encerrarSessao, logar, obterSessao, rotaDaSessao }
