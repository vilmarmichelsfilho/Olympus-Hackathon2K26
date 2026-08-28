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
function adicionarModalidade(nome, desc, imagem, tempo) {
    const maiorId = Math.max(...modalidades.map(item => item.id));
    modalidades.push({
        id: maiorId+1,
        image: imagem,
        nome: nome,
        desc: desc,
        tempo: Number(tempo),
    })
}
export{adicionarTimes, adicionarModalidade}
