<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  imagem: { type: String, default: null },
  alt: { type: String, default: '' },
  ilustrativa: Boolean,
  destaque: Boolean,
})
const falhou = ref(false)
watch(
  () => props.imagem,
  () => {
    falhou.value = false
  },
)
</script>

<template>
  <figure
    v-if="imagem && !falhou"
    class="noticias-imagem"
    :class="{ 'noticias-imagem-destaque': destaque }"
  >
    <img :src="imagem" :alt="alt" :loading="destaque ? 'eager' : 'lazy'" @error="falhou = true" />
    <figcaption v-if="ilustrativa">Imagem ilustrativa</figcaption>
  </figure>
</template>
