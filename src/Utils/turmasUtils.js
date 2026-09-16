import { turmas } from "@/data/turmas";
import { codTorneioSelecionadoAdm } from "./cod_torneioAdmUtils";

function excluir(id) {
    const index = turmas.findIndex(item => item.cod_turma === id);
    turmas.splice(index,1);
}

function adicionar(tecnico,ano, serie) {
    if (turmas.some(item => item.tecnico_turma == tecnico && item.ano_turma == ano && item.numero_turma == serie && item.cod_torneio == codTorneioSelecionadoAdm.value)) {
        alert('Esta turma ja existe!')
    } else {
        const maiorId = Math.max(...turmas.map(item => item.cod_turma));
        turmas.push({
            cod_turma: maiorId + 1,
            cod_time: 0,
            tecnico_turma: tecnico,
            ano_turma: ano,
            numero_turma: serie,
            cod_torneio: codTorneioSelecionadoAdm.value,
        })
    }
}

function editar(id,tecnico,ano, serie) {
    if (turmas.some(item => item.tecnico_turma == tecnico && item.ano_turma == ano && item.numero_turma == serie && item.cod_torneio == codTorneioSelecionadoAdm)) {
        alert('Esta turma ja existe!')
    } else {
        const index = turmas.findIndex(item => item.cod_turma === id);
        turmas[index].tecnico_turma = tecnico
        turmas[index].ano_turma = ano
        turmas[index].numero_turma = serie
    }
}

export{excluir,adicionar,editar}
