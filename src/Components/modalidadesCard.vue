<script setup>
const props = defineProps(['nome', 'imagem', 'id']);
defineEmits(['selecionar'])
</script>
<template>
  <li @click.prevent="$emit('selecionar', props.id)">
    <div class="card-content">
      <h3 class="modalidade-titulo">{{ props.nome }}</h3>
      <img class="modalidade-img" :src="props.imagem" :alt="props.nome">
    </div>
  </li>
</template>
<style scoped>
li{
cursor: pointer;
}
li.card-content{
  width: 40vw;
  height: 25vh;
}
.modalidade-img{
  object-fit: cover;
  width: 42vw;
  height: 48vw;
  z-index: 1;
  border-radius: 20px;
}
.modalidade-titulo{
  position: absolute;
  font-size: 3rem;
  margin: 3vw 4vw;
  z-index: 2;
  color: transparent;
  -webkit-text-stroke: 1px white;
}
</style>
