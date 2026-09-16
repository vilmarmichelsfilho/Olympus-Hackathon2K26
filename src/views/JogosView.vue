<script setup>
import { ref } from 'vue'
import { jogos } from '@/data/jogos'
import { participa } from '@/data/participa'
import TableJogosAdm from '@/components/TableJogosAdm.vue'
import EditarJogos from '@/components/EditarJogos.vue'

const jogoEmEdicao = ref(null)

function abrirEdicao(codJogo) {
  jogoEmEdicao.value = jogos.find(j => j.cod_jogo === codJogo)
}

function fecharEdicao() {
  jogoEmEdicao.value = null
}

function atualizarJogo(dados) {
  const indice = jogos.findIndex(j => j.cod_jogo === dados.cod_jogo)
  if (indice !== -1) {
    jogos[indice].cod_modalidade = dados.cod_modalidade
    jogos[indice].horario_jogo = dados.horario_jogo
    jogos[indice].status_jogo = dados.status_jogo
  }

  const participantes = participa
    .filter(p => p.cod_jogo === dados.cod_jogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  if (participantes[0]) participantes[0].cod_time = dados.time1
  if (participantes[1]) participantes[1].cod_time = dados.time2

  fecharEdicao()
}
</script>

<template>
  <div class="topo">
    <h1>Jogos, IFC</h1>
    <p>Controle dos jogos</p>
  </div>

  <div class="table-jogos">
    <TableJogosAdm @editar="abrirEdicao" />
  </div>

  <EditarJogos
    v-if="jogoEmEdicao"
    :jogo="jogoEmEdicao"
    @fecharEditarJogo="fecharEdicao"
    @atualizar="atualizarJogo"
  />
</template>

<style scoped>
.topo {
  margin: 1vw 8vw;
}
.topo h1 {
  color: white;
  font-size: 3vw;
}
.topo p {
  color: gray;
}
.table-jogos {
  margin: 1vw 8vw;
}
</style>
