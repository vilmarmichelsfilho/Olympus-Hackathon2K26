<script setup>
import { ref, computed } from 'vue'
import TurmasView from './AdministradoesViews/TurmasView.vue'
import DashboardModalidades from './DashboardModalidades.vue'
import TimesView from './AdministradoesViews/TimesView.vue'
import ArbitroView from './AdministradoesViews/ArbitroView.vue'
const etapas = ['torneio', 'turma', 'time', 'modalidades','arbitro']
const indiceAtual = ref(0)
const etapaAtual = computed(() => etapas[indiceAtual.value] ?? null)

const emit = defineEmits(['fechar'])

function proximaEtapa() {
  indiceAtual.value++
}

function fecharFluxo() {
  indiceAtual.value = 0
  emit('fechar')
}
function etapaAnterior() {
  if (indiceAtual.value > 0) {
    indiceAtual.value--
  }
}
</script>

<template>
  <div v-if="etapaAtual" class="fluxo-cadastro">

    <button @click="fecharFluxo">Fechar ×</button>
    <TurmasView v-if="etapaAtual === 'turma'"/>
     <TimesView v-if="etapaAtual === 'time'"/>
    <DashboardModalidades v-if="etapaAtual === 'modalidades'"/>
    <ArbitroView v-if="etapaAtual === 'arbitro'"/>
    <button @click="proximaEtapa">Próximo →</button>
    <button @click="etapaAnterior" :disabled="indiceAtual === 0">← Voltar</button>

  </div>
</template>


<style setup>




</style>
