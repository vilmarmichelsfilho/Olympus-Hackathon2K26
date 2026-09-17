<script setup>
import { ref } from 'vue';
import { torneios } from '@/data/torneios';
import TorneioCard from './TorneioCard.vue';
import AdicionarOuEditarTornei from './AdicionarOuEditarTornei.vue';
import { salvarTorneio } from '@/Utils/adicionarUtils';
const emit = defineEmits(['editar'])
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
        <span aria-hidden="true"></span>
        <img src="/images/coroa.png" alt="">
        <button v-on:click.prevent="add = true">Adicionar</button>
      </div>
      <div class="topo">
        <ul>
          <li>Torneio</li>
          <li>Período</li>
          <li>Status</li>
          <li aria-hidden="true"></li>
        </ul>
      </div>
      <ul>
        <TorneioCard v-for="torneio in torneios" :key="torneio.cod_torneio" :nome="torneio.nome_torneio"
          :dataInicio="torneio.data_inicio_torneio" :dataFim="torneio.data_fim_torneio" :status="torneio.status_torneio"
          :id="torneio.cod_torneio" @editar="emit('editar', $event)"></TorneioCard>
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
  font-size: 0.9rem;
}

.cima button {
  background: none;
  color: white;
  padding: 0.45rem 1rem;
  border: 1px solid white;
  font-size: 0.8rem;
  border-radius: 999px;
  transition: 0.3s;
}

.cima button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0.5vw 0.1vw white;
}

.cima {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.cima img {
  width: 2.25rem;
}

.cima button {
  justify-self: end;
}

.desc span {
  opacity: 0;
}

.topo {
  border-bottom: 2px solid #e85002;
}

.topo ul {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 0.3fr;
  align-items: center;
  gap: 1rem;
  margin: 0 1.5rem;
  padding: 0.75rem 0;
  list-style: none;
  font-size: clamp(0.8rem, 1.1vw, 1rem);
}

.torneio {
  width: 100%;
  max-width: 1120px;
  overflow: hidden;
  border-radius: 12px;
  background: #0b1739;
}

.container {
  width: 100%;
  padding: 1.5rem clamp(1rem, 3vw, 3rem) 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: white;
  font-weight: 400;
  font-style: normal;
}

.card-info {
  margin: 2rem clamp(1rem, 6vw, 6rem);
  padding: clamp(1.25rem, 3vw, 3rem) clamp(1rem, 5vw, 5rem);
  border-radius: 10px;
  background: #132654;
  color: white;
}

.topo-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
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
  margin: 0.3rem 0 0;
  color: #999;
  font-size: 0.85rem;
  border-bottom: 2px solid #e85002;
}

.linha-divisoria {
  height: 1px;
  margin: 1.25rem 0;
  background: rgb(255 255 255 / 12%);
}

.fluxo-texto {
  margin: 0;
  color: #c6cde0;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem 0 2rem;
  }

  .torneio {
    border-radius: 0;
    background: #fff;
    color: #17171a;
  }

  .cima {
    grid-template-columns: 1fr auto;
    padding: 0 1rem 1rem;
  }

  .cima span,
  .cima img {
    display: none;
  }

  .cima button {
    grid-column: 2;
    border-color: #0b1739;
    color: #0b1739;
  }

  .topo {
    display: none;
  }

  .torneio > ul {
    display: grid;
    gap: 0.75rem;
    margin: 0;
    padding: 0 1rem;
  }

  .card-info {
    margin: 1.25rem 1rem 0;
    padding: 1.25rem;
    background: #0b1739;
    color: #fff;
  }

  .topo-info img {
    width: 2rem;
  }

  .fluxo-texto {
    line-height: 1.8;
  }
}
</style>
