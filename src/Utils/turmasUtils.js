import { turmas } from "@/data/turmas";
import { codTorneioSelecionadoAdm } from "./cod_torneioAdmUtils";

function excluir(id) {
    const index = turmas.findIndex(item => item.cod_turma === id);
    turmas.splice(index,1);
}

function adicionar(tecnico, ano, serie, time, torneio) {
    if (turmas.some(item => item.nome_turma == ano+tecnico+serie) ) {
            alert('Esta turma ja existe!')
    } else {
        if (turmas.filter(item => item.cod_time == time && item.cod_torneio == torneio).length >= 3) {
            alert('So pode ter 3 turmas associadas 1 um time')
        } else {
            if (turmas.some(item => item.ano_turma == ano && item.cod_time == time && item.cod_torneio == torneio)) {
                alert('Já tem uma turma do mesmo ano cadastrada neste time')
            } else {
                const maiorId = Math.max(...turmas.map(item => item.cod_turma));
                turmas.push({
                cod_turma: maiorId,
                cod_time: time,
                cod_torneio: torneio,
                tecnico_turma: tecnico,
                ano_turma: ano,
                numero_turma: serie,
                nome_turma: ano+tecnico+serie
            })
            }
        }
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
