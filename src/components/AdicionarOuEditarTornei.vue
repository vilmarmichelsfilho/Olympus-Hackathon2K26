<script setup>
import { onBeforeUnmount, ref, onMounted } from 'vue';
import TorneioPopUp from './TorneioComponentes/TorneioPopUp.vue';
import ModalidadesPart from './TorneioComponentes/ModalidadesPart.vue';
import { adicionarDadosApresentacao, salvarTorneio } from '@/Utils/adicionarUtils.js';
import TimesPart from './TorneioComponentes/TimesPart.vue';
import TurmasPart from './TorneioComponentes/TurmasPart.vue';
import ArbitroPart from './TorneioComponentes/ArbitroPart.vue';
import { gerarJogos } from '@/Utils/gerarTorneioUtils.js';
import { torneios, carregarTorneios } from '@/data/torneios.js';
import { modalidades, carregarModalidades } from '@/data/modalidades.js';
import { times, carregarTimes } from '@/data/times.js';
import { arbitros, carregarArbitrosDados } from '@/data/arbitros.js';
import { useJogos } from '@/composables/useJogos';
import { useParticipa } from '@/composables/useParticipa';
import { editarTorneio } from '@/Utils/editarUtils';
import { confirmarRascunho, descartarRascunho, removerRascunhoDasListas } from '@/services/torneioDraft';
const { jogos, carregarJogos } = useJogos();
const { participa, carregarParticipa } = useParticipa();
async function carregarDados() {
  await Promise.all([carregarJogos(), carregarParticipa()])
}
onMounted(carregarDados);
const emit = defineEmits(['fechar']);

const torneio = ref(0);

const etapa = ref(20);
const dadosTorneio = ref(null)
const finalizado = ref(false)
const salvando = ref(false)

async function aoAdicionarTorneio(dados) {
  if (salvando.value) return
  salvando.value = true
  try {
    dadosTorneio.value = dados
    if (torneio.value) {
      await editarTorneio(torneio.value, {
        nome_torneio: dados.nome,
        data_inicio_torneio: dados.dataInicio,
        data_fim_torneio: dados.dataFim,
        status_torneio: dados.status,
      })
    } else {
      torneio.value = await salvarTorneio(dados)
      await adicionarDadosApresentacao(torneio.value)
    }
    etapa.value += 20
  } catch (erro) {
    alert(erro.message)
  } finally {
    salvando.value = false
  }
}

function cancelar() {
  if (salvando.value) return
  if (torneio.value && !finalizado.value) {
    descartarRascunho()
    removerRascunhoDasListas(torneio.value, [modalidades, times, arbitros, torneios])
  }
  torneio.value = 0
  emit('fechar')
}

async function finalizar() {
  if (salvando.value || finalizado.value) return
  salvando.value = true
  try {
    const resultado = await gerarJogos(torneio.value, {
      torneios,
      jogos: jogos.value,
      modalidades,
      participa: participa.value,
      times,
      arbitros,
    })
    if (!resultado.valido) {
      alert(resultado.mensagem)
      return
    }

    await confirmarRascunho(resultado.novosJogos, resultado.novosParticipantes)
    finalizado.value = true
    const recarga = await Promise.allSettled([
      carregarJogos(), carregarParticipa(), carregarTorneios(),
      carregarModalidades(), carregarTimes(), carregarArbitrosDados(),
    ])
    const aviso = recarga.some(item => item.status === 'rejected')
      ? ' Recarregue a página para atualizar os dados exibidos.'
      : ''
    alert(`${resultado.quantidadeJogos} jogos foram gerados com sucesso.${aviso}`)
    emit('fechar')
  } catch (erro) {
    alert(`Não foi possível concluir o torneio: ${erro.message}`)
  } finally {
    salvando.value = false
  }
}

onBeforeUnmount(() => {
  if (torneio.value && !finalizado.value) {
    descartarRascunho()
    removerRascunhoDasListas(torneio.value, [modalidades, times, arbitros, torneios])
  }
})

</script>

<template>
    <div class="display">
        <div class="dialog" :aria-busy="salvando">
          <fieldset :disabled="salvando" style="display: contents">
            <button class="fechar" type="button" aria-label="Cancelar cadastro" @click="cancelar">×</button>
            <div class="texto">
                <h2 v-show="etapa===20">Criar Torneio</h2>
                <h2 v-show="etapa===40">Cadastrar Modalidades</h2>
                <h2 v-show="etapa===60">Cadastrar Times</h2>
                <h2 v-show="etapa===80">Cadastrar Turmas</h2>
                <h2 v-show="etapa===100">Cadastrar Árbitros</h2>
                <p>Etapa {{ etapa/20 }} de 5 · Dados gerais</p>
            </div>
            <div class="barra">
                <div class="progresso" :style="{ width: etapa+'%', transition: 'width 0.5s' }"></div>
                <ol>
                    <li :style="{color: etapa === 20 ? '#E85002' : ''}">Dados</li>
                    <li :style="{color: etapa === 40 ? '#E85002' : ''}">Modalides</li>
                    <li :style="{color: etapa === 60 ? '#E85002' : ''}">Times</li>
                    <li :style="{color: etapa === 80 ? '#E85002' : ''}">Turmas</li>
                    <li :style="{color: etapa === 100 ? '#E85002' : ''}">Árbitros</li>
                </ol>
            </div>
            <TorneioPopUp v-show="etapa===20" :dados-iniciais="dadosTorneio" @fechar="cancelar" @adicionar="aoAdicionarTorneio"></TorneioPopUp>
            <ModalidadesPart v-if="etapa===40" :torneio="torneio" @salvar="etapa=etapa+20" @voltar="etapa=etapa-20"></ModalidadesPart>
            <TimesPart v-if="etapa===60" :torneio="torneio" @salvar="etapa=etapa+20" @voltar="etapa=etapa-20"></TimesPart>
            <TurmasPart v-if="etapa===80" @voltar="etapa=etapa-20" :torneio="torneio" @salvar="etapa=etapa+20"></TurmasPart>
            <ArbitroPart v-if="etapa==100" :torneio="torneio" @voltar="etapa=etapa-20" @salvar="finalizar"></ArbitroPart>
          </fieldset>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.progresso {
    margin-bottom: 0.4vw;
    height: 0.5vw;
    width: 0%;
    border-radius: 1vw;
    background: #E85002;
    transition: width 0.5s ease;
}

ol {
    display: flex;
    justify-content: space-between;
}

ol li {
    color: black;
    transition: 0.3s;
    cursor: pointer;
}

h2 {
    font-size: 1.5vw;
    margin-right: 30vw;
}

.dialog {
    position: relative;
    font-family: "Krona One", sans-serif;
    font-weight: normal;
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
    color: black;
    background: white;
    border: solid rgb(185, 184, 184) 0.15vw;
    padding: 4vw 3vw;
    border-radius: 1vw;
}

.fechar {
    position: absolute;
    top: 1vw;
    right: 1.2vw;
    border: 0;
    background: transparent;
    color: #555;
    cursor: pointer;
    font-size: 2vw;
}

.display {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
</style>
