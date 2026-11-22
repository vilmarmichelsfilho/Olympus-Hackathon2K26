<script setup>
import { ref, onMounted } from 'vue'
import { useJogos } from '@/composables/useJogos'
import { useParticipa } from '@/composables/useParticipa'
import TableJogosAdm from '@/components/TableJogosAdm.vue'
import EditarJogos from '@/components/EditarJogos.vue'
import EditorPlacarArbitro from '@/components/EditorPlacarArbitro.vue'
import { finalizarJogo } from '@/Utils/partidasUtils'
const { jogos, carregarJogos, atualizarJogoLocal } = useJogos()
const { participa, carregarParticipa, atualizarParticipante, atualizarParticipantes } = useParticipa()
const API_URL = 'http://localhost:3000';
const tabelaJogos = ref(null)
async function carregarDados() {
  await Promise.all([carregarJogos(), carregarParticipa()])
}
onMounted(carregarDados);
const jogoEmEdicao = ref(null)
const jogoComPlacarAberto = ref(null)

function abrirEdicao(codJogo) {
  jogoEmEdicao.value = jogos.value.find((j) => j.id == codJogo)
}

function fecharEdicao() {
  jogoEmEdicao.value = null
}

function abrirPlacar(jogo) {
  jogoComPlacarAberto.value = jogo
}

async function salvarPlacar({ id, codJogo, pontuacaoA, pontuacaoB }) {
  const idJogo = id ?? codJogo
  const resultado = finalizarJogo(
    jogos.value,
    participa.value,
    idJogo,
    pontuacaoA,
    pontuacaoB,
  )
  if (!resultado.sucesso) {
    alert(resultado.mensagem)
    return
  }

  try {
    const resposta = await fetch(`${API_URL}/jogos/${idJogo}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status_jogo: 'Finalizado' }),
    })

    if (!resposta.ok) throw new Error('Não foi possível atualizar o status do jogo.')

    await atualizarParticipantes(resultado.participantesAtualizados)
    atualizarJogoLocal({ id: idJogo, status_jogo: 'Finalizado' })
    jogoComPlacarAberto.value = null
  } catch (erro) {
    await Promise.all([carregarJogos({ forcar: true }), carregarParticipa()])
    alert(erro.message)
  }
}

async function atualizarJogo(dados) {
  const idJogo = dados.id
  const indice = jogos.value.findIndex((j) => j.id == idJogo)
  if (indice === -1) return

  const resposta = await fetch(`${API_URL}/jogos/${idJogo}`, {
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

  const participantes = participa.value
    .filter((p) => p.id_jogo == idJogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  try {
    if (participantes[0]) {
      await atualizarParticipante(participantes[0].id, {
        id_time: dados.time1 == null || dados.time1 === '' ? null : Number(dados.time1),
      })
    }
    if (participantes[1]) {
      await atualizarParticipante(participantes[1].id, {
        id_time: dados.time2 == null || dados.time2 === '' ? null : Number(dados.time2),
      })
    }
  } catch (erro) {
    await Promise.all([carregarJogos({ forcar: true }), carregarParticipa()])
    alert(erro.message)
    return
  }

  atualizarJogoLocal({
    id: idJogo,
    id_modalidade: Number(dados.id_modalidade),
    horario_jogo: dados.horario_jogo,
    status_jogo: dados.status_jogo,
  })

  await tabelaJogos.value?.carregarDados()
  fecharEdicao()
}
</script>

<template>
  <section class="jogos-view">
    <template v-if="!jogoComPlacarAberto">
      <header class="topo">
        <h1>Jogos<span>, IFC</span></h1>
        <p>Controle dos jogos</p>
      </header>

      <div class="table-jogos">
        <TableJogosAdm
          ref="tabelaJogos"
          @editar="abrirEdicao"
          @placar="abrirPlacar"
        />
      </div>
    </template>

    <template v-else>
      <header class="topo topo-placar">
        <h1>Jogo</h1>
        <p>Controle da Pontuação</p>
      </header>
      <EditorPlacarArbitro
        :jogo="jogoComPlacarAberto"
        @salvar="salvarPlacar"
        @voltar="jogoComPlacarAberto = null"
      />
    </template>

    <EditarJogos
      v-if="jogoEmEdicao"
      :jogo="jogoEmEdicao"
      @fechar-editar-jogo="fecharEdicao"
      @atualizar="atualizarJogo"
    />
  </section>
</template>

<style scoped>
.jogos-view {
  width: 80vw;
  min-height: 100vh;
  padding: 2vw 3vw 4vw;
}

.topo {
  margin-bottom: 2vw;
}

.topo h1 {
  margin: 0;
  color: white;
  font-size: 2.4vw;
  font-weight: 700;
  line-height: 1.2;
}

.topo p {
  margin: 0;
  color: gray;
  font-size: 0.9vw;
}

.table-jogos {
  width: 100%;
}

@media (max-width: 768px) {
  .jogos-view {
    width: 100vw;
    padding: 8vw 5vw 14vw;
    background: #fff;
  }

  .topo {
    margin-bottom: 14vw;
  }

  .topo h1 {
    color: #15151a;
    font-size: 7.5vw;
  }

  .topo h1 span {
    display: none;
  }

  .topo p {
    color: #aaa;
    font-size: 3.7vw;
  }

  .topo-placar {
    margin-bottom: 5vw;
  }
}
</style>
