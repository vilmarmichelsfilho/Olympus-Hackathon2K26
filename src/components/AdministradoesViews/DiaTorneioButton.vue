<script setup>
import { computed } from 'vue'

const props = defineProps(['ativo', 'dia'])

defineEmits(['selecionar'])

const diaFormatado = computed(() => {
  const [, mes, dia] = props.dia.split('-')
  return `${dia}/${mes}`
})
</script>

<template>
  <button type="button" :class="{ ativo }" :aria-pressed="ativo" @click="$emit('selecionar', dia)">
    {{ diaFormatado }}
  </button>
</template>

<style scoped>
button {
  min-height: 36px;
  border: 1px solid #aeb9d0;
  border-radius: 4px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 650;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

button:hover {
  border-color: #e85002;
  background: rgb(255 255 255 / 6%);
  transform: translateY(-1px);
}

button:focus-visible {
  outline: 3px solid rgb(232 80 2 / 25%);
  outline-offset: 2px;
}

button.ativo {
  border-color: #e85002;
  background: #e85002;
  color: #fff;
}

@media (max-width: 768px) {
  button {
    min-height: 27px;
    border-color: #ed6b3c;
    background: #fff;
    color: #17171a;
    font-size: 0.8rem;
  }

  button:hover {
    background: #fff;
  }

  button.ativo {
    border-color: #e85002;
    background: #e85002;
    color: #fff;
  }
}
</style>
