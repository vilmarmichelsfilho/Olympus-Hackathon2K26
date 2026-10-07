<script setup>
const props = defineProps(['nome', 'imagem', 'id', 'posicao']);
defineEmits(['mostrar']);
</script>
<template>
  <li @click.prevent="$emit('mostrar', props.id)">
    <div class="card-content">
      <h3 class="modalidade-titulo">{{ props.nome }}</h3>
      <img
        class="modalidade-img"
        :src="props.imagem"
        :alt="props.nome"
        :style="{ objectPosition: props.posicao || 'center' }"
        loading="lazy"
        decoding="async"
      >
    </div>
  </li>
</template>
<style scoped>
li {
  cursor: pointer;
}
.card-content {
  position: relative;
  overflow: hidden;
  border-radius: 25px;
}
.card-content::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgb(0 0 0 / 70%), transparent 55%);
  pointer-events: none;
}

.modalidade-img {
  object-fit: cover;
  display: block;
  width: 42vw;
  height: 48vw;
  z-index: 1;
  border-radius: 25px;
}

.modalidade-titulo {
  position: absolute;
  font-size: 8vw;
  margin: 3vw 4vw;
  z-index: 2;
  color: white;
  max-width: calc(100% - 8vw);
  line-height: 1.15;
  font-weight: 700;
  text-shadow: 0 2px 8px rgb(0 0 0 / 50%);
}

@media (min-width: 1000px) {
  .modalidade-img {
    width: 25vw;
    height: 35vw;
  }

  .modalidade-titulo {
    font-size: 4vw;
    margin: 2vw 2vw;
    max-width: calc(100% - 4vw);
  }
}
</style>
