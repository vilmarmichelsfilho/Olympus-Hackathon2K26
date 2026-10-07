<script setup>
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline'
import { ref, watch } from 'vue'
const emit = defineEmits(['fechar', 'adicionar', 'proximo'])
const props = defineProps(['dadosIniciais'])
const nome = ref('')
const dataInicio = ref('2026-09-21')
const dataFim = ref('2026-09-25')
const status = ref('Planejado')

watch(
  () => props.dadosIniciais,
  (dados) => {
    if (!dados) return
    nome.value = dados.nome
    dataInicio.value = dados.dataInicio
    dataFim.value = dados.dataFim
    status.value = dados.status
  },
  { immediate: true },
)

function salvar() {
  if (!nome.value.trim() || !dataInicio.value || !dataFim.value) return
  if (dataFim.value < dataInicio.value) {
    alert('A data final não pode ser anterior à data inicial.')
    return
  }

  emit('adicionar', {
    nome: nome.value.trim(),
    dataInicio: dataInicio.value,
    dataFim: dataFim.value,
    status: status.value,
  })
}
</script>

<template>
  <form action="">
    <div class="input">
      <h3>Nome do Torneio*</h3>
      <input type="text" placeholder="Nome do Torneio" v-model="nome" />
    </div>
    <div class="sla">
      <div class="input">
        <h3>Data Inicio*</h3>
        <input type="date" v-model="dataInicio" />
      </div>
      <div class="input">
        <h3>Data Fim*</h3>
        <input type="date" v-model="dataFim" />
      </div>
    </div>
    <div class="status">
      <select v-model="status">
        <option value="Planejado">Planejado</option>
        <option value="Ativo">Ativo</option>
        <option value="Finalizado">Finalizado</option>
      </select>
    </div>
    <div class="botoes">
      <div class="nav">
        <button class="voltar" type="button">Voltar</button>
        <button
          type="submit"
          class="salvar"
          v-on:click.prevent="salvar"
          :disabled="nome === '' || dataInicio === '' || dataFim === ''"
        >
          <ContentSaveOutlineIcon width="1.5vw"></ContentSaveOutlineIcon>Salvar Alterações
        </button>
      </div>
      <button type="reset" class="limpar" v-on:click.prevent="emit('fechar')">Cancelar</button>
    </div>
  </form>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

.botoes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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
  cursor: pointer;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  transition: 0.3s;
}
button:hover {
  text-decoration: underline;
}

.salvar {
  background: #6eac31;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
}

.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-width: 0;
  gap: 8px;
  transition: 0.3s;
}

.input h3 {
  font-size: 14px;
  line-height: 1.5;
}

input,
select {
  background: #e2e2e2;
  border: 1px solid #b9b9b9;
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
}

.sla {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.nav button {
  min-height: 44px;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
}

.voltar {
  border: 1px solid black;
  font-weight: 700;
}

.salvar svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.limpar {
  min-height: 44px;
  font-size: 14px;
}

button:hover,
input:focus,
select:focus {
  transform: none;
}

input:focus,
select:focus {
  border: 1px solid #de6d1c;
  outline: 2px solid #de6d1c;
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .sla {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 480px) {
  .nav {
    flex-direction: column;
  }

  .nav button {
    width: 100%;
  }
}
</style>
