<script setup>
const props = defineProps(['nome', 'imagem', 'id']);
defineEmits(['mostrar']);
</script>
<template>
  <li @click.prevent="$emit('mostrar', props.id)">
    <div class="card-content">
      <h3 class="modalidade-titulo">{{ props.nome }}</h3>
      <img class="modalidade-img" :src="props.imagem" :alt="props.nome">
    </div>
  </li>
</template>
<style scoped>
li {
  cursor: pointer;
}

.modalidade-img {
  object-fit: cover;
  width: 42vw;
  height: 48vw;
  z-index: 1;
  border-radius: 20px;
}

.modalidade-titulo {
  position: absolute;
  font-size: 8vw;
  margin: 3vw 4vw;
  z-index: 2;
  color: transparent;
  -webkit-text-stroke: 1px white;
}

@media (min-width: 1000px) {
  .modalidade-img {
    width: 25vw;
    height: 30vw;
  }

  .modalidade-titulo {
    font-size: 4vw;
    margin: 2vw 2vw;
  }
}
</style>
