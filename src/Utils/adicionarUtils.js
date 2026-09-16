import { times } from '@/data/times'
import { modalidades } from '@/data/modalidades'
import {arbitros} from '@/data/arbitros';
import { torneios } from '@/data/torneios';
function adicionarTimes(nome, cor, imagem, cod_torneio) {
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
}
function adicionarModalidade(nome, desc, imagem, tempo, local, torneio) {
    const maiorId = Math.max(...modalidades.map(item => item.cod_modalidade));
    modalidades.push({
        cod_torneio: torneio,
        cod_modalidade: maiorId+1,
        foto_modalidade: imagem,
        nome_modalidade: nome,
        desc_modalidade: desc,
        tempojogemminutos_modalidade: tempo,
        localdojogo_modalidade: local,
    })
}
function adicionarArbitro(nome, login, senha, torneio){
 const maiorId = Math.max(...arbitros.map(item => item.cod_arbitro));
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
}
export{adicionarTimes, adicionarModalidade, adicionarArbitro,salvarTorneio}
