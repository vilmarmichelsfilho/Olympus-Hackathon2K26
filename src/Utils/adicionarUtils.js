import { times } from '@/data/times'
import { modalidades } from '@/data/modalidades'
import {arbitros} from '@/data/arbitros';
import { torneios } from '@/data/torneios';
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
export{adicionarTimes, adicionarModalidade, adicionarArbitro,salvarTorneio}
