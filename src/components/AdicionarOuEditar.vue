<script setup>
import { ref } from 'vue'
import { times } from '@/data/times'
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline'
import { computed } from 'vue'
import { adicionar, editar } from '@/Utils/turmasUtils'
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
const emit = defineEmits(['fechar', 'adicionar'])
const props = defineProps(['torneio', 'tipo'])
const codTorneio = computed(() => props.torneio ?? codTorneioSelecionadoAdm.value)
const timesTorneio = computed(() => {
  return times.filter((item) => item.cod_torneio === codTorneio.value)
})

const tecnico = ref('Informática')
const ano = ref(1)
const serie = ref(1)
const time = ref()

function add() {
  if (props.tipo === 'adicionar') {
    const adicionado = adicionar(
      tecnico.value,
      ano.value,
      serie.value,
      time.value,
      codTorneio.value,
    )
    if (adicionado) emit('fechar')
  } else if (props.tipo === 'editar') {
    editar()
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="display">
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="turma-dialog-titulo">
        <h2 id="turma-dialog-titulo">Adicionar/Editar Turma</h2>
        <form @submit.prevent="add">
          <div class="input">
            <label for="tecnico">Técnico</label>
            <select name="tecnico" id="tecnico" placeholder="Técnico" v-model="tecnico">
              <option value="Informática">INFO</option>
              <option value="Agropecuária">AGRO</option>
              <option value="Química">QUIMI</option>
            </select>
          </div>
          <div class="sla">
            <div class="input">
              <label for="ano">Ano</label>
              <select name="ano" id="ano" placeholder="Ano" v-model="ano">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="input">
              <label for="serie">Série</label>
              <select name="serie" id="serie" placeholder="Serie" v-model="serie">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="input campo-time">
              <label for="time-turma">Time</label>
              <select name="time" id="time-turma" v-model="time">
                <option disabled :value="undefined">Selecione um time</option>
                <option :value="time.cod_time" v-for="time in timesTorneio" :key="time.cod_time">
                  {{ time.nome_time }}
                </option>
              </select>
            </div>
          </div>
          <div class="pre">
            <h4>Pré-visualização <span>Turma</span></h4>
            <p>{{ ano }}{{ tecnico }}{{ serie }}</p>
          </div>
          <div class="botoes">
            <button type="submit" class="salvar" :disabled="!tecnico || !serie || !ano || !time">
              <ContentSaveOutlineIcon aria-hidden="true"></ContentSaveOutlineIcon>Salvar Alterações
            </button>
            <button type="button" class="limpar" @click="emit('fechar')">Cancelar/Limpar</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.botoes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
button:disabled {
  background: grey;
  cursor: not-allowed;
}
button:disabled:hover {
  transform: scale(1);
  text-decoration: none;
}
button {
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  width: 100%;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  text-decoration: underline;
}

.salvar {
  background: #6eac31;
  color: white;
}

h4 {
  font-size: 12px;
  line-height: 1.5;
  color: #666;
}

h4 span {
  font-size: 11px;
  color: #de6d1c;
}

.pre {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e1e1e6;
  border-radius: 10px;
  background: #f8f8fa;
}

.pre p {
  text-align: center;
  font-family: 'Krona One', sans-serif;
  font-size: clamp(18px, 3.5vw, 24px);
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.sla {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
}

h2 {
  font-family: 'Krona One', sans-serif;
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.4;
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  gap: 8px;
  min-width: 0;
}

.input label {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
}

.input select {
  width: 100%;
  background: #e2e2e2;
  min-width: 0;
  min-height: 44px;
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  padding: 10px 12px;
  color: #252525;
  font-size: 16px;
  transition: 0.3s;
}

.input select:focus {
  outline: 2px solid #de6d1c;
  outline-offset: 2px;
}

.dialog {
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-weight: normal;
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(100%, 520px);
  min-width: 0;
  max-height: calc(100vh - 32px);
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  overscroll-behavior: contain;
  color: black;
  background: white;
  border: 1px solid #b9b8b8;
  padding: 24px;
  border-radius: 16px;
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
  z-index: 300;
}

.salvar svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

button:focus-visible {
  outline: 2px solid #de6d1c;
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .dialog {
    padding: 24px 20px;
  }

  .sla {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .campo-time {
    grid-column: 1 / -1;
  }
}

@media (max-width: 360px) {
  .dialog {
    padding: 20px 16px;
  }

  .sla {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
