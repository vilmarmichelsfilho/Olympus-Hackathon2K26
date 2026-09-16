<script setup>
defineProps({
  conflito: {
    type: Object,
    required: true,
  },
})

defineEmits(['ignorar', 'resolver'])
</script>

<template>
  <article class="card-conflito">
    <div class="conteudo-card">
      <header class="aviso">
        <div class="icone-aviso">
          <img src="@/assets/conflito.png" alt="" />
        </div>
        <div>
          <h2>Conflito de Local</h2>
          <p>
            {{ conflito.jogos.length }} jogos agendados em {{ conflito.local }} às
            {{ conflito.hora }} de {{ conflito.dataFormatada }}
          </p>
        </div>
      </header>

      <ul class="jogos-conflitantes">
        <li v-for="jogo in conflito.jogos" :key="jogo.codJogo">
          <strong>{{ jogo.modalidade }}</strong>
          <span>{{ jogo.confronto }}</span>
        </li>
      </ul>
    </div>

    <footer class="acoes">
      <button class="resolver" type="button" @click="$emit('resolver', conflito)">Resolver</button>
      <button class="ignorar" type="button" @click="$emit('ignorar', conflito.chave)">
        Ignorar
      </button>
    </footer>
  </article>
</template>

<style scoped>
.card-conflito {
  display: flex;
  min-width: 0;
  min-height: 27vw;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.2vw;
  background: #fff;
  box-shadow: 0.25vw 0.25vw 0.5vw rgb(0 0 0 / 30%);
}

.conteudo-card {
  flex: 1;
  padding: 2vw 1.5vw 1.3vw;
}

.aviso {
  display: grid;
  grid-template-columns: 4.3vw 1fr;
  align-items: center;
  gap: 1.2vw;
}

.icone-aviso {
  display: grid;
  width: 4.3vw;
  height: 4.3vw;
  place-items: center;
  border-radius: 1.1vw;
  background: #fde3e4;
}

.icone-aviso img {
  width: 2.35vw;
  height: 2.35vw;
  object-fit: contain;
}

.aviso h2,
.aviso p {
  margin: 0;
}

.aviso h2 {
  color: #141419;
  font-size: 1.35vw;
  font-weight: 700;
  line-height: 1.2;
}

.aviso p {
  color: #aaa;
  font-size: 0.88vw;
  line-height: 1.25;
}

.jogos-conflitantes {
  margin: 2.2vw 0 0;
  overflow: hidden;
  padding: 0;
  border: 0.12vw solid #dedede;
  border-radius: 1.4vw;
  list-style: none;
}

.jogos-conflitantes li {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 1vw;
  padding: 0.85vw 1.4vw;
  border-bottom: 0.1vw solid #e85002;
}

.jogos-conflitantes li:last-child {
  border-bottom: 0;
}

.jogos-conflitantes strong {
  flex: 0 0 auto;
  color: #e85002;
  font-size: 1.1vw;
  font-weight: 700;
}

.jogos-conflitantes span {
  overflow: hidden;
  color: #18181d;
  font-size: 1vw;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.acoes {
  display: flex;
  justify-content: center;
  gap: 1.5vw;
  padding: 0.85vw 1vw;
  background: #e9202a;
}

.acoes button {
  min-width: 8.7vw;
  padding: 0.65vw 1.2vw;
  border-radius: 0.65vw;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.95vw;
  font-weight: 650;
}

.resolver {
  border: 0.1vw solid #62bd35;
  background: #62bd35;
}

.ignorar {
  border: 0.1vw solid #fff;
  background: transparent;
}

@media (max-width: 768px) {
  .card-conflito {
    min-height: 88vw;
    border-radius: 7vw;
    box-shadow: 1vw 1vw 2vw rgb(0 0 0 / 22%);
  }

  .conteudo-card {
    padding: 8vw 6vw 5vw;
  }

  .aviso {
    grid-template-columns: 18vw 1fr;
    gap: 5vw;
  }

  .icone-aviso {
    width: 18vw;
    height: 18vw;
    border-radius: 6vw;
  }

  .icone-aviso img {
    width: 9vw;
    height: 9vw;
  }

  .aviso h2 {
    font-size: 5.2vw;
  }

  .aviso p {
    font-size: 3.7vw;
  }

  .jogos-conflitantes {
    margin-top: 8vw;
    border-width: 0.5vw;
    border-radius: 6vw;
  }

  .jogos-conflitantes li {
    gap: 3vw;
    padding: 3.2vw 5vw;
    border-bottom-width: 0.4vw;
  }

  .jogos-conflitantes strong {
    font-size: 4.2vw;
  }

  .jogos-conflitantes span {
    font-size: 3.8vw;
  }

  .acoes {
    gap: 5vw;
    padding: 3.5vw 4vw;
  }

  .acoes button {
    min-width: 33vw;
    padding: 2.5vw 4vw;
    border-width: 0.4vw;
    border-radius: 3vw;
    font-size: 3.8vw;
  }
}
</style>
