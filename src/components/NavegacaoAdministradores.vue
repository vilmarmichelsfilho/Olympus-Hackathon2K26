<script setup>
import { RouterLink } from 'vue-router'
import UserIcon from '@iconify-vue/mdi/user'
import GearIcon from '@iconify-vue/mdi/gear'
import HomeAnalyticsIcon from '@iconify-vue/mdi/home-analytics'
import { AlterarCodTorneio, codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
import { encerrarSessao } from '@/Utils/loginUtils'
const emit = defineEmits(['tela'])

function sair() {
  encerrarSessao()
  AlterarCodTorneio(null)
}
</script>

<template>
  <div class="all">
    <div class="usuario">
      <UserIcon height="3vw" class="user" />
      <div>
        <h3>Admin</h3>
        <p>Painel de Controle</p>
      </div>
    </div>
    <div class="navegacao">
      <div class="logo">
        <HomeAnalyticsIcon height="1.5vw" />
        <h2>Dashboard</h2>
      </div>
      <nav>
        <ul>
          <li v-on:click="emit('tela', 'torneio')">Torneio</li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'dashboard')">
            Dashboard
          </li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'jogos')">Jogos</li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'times')">Times</li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'horarios')">
            Horários
          </li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'conflitos')">
            Conflitos
          </li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'turmas')">
            Turmas
          </li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'arbitros')">
            Arbitros
          </li>
          <li v-if="codTorneioSelecionadoAdm !== null" v-on:click="emit('tela', 'modalidades')">
            Modalidades
          </li>
        </ul>
      </nav>
    </div>
    <div class="separa"></div>
    <div class="saida">
      <RouterLink to="/" v-on:click="sair()">
        <GearIcon height="2vw" />
        <p>Sair</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
.all {
  font-family: 'Krona One', sans-serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 3vw;
  padding: 1.5vw;
  background: #202125;
  height: auto;
  min-height: 100vh;
  max-width: 20vw;
  box-shadow: 10px 10px 30px 2px rgba(0, 0, 0, 0.644);
}
.usuario {
  display: flex;
  align-items: center;
  gap: 0.5vw;
}
.usuario h3 {
  font-weight: bolder;
}
.usuario p {
  color: #b3b3b3;
}
.user {
  color: white;
  background: #bebebe;
  padding: 0.2vw;
  border-radius: 100vw;
}
.logo {
  display: flex;
  align-items: center;
  color: #e85002;
  font-size: 0.8vw;
  gap: 0.2vw;
  margin-bottom: 0.7vw;
}
.logo h2 {
  font-weight: 700;
}
.navegacao ul {
  list-style: none;
  padding: none;
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
  color: #aeb9e1;
}
.navegacao li {
  font-weight: bolder;
  cursor: pointer;
  padding-left: 0.5vw;
  border-radius: 0.1vw;
  transition: 0.3s;
}
.navegacao li:hover {
  color: white;
  font-size: 0.9vw;
  background: linear-gradient(90deg, #e85002 1%, rgba(0, 0, 0, 0) 1%);
}
.separa {
  height: 0.1vw;
  width: 100%;
  background: #ffffff46;
}
.saida a {
  display: flex;
  align-items: center;
  font-size: 1vw;
  gap: 0.3vw;
  text-decoration: none;
  color: #aeb9e1;
}
@media (max-width: 760px) {
  .all {
    min-width: 45vw;
  }
  .saida a {
    font-size: 4vw;
  }
  .logo {
    font-size: 3vw;
  }
}
</style>
