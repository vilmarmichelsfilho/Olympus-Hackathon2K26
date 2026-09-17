<script setup>
import { torneios } from '@/data/torneios'
import TorneioCard from './TorneioCard.vue'

const emit = defineEmits(['editar', 'adicionar'])
</script>

<template>
  <div class="container">
    <div class="torneio">
      <div class="cima">
        <p aria-hidden="true">a</p>
        <img src="/images/coroa.png" alt="" style="width: 3vw">
        <button type="button" @click="emit('adicionar')">Adicionar</button>
      </div>
      <div class="topo">
        <ul>
          <li>Torneio</li>
          <li>Período</li>
          <li>Status</li>
        </ul>
      </div>
      <ul class="lista-torneios">
        <TorneioCard
          v-for="torneio in torneios"
          :key="torneio.cod_torneio"
          :nome="torneio.nome_torneio"
          :data-inicio="torneio.data_inicio_torneio"
          :data-fim="torneio.data_fim_torneio"
          :status="torneio.status_torneio"
          :id="torneio.cod_torneio"
          @editar="emit('editar', $event)"
        />
      </ul>
      <div class="card-info">
        <div class="topo-info">
          <img class="check-desktop" src="@/assets/check.png" alt="">
          <span class="check-mobile" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="m7 17 6 6L26 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="textos-info">
            <p class="titulo-info">Tudo em um só lugar</p>
            <p class="desc-info desc-desktop">Crie um torneio por etapas ou entre direto no painel de um torneio já existente.</p>
            <p class="desc-info desc-mobile">Crie ou entre no painel de<br>um torneio</p>
          </div>
        </div>
        <div class="linha-divisoria"></div>
        <p class="fluxo-texto">Criar → Turmas → Times → Modalidades → Árbitros → Finalizar</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

button {
  font-size: 1vw;
}
.cima button {
  background: none;
  color: white;
  padding: 0.3vw 1vw;
  border: solid white 0.15vw;
  font-size: 0.75vw;
  border-radius: 3vw;
  transition: 0.3s;
  cursor: pointer;
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
.topo {
  border-bottom: solid 0.2vw #e85002;
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
  background: #0b1739;
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
  background: #0e1d46;
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
.titulo-info {
  margin: 0;
  font-weight: bold;
}
.desc-info {
  margin: 0.3vw 0 0;
  color: #999;
  font-size: 0.85vw;
  border-bottom: solid 0.2vw #e85002;
}
.check-mobile,
.desc-mobile {
  display: none;
}

@media (max-width: 768px) {
  .container {
    margin: 0;
    gap: 0;
    color: #080808;
  }
  .torneio {
    width: 100%;
    min-width: 0;
    background: transparent;
    border-radius: 0;
  }
  .cima,
  .topo,
  .check-desktop,
  .desc-desktop {
    display: none;
  }
  .lista-torneios {
    display: grid;
    gap: 20px;
    padding: 0;
    list-style: none;
  }
  .card-info {
    margin: 29px 0 0;
    padding: 17px 27px 12px;
    border: 1px solid #b8b8b8;
    border-radius: 20px;
    background: white;
    box-shadow: 7px 9px 6px rgb(0 0 0 / 10%);
    color: #080808;
  }
  .topo-info {
    gap: 12px;
    align-items: flex-start;
  }
  .check-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 50px;
    height: 50px;
    border-radius: 50%;
    background: #feeee6;
    color: #ed5000;
  }
  .check-mobile svg {
    width: 32px;
    height: 32px;
  }
  .textos-info {
    min-width: 0;
  }
  .titulo-info {
    padding-top: 1px;
    font-family: 'Krona One', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }
  .desc-mobile {
    display: block;
    margin: 0;
    border: 0;
    font-size: 14px;
    line-height: 1.2;
  }
  .linha-divisoria {
    height: 2px;
    margin-top: 18px;
    background: #e85002;
  }
  .fluxo-texto {
    margin-top: 3px;
    color: #b5b5b5;
    font-size: 9px;
    line-height: 1.3;
  }
}

@media (max-width: 359px) {
  .card-info {
    padding-inline: 18px;
  }
  .titulo-info {
    font-size: 12px;
  }
}
</style>