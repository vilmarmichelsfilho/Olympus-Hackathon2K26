import { turmas } from "@/data/turmas";
import { computed } from "vue";
import { id } from "vuetify/locale";

function excluir(id) {
    const index = turmas.findIndex(item => item.id === id);
    turmas.splice(index,1);
}

function adicionar(nome,ano) {
    if (turmas.some(item => item.nome === nome)) {
        alert('Está turma já existe!')
    } else {
        const maiorId = Math.max(...turmas.map(item => item.id));
        turmas.push({
            id: maiorId+1,
            nome: nome,
            ano: ano,
        })
    }
}

function editar(id,nome,ano) {
    if (turmas.some(item => item.nome === nome)) {
        alert('Está turma já existe!')
    } else {
        const index = turmas.findIndex(item => item.id === id);
        turmas[index].nome = nome
        turmas[index].ano = ano
    }
}

export{excluir,adicionar,editar}