<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ConflitoCard from '@/components/ConflitoCard.vue'
import EditarJogos from '@/components/EditarJogos.vue'
import { participa } from '@/data/participa'
import { codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
import { modalidades } from '@/data/modalidades'
import { adquirirConflitos } from '@/Utils/conflitosUtils'
import { useJogos } from '@/composables/useJogos'
const { jogos, carregarJogos, atualizarJogoLocal } = useJogos()
async function carregarDados() {
  await carregarJogos()
}
onMounted(carregarDados)
const jogosDoTorneio = computed(() => jogos.value.filter((jogo) => {
  const modalidade = modalidades.find((m) => Number(m.cod_modalidade) === Number(jogo.id_modalidade))
  return Number(modalidade?.cod_torneio) === Number(codTorneioSelecionadoAdm.value)
}))
const conflitos = computed(() => adquirirConflitos(jogosDoTorneio.value))


const conflitosIgnorados = ref(new Set())
const jogoEmEdicao = ref(null)

function ignorarConflito(chave) {
  conflitosIgnorados.value = new Set([...conflitosIgnorados.value, chave])
}
const conflitosVisiveis = computed(() =>
  conflitos.value.filter(
    (conflito) => !conflitosIgnorados.value.has(conflito.chave),
  ),
)
watch(codTorneioSelecionadoAdm, () => {
  conflitosIgnorados.value = new Set()
  jogoEmEdicao.value = null
})

function resolverConflito(conflito) {
  jogoEmEdicao.value = conflito.jogos[1]?.jogoOriginal ?? conflito.jogos[0]?.jogoOriginal ?? null
}

function fecharEdicao() {
  jogoEmEdicao.value = null
}

async function atualizarJogo(dados) {
  const jogo = jogoEmEdicao.value
  if (!jogo || Number(jogo.id) !== Number(dados.id)) return

  const resposta = await fetch(`http://localhost:3000/jogos/${dados.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_modalidade: Number(dados.id_modalidade),
      horario_jogo: dados.horario_jogo,
      status_jogo: dados.status_jogo,
    }),
  })

  if (!resposta.ok) {
    alert('Não foi possível atualizar o jogo.')
    return
  }

  atualizarJogoLocal({
    id: dados.id,
    id_modalidade: Number(dados.id_modalidade),
    horario_jogo: dados.horario_jogo,
    status_jogo: dados.status_jogo,
  })

  const participantesDoJogo = participa
    .filter((participante) => Number(participante.cod_jogo) === Number(dados.id))
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  if (participantesDoJogo[0]) participantesDoJogo[0].cod_time = dados.time1
  if (participantesDoJogo[1]) participantesDoJogo[1].cod_time = dados.time2

  fecharEdicao()
}
</script>

<template>
  <section class="conflitos-view" aria-labelledby="titulo-conflitos">
    <header class="cabecalho">
      <h1 id="titulo-conflitos">Conflitos de Horário</h1>
      <p>Informações da partida</p>
    </header>

    <div v-if="codTorneioSelecionadoAdm !== null" class="painel-conflitos">
      <div class="marca-painel">
        <img src="@/assets/coroa.png" alt="" />
      </div>

      <div v-if="conflitosVisiveis.length" class="grade-conflitos">
        <ConflitoCard
          v-for="conflito in conflitosVisiveis"
          :key="conflito.chave"
          :conflito="conflito"
          @ignorar="ignorarConflito"
          @resolver="resolverConflito"
        />
      </div>

      <div v-else class="sem-conflitos">
        <img src="@/assets/check.png" alt="" />
        <h2>Nenhum conflito encontrado</h2>
        <p>Não existem jogos no mesmo local e horário neste torneio.</p>
      </div>
    </div>

    <div v-else class="painel-conflitos sem-conflitos">
      <p>Selecione um torneio para verificar os conflitos.</p>
    </div>

    <EditarJogos
      v-if="jogoEmEdicao"
      :jogo="jogoEmEdicao"
      @fechar-editar-jogo="fecharEdicao"
      @atualizar="atualizarJogo"
    />
  </section>
</template>

<style scoped>
.conflitos-view {
  width: 80vw;
  min-height: 100vh;
  padding: 2vw 3vw 4vw;
}

.cabecalho {
  margin-bottom: 2vw;
  color: #fff;
}

.cabecalho h1,
.cabecalho p {
  margin: 0;
}

.cabecalho h1 {
  font-size: 2.6vw;
  font-weight: 700;
  line-height: 1.05;
}

.cabecalho p {
  color: #aaa;
  font-size: 1vw;
}

.painel-conflitos {
  min-height: 40vw;
  overflow: hidden;
  border-radius: 0.7vw;
  background: #0b1739;
}

.marca-painel {
  display: grid;
  height: 4.6vw;
  place-items: center;
  border-bottom: 0.12vw solid #e85002;
}

.marca-painel img {
  width: 2vw;
  height: 1.7vw;
  object-fit: contain;
}

.grade-conflitos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.2vw;
  padding: 2.5vw 5.2vw 3vw;
}

.sem-conflitos {
  display: grid;
  min-height: 34vw;
  place-content: center;
  justify-items: center;
  padding: 4vw;
  color: #fff;
  text-align: center;
}

.sem-conflitos img {
  width: 4vw;
  margin-bottom: 1.2vw;
}

.sem-conflitos h2,
.sem-conflitos p {
  margin: 0;
}

.sem-conflitos h2 {
  font-size: 1.5vw;
  font-weight: 700;
}

.sem-conflitos p {
  color: #aeb5ca;
  font-size: 0.95vw;
}

@media (max-width: 768px) {
  .conflitos-view {
    width: 100vw;
    padding: 8vw 5vw 12vw;
    background: #fff;
  }

  .cabecalho {
    margin-bottom: 12vw;
    color: #121217;
  }

  .cabecalho h1 {
    max-width: 75vw;
    font-size: 8vw;
  }

  .cabecalho p {
    font-size: 3.8vw;
  }

  .painel-conflitos {
    min-height: 0;
    overflow: visible;
    background: transparent;
  }

  .marca-painel {
    display: none;
  }

  .grade-conflitos {
    grid-template-columns: 1fr;
    gap: 12vw;
    padding: 0;
  }

  .sem-conflitos {
    min-height: 75vw;
    padding: 8vw 3vw;
    color: #17171a;
  }

  .sem-conflitos img {
    width: 14vw;
    margin-bottom: 4vw;
  }

  .sem-conflitos h2 {
    font-size: 5vw;
  }

  .sem-conflitos p {
    font-size: 3.6vw;
  }
}
</style>
