<script setup>
import { ref } from 'vue'
const props = defineProps(['nome', 'tipo'])
const model = defineModel()
import UserIcon from '@iconify-vue/mdi/user'
import KeyIcon from '@iconify-vue/mdi/key'
import EyeIcon from '@iconify-vue/mdi/eye'
import EyeOutlineIcon from '@iconify-vue/mdi/eye-outline'

const tipoInput = ref(props.tipo)
const toggle = ref(false)
function trocarVizu() {
  if (toggle.value == false) {
    toggle.value = true
    tipoInput.value = 'text'
  } else {
    toggle.value = false
    tipoInput.value = 'password'
  }
}
</script>

<template>
  <div class="botao">
    <KeyIcon
      class="icon"
      v-show="props.nome == 'Senha'"
      style="width: 2rem; height: 2rem; color: black"
    ></KeyIcon>
    <UserIcon
      class="icon"
      v-show="props.nome == 'Login'"
      style="width: 2rem; height: 2rem; color: black"
    ></UserIcon>
    <input
      :type="tipoInput"
      :placeholder="props.nome"
      :aria-label="props.nome"
      :autocomplete="props.tipo === 'password' ? 'current-password' : 'username'"
      maxlength="25"
      v-model="model"
    />
    <button
      type="button"
      aria-label="Mostrar senha"
      v-show="props.nome == 'Senha' && toggle == false"
      v-on:click.prevent="trocarVizu"
    >
      <EyeOutlineIcon style="width: 1.5rem; color: white" />
    </button>
    <button
      type="button"
      aria-label="Ocultar senha"
      v-show="props.nome == 'Senha' && toggle == true"
      v-on:click.prevent="trocarVizu"
    >
      <EyeIcon style="width: 1.5rem; color: white" />
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Krona+One&display=swap');
.icon {
  flex-shrink: 0;
  background: white;
  border-radius: 1000rem;
  padding: 0.25rem;
  margin-left: 0.3rem;
}
input {
  flex: 1;
  min-width: 0;
  width: 100%;
  font-size: 16px;
  background: none;
  border: none;
  font-family: 'Krona One', sans-serif;
}
::placeholder {
  color: black;
  font-family: 'Krona One', sans-serif;
}
input:focus {
  outline: none;
}
button {
  background: none;
  border: none;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.botao {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  min-width: 0;
  min-height: 48px;
  padding: 0.4rem 0.5rem;
  border-radius: 6rem;
}
</style>
