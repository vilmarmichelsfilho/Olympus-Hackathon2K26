<script setup>
import { ref } from 'vue';
import { torneios } from '@/data/torneios';
import TorneioCard from './TorneioCard.vue';
import AdicionarOuEditarTornei from './AdicionarOuEditarTornei.vue';
import { salvarTorneio } from '@/Utils/adicionarUtils';

const add = ref(false)

function aoAdicionarTorneio(dados) {
  salvarTorneio(dados)
  add.value = false
}
</script>

<template>
  <div class="container">
    <div class="torneio">
      <div class="cima">
        <p>a</p>
        <img src="/public/images/coroa.png" alt="" style="width: 3vw;">
        <button v-on:click.prevent="add = true">Adicionar</button>
      </div>
      <div class="topo">
        <ul>
          <li>Torneio</li>
          <li>Período</li>
            <li>Status</li>
        </ul>
      </div>
      <ul>
        <TorneioCard v-for="torneio in torneios" :key="torneio.cod_torneio" :nome="torneio.nome_torneio"
          :dataInicio="torneio.data_inicio_torneio" :dataFim="torneio.data_fim_torneio" :status="torneio.status_torneio"
          :id="torneio.cod_torneio"></TorneioCard>
      </ul>
      <div class="card-info">
        <div class="topo-info">
          <img src="@/assets/check.png" alt="imagem-check">
          <div class="textos-info">
            <p class="titulo-info">Tudo em um só lugar</p>
            <p class="desc-info">Crie um torneio por etapas ou entre direto no painel de um torneio já existente.</p>
          </div>
        </div>

        <div class="linha-divisoria"></div>

        <p class="fluxo-texto">Criar → Turmas → Times → Modalidades → Árbitros → Finalizar</p>
      </div>
    </div>

  </div>

  <AdicionarOuEditarTornei v-if="add" @adicionar="aoAdicionarTorneio" @fechar="add = false"></AdicionarOuEditarTornei>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

button {
  font-size: 1vw;
}

.cima button {
  background: none;
  padding: 0.3vw 1vw;
  border: solid white 0.15vw;
  font-size: 0.75vw;
  border-radius: 3vw;
  transition: 0.3s;
}

.cima button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0.5vw 0.1vw white;
}

.cima {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1vw;
  margin: 1vw 2vw 0 7vw;
}

.cima p {
  opacity: 0;
}

.desc span {
  opacity: 0;
}

.topo {
  border-bottom: solid 0.2vw #E85002;
}

.topo ul {
  font-size: 1.8vw;
  margin: 0 8vw;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.torneio {
  background: #0B1739;
  border-radius: 1vw;
  width: 70vw;
}

.container {
  margin: 3vw 4vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  color: white;
  font-weight: 400;
  font-style: normal;
}

.card-info {
  background: #0E1D46;
  border-radius: 1vw;
  padding: 3vw 5vw;
  margin: 2vw 6vw;
  color: white;
}

.topo-info {
  display: flex;
  align-items: flex-start;
  gap: 1vw;
}

.check-circulo {
  width: 2.2vw;
  height: 2.2vw;
  border-radius: 50%;
  background: rgba(222, 109, 28, 0.15);
  color: #DE6D1C;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
}

.titulo-info {
  margin: 0;
  font-weight: bold;
}

.desc-info {
  margin: 0.3vw 0 0;
  color: #999;
  font-size: 0.85vw;
   border-bottom: solid 0.2vw #E85002;
}
</style>
