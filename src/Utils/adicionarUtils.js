import { normalizarId } from '@/services/api'
import { times } from '@/data/times'
import { modalidades } from '@/data/modalidades'
import {arbitros} from '@/data/arbitros';
import { torneios } from '@/data/torneios';
import { criarTurma } from '@/services/turmasApi'
import { criarEntidade } from '@/services/entidadesApi'
import { iniciarRascunho } from '@/services/torneioDraft'

const timesApresentacao = [
    { nome: 'Azul', cor: '#2563EB', escudo: '/images/escudos/azul.svg' },
    { nome: 'Verde', cor: '#16A34A', escudo: '/images/escudos/verde.svg' },
    { nome: 'Amarelo', cor: '#EAB308', escudo: '/images/escudos/amarelo.svg' },
    { nome: 'Vermelho', cor: '#DC2626', escudo: '/images/escudos/vermelho.svg' },
    { nome: 'Roxo', cor: '#7E22CE', escudo: '/images/escudos/roxo.svg' },
    { nome: 'Laranja', cor: '#EA580C', escudo: '/images/escudos/laranja.svg' },
    { nome: 'Branco', cor: '#E5E7EB', escudo: '/images/escudos/branco.svg' },
    { nome: 'Ciano', cor: '#06B6D4', escudo: '/images/escudos/ciano.svg' },
]

const turmasApresentacao = [
    [['Informática', 1], ['Agropecuária', 1], ['Química', 1]],
    [['Informática', 2], ['Agropecuária', 2], ['Química', 2]],
    [['Informática', 3], ['Agropecuária', 3], ['Química', 3]],
    [['Agropecuária', 1], ['Química', 1], ['Informática', 1]],
    [['Agropecuária', 2], ['Química', 2], ['Informática', 2]],
    [['Agropecuária', 3], ['Química', 3], ['Informática', 3]],
    [['Química', 1], ['Informática', 1], ['Agropecuária', 1]],
    [['Química', 2], ['Informática', 2], ['Agropecuária', 2]],
]

const modalidadesApresentacao = [
    {
        nome: 'Futsal',
        descricao: 'Competição de futsal',
        imagem: '/images/imagem-modalidades/futsal-v2.png',
        tempo: 40,
        local: 'Quadra B',
    },
    {
        nome: 'Voleibol',
        descricao: 'Competição de voleibol',
        imagem: '/images/imagem-modalidades/volei-v2.png',
        tempo: 60,
        local: 'Quadra A',
    },
    {
        nome: 'Basquete',
        descricao: 'Competição de basquete',
        imagem: '/images/imagem-modalidades/basquete-v2.png',
        tempo: 50,
        local: 'Quadra C',
    },
    {
        nome: 'Valorant',
        descricao: 'Competição de Valorant',
        imagem: '/images/imagem-modalidades/valorant-v2.png',
        tempo: 60,
        local: 'Sala E-Sports',
    },
    {
        nome: 'Xadrez',
        descricao: 'Competição de xadrez',
        imagem: '/images/imagem-modalidades/xadrez-v2.png',
        tempo: 30,
        local: 'Biblioteca',
    },
    {
        nome: 'Queimada',
        descricao: 'Competição de queimada',
        imagem: '/images/imagem-modalidades/queimada-v2.png',
        tempo: 40,
        local: 'Ginásio',
    },
]

const arbitrosApresentacao = [
    'André Santos',
    'Bruna Martins',
    'Diego Oliveira',
    'Fernanda Costa',
]

async function adicionarDadosApresentacao(idTorneio) {
    if (times.some(item => normalizarId(item.id_torneio) === normalizarId(idTorneio))) return

    for (const modelo of modalidadesApresentacao) {
        await criarEntidade('modalidades', {
            id_torneio: idTorneio,
            nome_modalidade: modelo.nome,
            desc_modalidade: modelo.descricao,
            tempojogemminutos_modalidade: modelo.tempo,
            localdojogo_modalidade: modelo.local,
            foto_modalidade: modelo.imagem,
        }, modalidades)
    }

    for (const [indice, nome] of arbitrosApresentacao.entries()) {
        await criarEntidade('arbitros', {
            id_torneio: idTorneio,
            nome_arbitro: nome,
            login_arbitro: `arbitro${idTorneio}${indice + 1}`,
            senha_arbitro: '123456',
        }, arbitros)
    }

    for (const [indice, modelo] of timesApresentacao.entries()) {
        const timeSalvo = await criarEntidade('times', {
            id_torneio: idTorneio,
            id_adm: 1,
            cor_time: modelo.cor,
            pontuacaogeral_time: 0,
            escudo_time: modelo.escudo,
            nome_time: modelo.nome,
        }, times)

        for (const [ano, [tecnico, serie]] of turmasApresentacao[indice].entries()) {
            await criarTurma({
                id_torneio: idTorneio,
                id_time: timeSalvo.id_time,
                tecnico_turma: tecnico,
                ano_turma: ano + 1,
                numero_turma: serie,
                nome_turma: `${ano + 1}${tecnico}${serie}`,
            })
        }
    }
}

async function adicionarTimes(nome, cor, imagem, id_torneio) {
    const timesDoTorneio = times.filter(item => item.id_torneio === id_torneio)
    if (timesDoTorneio.length >= 8) {
        alert('O torneio pode ter no máximo 8 times.')
        return false
    }
    if (timesDoTorneio.some(item => item.nome_time.trim().toLowerCase() === nome.trim().toLowerCase())) {
        alert('Já existe um time com este nome neste torneio!')
        return false
    }
    await criarEntidade('times', {
        id_torneio: id_torneio,
        id_adm: 1,
        escudo_time: imagem,
        nome_time: nome,
        cor_time: cor,
        pontuacaogeral_time: 0,
    }, times)
    return true
}
async function adicionarModalidade(nome, desc, imagem, tempo, local, torneio) {
    return criarEntidade('modalidades', {
        id_torneio: torneio,
        foto_modalidade: imagem,
        nome_modalidade: nome,
        desc_modalidade: desc,
        tempojogemminutos_modalidade: tempo,
        localdojogo_modalidade: local,
    }, modalidades)
}
async function adicionarArbitro(nome, login, senha, torneio){
    return criarEntidade('arbitros', {
        id_torneio: torneio,
        nome_arbitro: nome,
        login_arbitro: login,
        senha_arbitro: senha,
    }, arbitros)
}
async function salvarTorneio(dadosDoFormulario) {
  iniciarRascunho()
  const salvo = await criarEntidade('torneios', {
    nome_torneio: dadosDoFormulario.nome,
    data_inicio_torneio: dadosDoFormulario.dataInicio,
    data_fim_torneio: dadosDoFormulario.dataFim,
    status_torneio: dadosDoFormulario.status,
    id_adm: 1,
  }, torneios)
  return salvo.id_torneio
}
export{adicionarTimes, adicionarModalidade, adicionarArbitro, adicionarDadosApresentacao, salvarTorneio}


