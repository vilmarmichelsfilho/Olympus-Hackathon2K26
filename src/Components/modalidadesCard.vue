<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import CloseIcon from '@iconify-vue/mdi/close';
const props = defineProps(['nome', 'imagem', 'desc']);
let modal = ref(0);
function mostrarModal() {
  if (modal.value == 0) {
    modal.value = 1;
  }
  else { modal.value = 0 }
}
</script>
<template>
  <li @click.prevent="mostrarModal()">
    <div class="card-content">
      <h3 class="modalidade-titulo">{{ props.nome }}</h3>
      <img class="modalidade-img" :src="props.imagem" :alt="props.nome">
    </div>
  </li>
  <Teleport to="body">
  <div class="pop-up-overlay" v-if="modal">
    <div class="popup-box" :style="{ backgroundImage: `url(${props.imagem})` }">
      <CloseIcon height="3em" class="botao-fechar" @click.prevent="mostrarModal()"></CloseIcon>
      <h3 class="pop-up-titulo">{{ props.nome }}</h3>
      <p class="descricao">{{ props.desc }}</p>
      <RouterLink to="/" class="btn-entrar">Entrar</RouterLink>
    </div>
  </div>
  </Teleport>
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

.pop-up-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-box {
  position: relative;
  width: 90%;
  height: 70%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

div.popup-box h3 {
  font-size: 10vw;
  margin: 2vw 5vw;
  color: black;
  font-weight: bold;
}

div.popup-box p {
  font-size: 5vw;
  margin: 2vw 5vw;
}

.botao-fechar {
  position: absolute;
  top: 2vw;
  right: 2vw;
  cursor: pointer;
  color: white;
}

.btn-entrar {
  position: absolute;
  bottom: 4vw;
  right: 6vw;
  background-color: #E85002;
  color: white;
  padding: 2vw 12vw;
  border-radius: 8vw;
  text-decoration: none;
  font-size: 6vw;
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
  .popup-box {
    width: 60vw;
    height: 40vw;
    border-radius: 2vw;
  }
  div.popup-box .btn-entrar {
    padding: 1vw 4vw;
    font-size: 2.5vw;
  }
  div.popup-box .botao-fechar {
    top: 1vw;
    right: 1vw;
  }
  div.popup-box h3 {
    font-size: 4vw;
    margin: 1vw 2vw;
  }
  div.popup-box p {
    font-size: 2vw;
    margin: 1vw 2vw;
  }
}
</style>
