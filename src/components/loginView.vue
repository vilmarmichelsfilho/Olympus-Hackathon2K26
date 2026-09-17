<script setup>
import loginInput from '@/components/loginInput.vue'
import loginButton from '@/components/loginButton.vue'
import { ref } from 'vue'
import router from '@/router'
import { obterSessao, rotaDaSessao } from '@/Utils/loginUtils'

const login = ref('')
const senha = ref('')

const emit = defineEmits(['fecharPop'])

const sessao = obterSessao()
if (sessao) {
  router.replace(rotaDaSessao(sessao))
  emit('fecharPop')
}
</script>

<template>
  <div class="container">
    <div class="loginContainer">
      <div class="head">
        <h2>Olympus</h2>
        <p>Sign up</p>
      </div>
      <div class="input">
        <h1>Log-in</h1>
        <loginInput :nome="'Login'" :tipo="'text'" v-model="login"></loginInput>
        <loginInput :nome="'Senha'" :tipo="'password'" v-model="senha"></loginInput>
      </div>
      <div class="text">
        <p>Administradores e árbitros têm acesso ao painel de controle</p>
        <loginButton :login="login" :senha="senha" @fechar="emit('fecharPop')">Entrar</loginButton>
      </div>
      <button class="close" v-on:click.prevent="emit('fecharPop')">close</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Krona+One&display=swap');
.close {
  background: none;
  border: none;
}
.close:hover {
  text-decoration: underline;
}
.container {
  box-sizing: border-box;
  position: fixed;
  inset: 0;
  z-index: 1000;
  background:
    linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.62)),
    url('../assets/loginBackground.png') center / cover no-repeat;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem;
  color: white;
  display: grid;
  place-items: center;
  font-family: 'Krona One', sans-serif;
  overflow-y: auto;
}

.loginContainer {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  padding: 3rem 0;
  width: min(92vw, 36rem);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1200px) {
  .container {
    background: rgba(0, 0, 0, 0.62);
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  font-size: 1.2rem;
}

.text {
  display: flex;
  margin: 0 1rem;
  justify-content: space-between;
}

.text p {
  font-size: 0.7rem;
  width: 60%;
}

.input {
  margin: 1rem;
}

h2 {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  color: #d49258;
  letter-spacing: 2%;
  text-shadow: -0.2rem 0.3rem 0.5rem black;
  font-size: 2rem;
}
</style>
