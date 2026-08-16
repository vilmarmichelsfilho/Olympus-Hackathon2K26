import { times } from '@/data/times'

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

export{adicionarTimes}