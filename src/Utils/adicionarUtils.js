import { times } from '@/data/times'
import { modalidades } from '@/data/modalidades'
function adicionarTimes(nome, cor, imagem) {
    const maiorId = Math.max(...times.map(item => item.id));
    times.push({
        id: maiorId+1,
        escudo: imagem,
        nome: nome,
        cor: cor,
        pontuacao_geral: 0,
    })
}
function adicionarModalidade(nome, desc, imagem, tempo, local) {
    const maiorId = Math.max(...modalidades.map(item => item.cod_modalidade));
    modalidades.push({
        cod_modalidade: maiorId+1,
        foto_modalidade: imagem,
        nome_modalidade: nome,
        desc_modalidade: desc,
        tempojogemminutos_modalidade: tempo,
        localdojogo_modalidade: local
    })
}
export{adicionarTimes, adicionarModalidade}
