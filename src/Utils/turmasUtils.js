import { turmas } from "@/data/turmas";
import { computed } from "vue";

function excluir(id) {
    const index = turmas.findIndex(item => item.id === id);
    turmas.splice(index,1);
}

function adicionar(nome) {
    if (turmas.some(item => item.nome === nome)) {
        alert('Está turma já existe!')
    } else {
        const maiorId = Math.max(...turmas.map(item => item.id));
        turmas.push({
            id: maiorId+1,
            nome: nome,
        })
    }
}

function editar(id,nome) {
    if (turmas.some(item => item.nome === nome)) {
        alert('Está turma já existe!')
    } else {
        const index = turmas.findIndex(item => item.id === id);
        turmas[index].nome = nome
    }
}

export{excluir,adicionar,editar}