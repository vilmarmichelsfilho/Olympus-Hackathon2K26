<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoutIcon from '@iconify-vue/mdi/logout'
import UserIcon from '@iconify-vue/mdi/user'
import ArbitroJogoCard from '@/components/ArbitroJogoCard.vue'
import EditorPlacarArbitro from '@/components/EditorPlacarArbitro.vue'
import { arbitros } from '@/data/arbitros'
import { jogos } from '@/data/jogos'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { encerrarSessao, obterSessao } from '@/Utils/loginUtils'

const router = useRouter()
const sessao = obterSessao()
const jogoSelecionadoId = ref(null)

const arbitro = computed(() =>
  arbitros.find((item) => Number(item.cod_arbitro) === Number(sessao?.codigo)),
)

function formatarData(dataISO) {
  const [, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}`
}

function detalharJogo(jogo) {
  const modalidade = modalidades.find((item) => item.cod_modalidade === jogo.cod_modalidade)
  const participantes = participa
    .filter((item) => item.cod_jogo === jogo.cod_jogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)
  const timeA = times.find((item) => item.cod_time === participantes[0]?.cod_time)
  const timeB = times.find((item) => item.cod_time === participantes[1]?.cod_time)
  const [data, horario = ''] = jogo.horario_jogo.split(' ')

  return {
    codJogo: jogo.cod_jogo,
    confrontoDefinido: Boolean(timeA && timeB),
    dataFormatada: formatarData(data),
    dataHoraISO: `${data}T${horario.slice(0, 5)}`,
    hora: horario.slice(0, 5),
    local: modalidade?.localdojogo_modalidade ?? 'Local a definir',
    modalidade: modalidade?.nome_modalidade ?? 'Modalidade',
    pontuacaoA: participantes[0]?.pontuacao_time,
    pontuacaoB: participantes[1]?.pontuacao_time,
    status: jogo.status_jogo,
    temPlacar: participantes[0]?.pontuacao_time != null && participantes[1]?.pontuacao_time != null,
    timeA: timeA?.nome_time ?? 'A definir',
    timeB: timeB?.nome_time ?? 'A definir',
  }
}

const jogosDoArbitro = computed(() => {
  const prioridade = { AoVivo: 0, Agendado: 1 }

  return jogos
    .filter(
      (jogo) =>
        Number(jogo.cod_arbitro) === Number(sessao?.codigo) &&
        jogo.status_jogo !== 'Finalizado',
    )
    .map(detalharJogo)
    .sort((jogoA, jogoB) => {
      const diferencaStatus = prioridade[jogoA.status] - prioridade[jogoB.status]
      return diferencaStatus || jogoA.dataHoraISO.localeCompare(jogoB.dataHoraISO)
    })
})

const jogoSelecionado = computed(() =>
  jogosDoArbitro.value.find((jogo) => jogo.codJogo === jogoSelecionadoId.value),
)

function alterarPlacar(codJogo) {
  jogoSelecionadoId.value = codJogo
}

function salvarPlacar({ codJogo, pontuacaoA, pontuacaoB }) {
  const jogo = jogos.find((item) => item.cod_jogo === codJogo)

  if (!jogo || Number(jogo.cod_arbitro) !== Number(sessao?.codigo)) return

  const participantesDoJogo = participa
    .filter((item) => item.cod_jogo === codJogo)
    .sort((a, b) => a.posicao_participante - b.posicao_participante)

  if (participantesDoJogo[0]) participantesDoJogo[0].pontuacao_time = pontuacaoA
  if (participantesDoJogo[1]) participantesDoJogo[1].pontuacao_time = pontuacaoB

  jogoSelecionadoId.value = null
}

function sair() {
  encerrarSessao()
  router.replace('/login')
}
</script>

<template>
  <main class="painel-arbitro">
    <header class="barra-usuario">
      <div class="usuario">
        <UserIcon class="avatar" />
        <div>
          <strong>{{ arbitro?.nome_arbitro ?? 'Árbitro' }}</strong>
          <span>Painel do Árbitro</span>
        </div>
      </div>
      <button type="button" @click="sair"><LogoutIcon /> Sair</button>
    </header>

    <div class="conteudo">
      <template v-if="!jogoSelecionado">
        <header class="titulo-pagina">
          <h1>Meus jogos</h1>
          <p>Próximas partidas que você irá arbitrar</p>
        </header>

        <ul v-if="jogosDoArbitro.length" class="lista-jogos">
          <ArbitroJogoCard
            v-for="jogo in jogosDoArbitro"
            :key="jogo.codJogo"
            :jogo="jogo"
            @alterar-placar="alterarPlacar"
          />
        </ul>

        <div v-else class="estado-vazio">
          <h2>Nenhum jogo atribuído</h2>
          <p>Você ainda não possui partidas para arbitrar.</p>
        </div>
      </template>

      <EditorPlacarArbitro
        v-else
        :jogo="jogoSelecionado"
        @salvar="salvarPlacar"
        @voltar="jogoSelecionadoId = null"
      />
    </div>
  </main>
</template>

<style scoped>
.painel-arbitro {
  width: 100%;
  min-height: 100vh;
  background: #15161a;
  font-family: 'Krona One', sans-serif;
}

.barra-usuario {
  display: flex;
  min-height: 6vw;
  align-items: center;
  justify-content: space-between;
  padding: 1vw 5vw;
  border-bottom: 0.08vw solid #ddd;
  background: #fff;
}

.usuario {
  display: flex;
  align-items: center;
  gap: 0.8vw;
}

.avatar {
  width: 3vw;
  height: 3vw;
  padding: 0.35vw;
  border-radius: 50%;
  background: #c7c7c7;
  color: #fff;
}

.usuario div {
  display: flex;
  flex-direction: column;
}

.usuario strong {
  color: #555;
  font-size: 1vw;
  font-weight: 700;
}

.usuario span {
  color: #aaa;
  font-size: 0.8vw;
}

.barra-usuario button {
  display: flex;
  align-items: center;
  gap: 0.45vw;
  padding: 0.55vw 1vw;
  border: 0.08vw solid #ddd;
  border-radius: 0.5vw;
  background: #fff;
  color: #555;
  cursor: pointer;
  font: inherit;
  font-size: 0.8vw;
}

.conteudo {
  width: min(72vw, 920px);
  margin: 0 auto;
  padding: 3vw 0 5vw;
}

.titulo-pagina {
  margin-bottom: 2.3vw;
  color: #fff;
}

.titulo-pagina h1,
.titulo-pagina p {
  margin: 0;
}

.titulo-pagina h1 {
  font-size: 2.4vw;
  font-weight: 700;
}

.titulo-pagina p {
  color: #aaa;
  font-size: 0.95vw;
}

.lista-jogos {
  overflow: hidden;
  margin: 0;
  padding: 0;
  border-radius: 1.2vw;
  box-shadow: 0.6vw 0.6vw 0.8vw rgb(0 0 0 / 20%);
  list-style: none;
}

.estado-vazio {
  padding: 7vw 3vw;
  border-radius: 1.2vw;
  background: #fff;
  color: #222;
  text-align: center;
}

.estado-vazio h2,
.estado-vazio p {
  margin: 0;
}

.estado-vazio h2 {
  font-size: 1.4vw;
  font-weight: 700;
}

.estado-vazio p {
  color: #888;
  font-size: 0.9vw;
}

@media (max-width: 768px) {
  .painel-arbitro {
    background: #fff;
  }

  .barra-usuario {
    min-height: 18vw;
    padding: 3vw 6vw;
    border-bottom-width: 0.4vw;
  }

  .usuario {
    gap: 3vw;
  }

  .avatar {
    width: 10vw;
    height: 10vw;
    padding: 1vw;
  }

  .usuario strong {
    max-width: 48vw;
    overflow: hidden;
    font-size: 4vw;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .usuario span {
    font-size: 3.2vw;
  }

  .barra-usuario button {
    gap: 1.5vw;
    padding: 2vw;
    border: 0;
    font-size: 0;
  }

  .barra-usuario button svg {
    width: 6vw;
    height: 6vw;
  }

  .conteudo {
    width: 100%;
    padding: 8vw 6vw 14vw;
  }

  .titulo-pagina {
    margin-bottom: 14vw;
    color: #15151a;
  }

  .titulo-pagina h1 {
    font-size: 7.5vw;
  }

  .titulo-pagina p {
    font-size: 3.7vw;
  }

  .lista-jogos {
    border-radius: 5vw;
    box-shadow: 2vw 2vw 3vw rgb(0 0 0 / 13%);
  }

  .estado-vazio {
    padding: 20vw 5vw;
    border-radius: 5vw;
    box-shadow: 2vw 2vw 3vw rgb(0 0 0 / 10%);
  }

  .estado-vazio h2 {
    font-size: 5vw;
  }

  .estado-vazio p {
    font-size: 3.5vw;
  }
}
</style>
