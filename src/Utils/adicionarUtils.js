import { times } from '@/data/times'
import { modalidades } from '@/data/modalidades'
import {arbitros} from '@/data/arbitros';
import { torneios } from '@/data/torneios';
import { turmas } from '@/data/turmas';

const timesApresentacao = [
    { nome: 'Azul', cor: '#2563EB', escudo: '/images/escudos/azul.svg' },
    { nome: 'Verde', cor: '#16A34A', escudo: '/images/escudos/verde.svg' },
    { nome: 'Amarelo', cor: '#EAB308', escudo: '/images/escudos/amarelo.svg' },
    { nome: 'Vermelho', cor: '#DC2626', escudo: '/images/escudos/vermelho.svg' },
    { nome: 'Roxo', cor: '#7E22CE', escudo: '/images/escudos/roxo.svg' },
    { nome: 'Laranja', cor: '#EA580C', escudo: '/images/escudos/laranja.svg' },
    { nome: 'Branco', cor: '#E5E7EB', escudo: '/images/escudos/branco.svg' },
]

const turmasApresentacao = [
    [['Informática', 1], ['Agropecuária', 1], ['Química', 1]],
    [['Informática', 2], ['Agropecuária', 2], ['Química', 2]],
    [['Informática', 3], ['Agropecuária', 3], ['Química', 3]],
    [['Agropecuária', 1], ['Química', 1], ['Informática', 1]],
    [['Agropecuária', 2], ['Química', 2], ['Informática', 2]],
    [['Agropecuária', 3], ['Química', 3], ['Informática', 3]],
    [['Química', 1], ['Informática', 1], ['Agropecuária', 1]],
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

function adicionarDadosApresentacao(codTorneio) {
    if (times.some(item => item.cod_torneio === codTorneio)) return

    let proximoTime = times.length ? Math.max(...times.map(item => item.cod_time)) + 1 : 1
    let proximaTurma = turmas.length ? Math.max(...turmas.map(item => item.cod_turma)) + 1 : 1
    let proximaModalidade = modalidades.length
        ? Math.max(...modalidades.map(item => item.cod_modalidade)) + 1
        : 1
    let proximoArbitro = arbitros.length
        ? Math.max(...arbitros.map(item => item.cod_arbitro)) + 1
        : 1

    modalidadesApresentacao.forEach((modelo) => {
        modalidades.push({
            cod_modalidade: proximaModalidade++,
            cod_torneio: codTorneio,
            nome_modalidade: modelo.nome,
            desc_modalidade: modelo.descricao,
            tempojogemminutos_modalidade: modelo.tempo,
            localdojogo_modalidade: modelo.local,
            foto_modalidade: modelo.imagem,
        })
    })

    arbitrosApresentacao.forEach((nome, indice) => {
        arbitros.push({
            cod_arbitro: proximoArbitro++,
            cod_torneio: codTorneio,
            nome_arbitro: nome,
            login_arbitro: `arbitro${codTorneio}${indice + 1}`,
            senha_arbitro: '123456',
        })
    })

    timesApresentacao.forEach((modelo, indice) => {
        const codTime = proximoTime++

        times.push({
            cod_time: codTime,
            cod_torneio: codTorneio,
            cod_adm: 1,
            cor_time: modelo.cor,
            pontuacaogeral_time: 0,
            escudo_time: modelo.escudo,
            nome_time: modelo.nome,
        })

        turmasApresentacao[indice].forEach(([tecnico, serie], ano) => {
            turmas.push({
                cod_turma: proximaTurma++,
                cod_torneio: codTorneio,
                cod_time: codTime,
                tecnico_turma: tecnico,
                ano_turma: ano + 1,
                numero_turma: serie,
                nome_turma: `${ano + 1}${tecnico}${serie}`,
            })
        })
    })
}

function adicionarTimes(nome, cor, imagem, cod_torneio) {
    const timesDoTorneio = times.filter(item => item.cod_torneio === cod_torneio)
    if (timesDoTorneio.length >= 8) {
        alert('O torneio pode ter no máximo 8 times.')
        return false
    }
    if (timesDoTorneio.some(item => item.nome_time.trim().toLowerCase() === nome.trim().toLowerCase())) {
        alert('Já existe um time com este nome neste torneio!')
        return false
    }
    const maiorId = times.length
        ? Math.max(...times.map(item => item.cod_time))
        : 0;
    times.push({
        cod_time: maiorId + 1,
        escudo_time: imagem,
        nome_time: nome,
        cor_time: cor,
        pontuacaogeral_time: 0,
        cod_torneio: cod_torneio,
    })
    return true
}
function adicionarModalidade(nome, desc, imagem, tempo, local, torneio) {
    const maiorId = modalidades.length ? Math.max(...modalidades.map(item => item.cod_modalidade)) : 0;
    const novaModalidade = {
        cod_torneio: torneio,
        cod_modalidade: maiorId+1,
        foto_modalidade: imagem,
        nome_modalidade: nome,
        desc_modalidade: desc,
        tempojogemminutos_modalidade: tempo,
        localdojogo_modalidade: local,
    }
    modalidades.push(novaModalidade)
    return novaModalidade
}
function adicionarArbitro(nome, login, senha, torneio){
 const maiorId = arbitros.length ? Math.max(...arbitros.map(item => item.cod_arbitro)) : 0;
    arbitros.push({
        cod_torneio: torneio,
        cod_arbitro: maiorId+1,
        nome_arbitro: nome,
        login_arbitro: login,
        senha_arbitro: senha,
    })
}
function salvarTorneio(dadosDoFormulario) {
  const novoCodigo = torneios.length
    ? Math.max(...torneios.map(t => t.cod_torneio)) + 1
    : 1

  torneios.push({
    cod_torneio: novoCodigo,
    nome_torneio: dadosDoFormulario.nome,
    data_inicio_torneio: dadosDoFormulario.dataInicio,
    data_fim_torneio: dadosDoFormulario.dataFim,
    status_torneio: dadosDoFormulario.status,
    cod_adm: 1,
  })
  return novoCodigo
}
export{adicionarTimes, adicionarModalidade, adicionarArbitro, adicionarDadosApresentacao, salvarTorneio}
