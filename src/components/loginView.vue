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
  <Teleport to="body">
    <div class="container" @click.self="emit('fecharPop')" @keydown.esc="emit('fecharPop')">
      <div
        class="loginContainer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-titulo"
      >
        <div class="head">
          <h2>Olympus</h2>
          <p>Sign up</p>
        </div>
        <div class="input">
          <h1 id="login-modal-titulo">Log-in</h1>
          <loginInput :nome="'Login'" :tipo="'text'" v-model="login"></loginInput>
          <loginInput :nome="'Senha'" :tipo="'password'" v-model="senha"></loginInput>
        </div>
        <div class="text">
          <p>Administradores e árbitros têm acesso ao painel de controle</p>
          <loginButton :login="login" :senha="senha" @fechar="emit('fecharPop')"
            >Entrar</loginButton
          >
        </div>
        <button type="button" class="close" aria-label="Fechar login" @click="emit('fecharPop')">
          Fechar
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Krona+One&display=swap');
.close {
  background: none;
  border: none;
  min-height: 44px;
  color: inherit;
  cursor: pointer;
  font-size: 0.75rem;
}
.close:hover {
  text-decoration: underline;
}
.container {
  box-sizing: border-box;
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.62);
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
  width: min(100%, 36rem);
  max-width: 100%;
  min-width: 0;
  max-height: calc(100vh - 2rem);
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  font-size: 0.8rem;
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

.input h1 {
  font-size: 1.4rem;
  line-height: 1.4;
}

.input :deep(input) {
  font-size: 0.875rem;
}

.text :deep(button) {
  font-size: 0.875rem;
}

h2 {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  color: #d49258;
  letter-spacing: 2%;
  text-shadow: -0.2rem 0.3rem 0.5rem black;
  font-size: 1.5rem;
}

@media (max-width: 600px) {
  .loginContainer {
    padding: 1.5rem 0;
  }

  .head {
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .input h1 {
    font-size: 1.25rem;
  }

  .text {
    flex-direction: column;
    gap: 1rem;
  }

  .text p {
    width: 100%;
    font-size: 0.7rem;
    line-height: 1.6;
  }

  .text :deep(button) {
    min-height: 48px;
    width: 100%;
  }
}
</style>
