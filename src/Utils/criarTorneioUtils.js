import { modalidades } from "@/data/modalidades";
import { times } from "@/data/times";
import { torneios } from "@/data/torneios";
import { ref } from "vue";

function criarJogosViaTorneio(id_torneio) {

    const dataFim = new Date(torneios[torneios.findIndex(item => item.id_torneio == id_torneio)].data_fim_torneio);
    const dataInicio = new Date(torneios[torneios.findIndex(item => item.id_torneio == id_torneio)].data_inicio_torneio);

    const diferenca =  dataFim - dataInicio;
    const dias = diferenca / (1000 * 60 * 60 * 24);
    alert('Dias de Olímpiadas: '+dias);

    const totalJogos = ref(0) ;

    modalidades.forEach(modalidade => {
        if (modalidade.id_torneio == id_torneio) {
            alert('Modalidades: '+modalidade.nome_modalidade);
            let jogosPorModalidade = (times.filter(item => item.id_torneio == id_torneio).length) / 2;
            let totalJogosPorModalidade = ref(jogosPorModalidade)
            while (jogosPorModalidade.value > 1) {
                alert('Jogos por time: ' + totalJogosPorModalidade.value);
                totalJogosPorModalidade.value = totalJogosPorModalidade.value / 2;
                totalJogos.value = totalJogos.value + totalJogosPorModalidade.value;
            };
            alert('Jogos: '+ totalJogos.value);
        }
    });
}

export {criarJogosViaTorneio}
