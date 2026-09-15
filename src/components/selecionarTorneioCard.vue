<script setup>
import KeyboardArrowRightIcon from '@iconify-vue/mdi/keyboard-arrow-right';
import { ref } from 'vue';
const props = defineProps(['torneio'])
const emit = defineEmits(['mandarCodtorneio'])
const anodotorneio = ref(props.torneio.data_inicio_torneio.split('-')[0].replaceAll('20', ''))
function mandarEmit(){
  emit('mandarCodtorneio', props.torneio.cod_torneio)
}
</script>
<template>
  <li>
    <div class="conteiner">
      <p class="ano">{{ anodotorneio }}</p>
<div class="content">
  <h4>{{ props.torneio.nome_torneio }}</h4>
  <p>{{ props.torneio.data_inicio_torneio }} a {{ props.torneio.data_fim_torneio }} . Status: {{ props.torneio.status_torneio }}</p>
</div>
    </div>
<div class="button">
  <button @click.prevent="mandarEmit()"><KeyboardArrowRightIcon class="icon"/></button>
</div>
  </li>
</template>
<style scoped>
li {
  display: flex;
  min-width: 90%;
  justify-content: space-between;
  align-items: center;
  background-color: #0E1D46;
  padding: 1vw;
  margin-bottom: 2vw;
  border-radius: 0.4vw;
}
.conteiner{
  display: flex;
  gap: 2vw;
  align-items: center;
}
p.ano{
  color: white;
  background-color: #E85002;
  padding: 0.5vw 0.6vw;
  border-radius: 100vw;
  width: fit-content;
}
button{
  border: none;
  background-color: white;
  padding: 0.25vw 0.3vw;
  border-radius: 100vw;
}
h4{
  color: white;
}
p{
  color: #afafaf;;
}
.icon {
  height: 5em;
  width: fit-content;
  color: #E85002;
}
</style>
