<script setup>
import { ref } from 'vue'
import { jogos } from '@/data/jogos'
import { participa } from '@/data/participa'
import TableJogosAdm from '@/components/TableJogosAdm.vue'
import EditarJogos from '@/components/EditarJogos.vue'
import EditorPlacarArbitro from '@/components/EditorPlacarArbitro.vue'

const jogoEmEdicao = ref(null)
const jogoComPlacarAberto = ref(null)

function abrirEdicao(codJogo) {
  jogoEmEdicao.value = jogos.find((j) => j.cod_jogo === codJogo)
}

function fecharEdicao() {
  jogoEmEdicao.value = null
}

function abrirPlacar(jogo) {
  jogoComPlacarAberto.value = jogo
}

function salvarPlacar({ codJogo, pontuacaoA, pontuacaoB }) {
  const participantesDoJogo = participa
    .filter((participante) => participante.cod_jogo === codJogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  if (participantesDoJogo[0]) participantesDoJogo[0].pontuacao_time = pontuacaoA
  if (participantesDoJogo[1]) participantesDoJogo[1].pontuacao_time = pontuacaoB

  jogoComPlacarAberto.value = null
}

function atualizarJogo(dados) {
  const indice = jogos.findIndex((j) => j.cod_jogo === dados.cod_jogo)
  if (indice !== -1) {
    jogos[indice].cod_modalidade = dados.cod_modalidade
    jogos[indice].horario_jogo = dados.horario_jogo
    jogos[indice].status_jogo = dados.status_jogo
  }

  const participantes = participa
    .filter((p) => p.cod_jogo === dados.cod_jogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  if (participantes[0]) participantes[0].cod_time = dados.time1
  if (participantes[1]) participantes[1].cod_time = dados.time2

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
        <TableJogosAdm @editar="abrirEdicao" @placar="abrirPlacar" />
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
