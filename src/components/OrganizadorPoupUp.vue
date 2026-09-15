  <script setup>
  import { ref, computed } from 'vue'
  import TurmasView from './AdministradoesViews/TurmasView.vue'
  import DashboardModalidades from './DashboardModalidades.vue'
  import TimesView from './AdministradoesViews/TimesView.vue'
  import ArbitroView from './AdministradoesViews/ArbitroView.vue'
import DashboardTorneio from './DashboardTorneio.vue'


  const etapas = ['torneios', 'turma', 'time', 'modalidades','arbitro']
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
  function finalizarcadastro() {
    indiceAtual.value = 0
    emit('fechar')
  }
  </script>

  <template>
    <div v-if="etapaAtual" class="fluxo-cadastro">
      <DashboardTorneio v-if="etapaAtual === 'torneios'"/>
      <TurmasView v-if="etapaAtual === 'turma'"/>
      <TimesView v-if="etapaAtual === 'time'"/>
      <DashboardModalidades v-if="etapaAtual === 'modalidades'"/>
      <ArbitroView v-if="etapaAtual === 'arbitro'"/>
      <div class="botoes">
      <button @click="fecharFluxo">Fechar ×</button>
      <button @click="etapaAnterior" :disabled="indiceAtual === 0">← Voltar</button>
      <button @click="proximaEtapa" v-if="indiceAtual!==4">Próximo →</button>
      <button @click="finalizarcadastro" v-if="indiceAtual===4">Finalizar</button>
      </div>

    </div>
  </template>


  <style scoped>
  .fluxo-cadastro .botoes {
    display: flex;
    gap: 1vw;
    margin: 0VW 4VW;

  }
  .fluxo-cadastro .botoes button {
  background-color: transparent;
    border: 1PX solid white;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    font-size: 1.3vw;
  }



  </style>
