<script setup>
import { onBeforeUnmount, ref } from 'vue'
import TorneioPopUp from './TorneioComponentes/TorneioPopUp.vue'
import ModalidadesPart from './TorneioComponentes/ModalidadesPart.vue'
import { adicionarDadosApresentacao, salvarTorneio } from '@/Utils/adicionarUtils.js'
import TimesPart from './TorneioComponentes/TimesPart.vue'
import TurmasPart from './TorneioComponentes/TurmasPart.vue'
import ArbitroPart from './TorneioComponentes/ArbitroPart.vue'
import { gerarJogos } from '@/Utils/gerarTorneioUtils.js'
import { apagarTorneio } from '@/Utils/exclusaoUtils.js'
import { torneios } from '@/data/torneios.js'
import '@/assets/torneioCadastro.css'

const emit = defineEmits(['fechar'])

const torneio = ref(0)

const etapa = ref(20)
const dadosTorneio = ref(null)
const finalizado = ref(false)

function aoAdicionarTorneio(dados) {
  dadosTorneio.value = dados
  if (torneio.value) {
    const registro = torneios.find((item) => item.cod_torneio === torneio.value)
    if (registro) {
      registro.nome_torneio = dados.nome
      registro.data_inicio_torneio = dados.dataInicio
      registro.data_fim_torneio = dados.dataFim
      registro.status_torneio = dados.status
    }
  } else {
    torneio.value = salvarTorneio(dados)
    adicionarDadosApresentacao(torneio.value)
  }
  etapa.value = etapa.value + 20
}

function cancelar() {
  if (torneio.value && !finalizado.value) apagarTorneio(torneio.value)
  torneio.value = 0
  emit('fechar')
}

function finalizar() {
  const resultado = gerarJogos(torneio.value)
  if (!resultado.valido) {
    alert(resultado.mensagem)
    return
  }

  finalizado.value = true
  alert(`${resultado.quantidadeJogos} jogos foram gerados com sucesso.`)
  emit('fechar')
}

onBeforeUnmount(() => {
  if (torneio.value && !finalizado.value) apagarTorneio(torneio.value)
})
</script>

<template>
  <div class="display">
    <div class="dialog" role="dialog" aria-modal="true" aria-label="Cadastro de torneio">
      <button class="fechar" type="button" aria-label="Cancelar cadastro" @click="cancelar">
        ×
      </button>
      <div class="texto">
        <h2 v-show="etapa === 20">Criar Torneio</h2>
        <h2 v-show="etapa === 40">Cadastrar Modalidades</h2>
        <h2 v-show="etapa === 60">Cadastrar Times</h2>
        <h2 v-show="etapa === 80">Cadastrar Turmas</h2>
        <h2 v-show="etapa === 100">Cadastrar Árbitros</h2>
        <p>
          Etapa {{ etapa / 20 }} de 5 ·
          {{
            { 20: 'Dados gerais', 40: 'Modalidades', 60: 'Times', 80: 'Turmas', 100: 'Árbitros' }[
              etapa
            ]
          }}
        </p>
      </div>
      <div class="barra">
        <div class="progresso" :style="{ width: etapa + '%', transition: 'width 0.5s' }"></div>
        <ol>
          <li :style="{ color: etapa === 20 ? '#E85002' : '' }">Dados</li>
          <li :style="{ color: etapa === 40 ? '#E85002' : '' }">Modalidades</li>
          <li :style="{ color: etapa === 60 ? '#E85002' : '' }">Times</li>
          <li :style="{ color: etapa === 80 ? '#E85002' : '' }">Turmas</li>
          <li :style="{ color: etapa === 100 ? '#E85002' : '' }">Árbitros</li>
        </ol>
      </div>
      <TorneioPopUp
        v-show="etapa === 20"
        :dados-iniciais="dadosTorneio"
        @fechar="cancelar"
        @adicionar="aoAdicionarTorneio"
      ></TorneioPopUp>
      <ModalidadesPart
        v-if="etapa === 40"
        :torneio="torneio"
        @salvar="etapa = etapa + 20"
        @voltar="etapa = etapa - 20"
      ></ModalidadesPart>
      <TimesPart
        v-if="etapa === 60"
        :torneio="torneio"
        @salvar="etapa = etapa + 20"
        @voltar="etapa = etapa - 20"
      ></TimesPart>
      <TurmasPart
        v-if="etapa === 80"
        @voltar="etapa = etapa - 20"
        :torneio="torneio"
        @salvar="etapa = etapa + 20"
      ></TurmasPart>
      <ArbitroPart
        v-if="etapa == 100"
        :torneio="torneio"
        @voltar="etapa = etapa - 20"
        @salvar="finalizar"
      ></ArbitroPart>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.progresso {
  margin-bottom: 16px;
  height: 6px;
  width: 0%;
  border-radius: 1vw;
  background: #e85002;
  transition: width 0.5s ease;
}

ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 12px;
  padding: 0;
  list-style: none;
  counter-reset: etapa;
}

ol li {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: black;
  font-size: 11px;
  line-height: 1.5;
  transition: 0.3s;
}

ol li::before {
  counter-increment: etapa;
  content: counter(etapa);
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid currentColor;
  border-radius: 50%;
}

h2 {
  font-size: clamp(18px, 2.5vw, 24px);
  line-height: 1.4;
  margin: 0;
}

.texto {
  padding-right: 36px;
}

.texto p {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
  line-height: 1.6;
}

.dialog {
  position: relative;
  font-family: 'Krona One', sans-serif;
  font-weight: normal;
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(100%, 760px);
  min-width: 0;
  max-height: calc(100vh - 32px);
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  overscroll-behavior: contain;
  color: black;
  background: white;
  border: 1px solid #b9b8b8;
  padding: 32px;
  border-radius: 16px;
}

.fechar {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: #555;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
}

.display {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

@media (max-width: 600px) {
  .dialog {
    padding: 24px 20px;
    gap: 20px;
  }

  ol {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .dialog > :deep(.nav) {
    flex-wrap: wrap;
    gap: 12px;
  }

  .dialog > :deep(.nav button) {
    flex: 1 1 140px;
    min-height: 44px;
    justify-content: center;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .dialog {
    padding: 24px 16px;
  }

  ol {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
