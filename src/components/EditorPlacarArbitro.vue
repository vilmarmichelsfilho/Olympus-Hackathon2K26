<script setup>
import { ref, watch } from 'vue'
import MinusIcon from '@iconify-vue/mdi/minus'
import PlusIcon from '@iconify-vue/mdi/plus'

const props = defineProps(['jogo'])

const emit = defineEmits(['salvar', 'voltar'])
const pontuacaoA = ref(0)
const pontuacaoB = ref(0)

watch(
  () => props.jogo,
  (jogo) => {
    pontuacaoA.value = Number(jogo?.pontuacaoA ?? 0)
    pontuacaoB.value = Number(jogo?.pontuacaoB ?? 0)
  },
  { immediate: true },
)

function alterarPontuacao(time, diferenca) {
  const pontuacao = time === 'A' ? pontuacaoA : pontuacaoB
  pontuacao.value = Math.max(0, pontuacao.value + diferenca)
}

function salvar() {
  emit('salvar', {
    codJogo: props.jogo.codJogo,
    pontuacaoA: pontuacaoA.value,
    pontuacaoB: pontuacaoB.value,
  })
}
</script>

<template>
  <section class="editor-placar" aria-labelledby="titulo-editor">
    <button class="voltar" type="button" @click="$emit('voltar')">‹‹ Voltar para jogos</button>

    <div class="placar-card">
      <header>
        <p>{{ jogo.modalidade }}</p>
        <span>{{ jogo.local }}</span>
      </header>

      <h1 id="titulo-editor">{{ jogo.timeA }} <small>vs</small> {{ jogo.timeB }}</h1>
      <h2>Pontuação</h2>

      <div class="placar">
        <div class="controle-time">
          <button
            type="button"
            :aria-label="`Diminuir pontuação de ${jogo.timeA}`"
            @click="alterarPontuacao('A', -1)"
          >
            <MinusIcon />
          </button>
          <strong>{{ pontuacaoA }}</strong>
          <button
            type="button"
            :aria-label="`Aumentar pontuação de ${jogo.timeA}`"
            @click="alterarPontuacao('A', 1)"
          >
            <PlusIcon />
          </button>
        </div>

        <span class="separador">–</span>

        <div class="controle-time">
          <button
            type="button"
            :aria-label="`Diminuir pontuação de ${jogo.timeB}`"
            @click="alterarPontuacao('B', -1)"
          >
            <MinusIcon />
          </button>
          <strong>{{ pontuacaoB }}</strong>
          <button
            type="button"
            :aria-label="`Aumentar pontuação de ${jogo.timeB}`"
            @click="alterarPontuacao('B', 1)"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <button class="salvar" type="button" @click="salvar">Salvar e concluir jogo</button>
    </div>
  </section>
</template>

<style scoped>
.editor-placar {
  width: min(100%, 42vw);
  margin: 0 auto;
}

.voltar {
  margin-bottom: 1vw;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 1vw;
  font-weight: 700;
}

.placar-card {
  padding: 2.2vw 2vw;
  border: 0.08vw solid #ddd;
  border-radius: 1.2vw;
  background: #fff;
  box-shadow: 0.5vw 0.5vw 0.8vw rgb(0 0 0 / 12%);
}

.placar-card header p,
.placar-card header span,
.placar-card h1,
.placar-card h2 {
  margin: 0;
}

.placar-card header p {
  color: #de6d1c;
  font-size: 2.2vw;
  font-weight: 700;
}

.placar-card header span {
  color: #aaa;
  font-size: 0.9vw;
}

.placar-card h1 {
  margin: 2.5vw 0;
  color: #111;
  font-size: 2.2vw;
  font-weight: 700;
  text-align: center;
}

.placar-card h1 small {
  color: #aaa;
  font-size: 1.1vw;
  font-weight: 700;
}

.placar-card h2 {
  color: #666;
  font-size: 1.5vw;
  font-weight: 600;
  text-align: center;
}

.placar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.3vw;
  margin: 1.4vw 0 3.5vw;
}

.controle-time {
  display: flex;
  align-items: center;
  gap: 0.7vw;
}

.controle-time button {
  display: grid;
  width: 2.8vw;
  height: 2.8vw;
  place-items: center;
  border: 0;
  background: transparent;
  color: #de6d1c;
  cursor: pointer;
  font-size: 2.7vw;
}

.controle-time strong,
.separador {
  color: #111;
  font-size: 2.5vw;
  font-weight: 700;
}

.salvar {
  width: 100%;
  padding: 0.75vw;
  border: 0;
  border-radius: 0.4vw;
  background: #64b52c;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 1.25vw;
  font-weight: 700;
}

@media (max-width: 768px) {
  .editor-placar {
    width: 100%;
  }

  .voltar {
    margin-bottom: 4vw;
    color: #15151a;
    font-size: 4vw;
  }

  .placar-card {
    padding: 6vw 5vw;
    border-width: 0.3vw;
    border-radius: 5vw;
    box-shadow: 2vw 2vw 3vw rgb(0 0 0 / 10%);
  }

  .placar-card header p {
    font-size: 7.5vw;
  }

  .placar-card header span {
    font-size: 3.5vw;
  }

  .placar-card h1 {
    margin: 10vw 0;
    font-size: 7vw;
  }

  .placar-card h1 small {
    font-size: 4vw;
  }

  .placar-card h2 {
    font-size: 5vw;
  }

  .placar {
    gap: 2vw;
    margin: 5vw 0 12vw;
  }

  .controle-time {
    gap: 1vw;
  }

  .controle-time button {
    width: 9vw;
    height: 9vw;
    font-size: 8vw;
  }

  .controle-time strong,
  .separador {
    font-size: 8vw;
  }

  .salvar {
    padding: 3vw;
    border-radius: 1.5vw;
    font-size: 5vw;
  }
}
</style>
