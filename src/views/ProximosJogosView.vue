<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CalendarOutlineIcon from '@iconify-vue/mdi/calendar-outline'
import AgendaTimeCard from '@/components/AgendaTimeCard.vue'
import { cod_torneioAtual, modalidadesFiltradas, jogosDoTorneio } from '@/Utils/cod_torneioUtils'
import { obterAgendaPorTime, obterProximosJogos } from '@/Utils/agendaUtils'
import { modalidades } from '@/data/modalidades'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { torneios } from '@/data/torneios'

const modalidadeSelecionada = ref(null)
const timeSelecionado = ref(null)
const agora = ref(new Date())
let atualizacaoHorario

onMounted(() => {
  atualizacaoHorario = setInterval(() => {
    agora.value = new Date()
  }, 30000)
})
onUnmounted(() => clearInterval(atualizacaoHorario))

function limparFiltros() {
  modalidadeSelecionada.value = null
  timeSelecionado.value = null
}
watch(cod_torneioAtual, limparFiltros)

const torneioSelecionado = computed(() =>
  torneios.find((item) => item.cod_torneio === cod_torneioAtual.value),
)
const timesDoTorneio = computed(() =>
  times.filter((item) => item.cod_torneio === cod_torneioAtual.value),
)
const proximosJogos = computed(() =>
  obterProximosJogos(jogosDoTorneio.value, modalidades, participa, times, agora.value),
)
const agendaPorTime = computed(() =>
  obterAgendaPorTime(
    timesDoTorneio.value,
    proximosJogos.value,
    modalidadeSelecionada.value,
    timeSelecionado.value,
  ),
)
const jogosExibidos = computed(
  () =>
    new Set(agendaPorTime.value.flatMap((time) => time.jogos.map((jogo) => jogo.cod_jogo))).size,
)
const timesSemJogos = computed(
  () => agendaPorTime.value.filter((time) => !time.jogos.length).length,
)
const filtrosAtivos = computed(
  () => modalidadeSelecionada.value !== null || timeSelecionado.value !== null,
)
</script>

<template>
  <main class="pagina-agenda">
    <div class="conteudo">
      <header class="cabecalho">
        <p class="identificador">
          <CalendarOutlineIcon aria-hidden="true" /> Agenda das Olimpíadas
        </p>
        <h1>Próximos <span>jogos</span></h1>
        <p>Acompanhe os horários e os locais das próximas partidas de cada time.</p>
      </header>

      <section class="painel-filtros" aria-labelledby="titulo-filtros">
        <div class="topo-filtros">
          <h2 id="titulo-filtros">Encontre os jogos do seu time</h2>
          <button v-if="filtrosAtivos" type="button" class="limpar" @click="limparFiltros">
            Limpar filtros
          </button>
        </div>
        <div class="filtros">
          <div class="campo">
            <label for="filtro-torneio">Torneio</label>
            <select id="filtro-torneio" v-model="cod_torneioAtual">
              <option :value="null">Selecione um torneio</option>
              <option
                v-for="torneio in torneios"
                :key="torneio.cod_torneio"
                :value="torneio.cod_torneio"
              >
                {{ torneio.nome_torneio }}
              </option>
            </select>
          </div>
          <div class="campo">
            <label for="filtro-modalidade">Modalidade</label>
            <select
              id="filtro-modalidade"
              v-model="modalidadeSelecionada"
              :disabled="!torneioSelecionado"
            >
              <option :value="null">Todas as modalidades</option>
              <option
                v-for="modalidade in modalidadesFiltradas"
                :key="modalidade.cod_modalidade"
                :value="modalidade.cod_modalidade"
              >
                {{ modalidade.nome_modalidade }}
              </option>
            </select>
          </div>
          <div class="campo">
            <label for="filtro-time">Time</label>
            <select id="filtro-time" v-model="timeSelecionado" :disabled="!torneioSelecionado">
              <option :value="null">Todos os times</option>
              <option v-for="time in timesDoTorneio" :key="time.cod_time" :value="time.cod_time">
                {{ time.nome_time }}
              </option>
            </select>
          </div>
        </div>
        <p class="nota-horario">Horários locais do campus IFC Araquari (Brasília).</p>
      </section>

      <section class="resultado" aria-labelledby="titulo-agenda">
        <div
          v-if="torneioSelecionado"
          class="resumo"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <h2 id="titulo-agenda">Agenda por time</h2>
            <p>{{ torneioSelecionado.nome_torneio }}</p>
          </div>
          <p class="contagem">
            <strong>{{ jogosExibidos }}</strong>
            {{ jogosExibidos === 1 ? 'partida futura' : 'partidas futuras' }}
            <span
              >· {{ timesSemJogos }}
              {{ timesSemJogos === 1 ? 'time sem jogos' : 'times sem jogos' }}</span
            >
          </p>
        </div>
        <div v-else class="aviso" role="status">
          <CalendarOutlineIcon aria-hidden="true" />
          <h2 id="titulo-agenda">Selecione um torneio para começar</h2>
          <p>Escolha o torneio acima para consultar a agenda e filtrar os próximos jogos.</p>
        </div>

        <template v-if="torneioSelecionado">
          <div v-if="!jogosExibidos && agendaPorTime.length" class="aviso-sem-jogos" role="status">
            <CalendarOutlineIcon aria-hidden="true" />
            <div>
              <h3>
                Nenhum próximo jogo agendado{{
                  filtrosAtivos ? ' para os filtros selecionados' : ' para os times deste torneio'
                }}.
              </h3>
              <p>
                As agendas abaixo mostram os times sem partidas futuras{{
                  modalidadeSelecionada !== null ? ' nesta modalidade' : ''
                }}.
              </p>
            </div>
          </div>
          <div v-if="agendaPorTime.length" class="agendas">
            <AgendaTimeCard
              v-for="time in agendaPorTime"
              :key="time.cod_time"
              :time="time"
              :modalidade-filtrada="modalidadeSelecionada !== null"
            />
          </div>
          <div v-else class="aviso" role="status">
            <h3>Nenhum time cadastrado neste torneio.</h3>
            <p>A agenda ficará disponível quando os times forem cadastrados.</p>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>

<style scoped>
.pagina-agenda {
  width: 100%;
  min-height: 70vh;
  padding: 56px 24px 80px;
}
.conteudo {
  max-width: 1200px;
  margin: 0 auto;
}
.cabecalho {
  margin-bottom: 32px;
  color: #fff;
}
.identificador {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffab79;
  font-size: 0.85rem;
}
.identificador svg {
  width: 20px;
  height: 20px;
}
h1 {
  margin: 8px 0;
  font-family: 'Anton SC', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.2;
}
h1 span {
  color: #f26522;
}
.cabecalho > p:last-child {
  max-width: 600px;
  color: #c4bdbd;
  font-size: 1rem;
}
.painel-filtros {
  padding: 26px;
  border-radius: 16px;
  background: #fff;
  color: #17171a;
}
.topo-filtros {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.topo-filtros h2 {
  font-size: 1.1rem;
  font-weight: 700;
}
.limpar {
  padding: 6px 0;
  border: 0;
  background: transparent;
  color: #ac3c00;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.filtros {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 20px;
}
.campo {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}
label {
  color: #55555c;
  font-size: 0.8rem;
  font-weight: 600;
}
select {
  width: 100%;
  min-height: 48px;
  padding: 10px 12px;
  border: 1px solid #d7d7db;
  border-radius: 8px;
  background: #fafafa;
  color: #17171a;
  font: inherit;
  cursor: pointer;
}
select:disabled {
  color: #7c7c82;
  background: #f1f1f3;
  cursor: default;
}
select:focus-visible,
button:focus-visible {
  outline: 3px solid #e85002;
  outline-offset: 3px;
}
.nota-horario {
  margin-top: 16px;
  color: #707078;
  font-size: 0.75rem;
}
.resultado {
  margin-top: 36px;
}
.resumo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 22px;
  color: #fff;
}
.resumo h2 {
  font-size: 1.35rem;
  font-weight: 700;
}
.resumo p {
  color: #c4bdbd;
  font-size: 0.85rem;
}
.contagem strong {
  color: #ffab79;
  font-weight: 700;
}
.contagem span {
  white-space: nowrap;
}
.agendas {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 22px;
}
.aviso {
  display: flex;
  min-height: 250px;
  padding: 32px 24px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #51413b;
  border-radius: 16px;
  color: #fff;
  text-align: center;
}
.aviso svg {
  width: 42px;
  height: 42px;
  color: #ffab79;
}
.aviso h2,
.aviso h3 {
  font-size: 1.3rem;
  font-weight: 600;
}
.aviso p {
  max-width: 480px;
  color: #c4bdbd;
}
.aviso-sem-jogos {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;
  margin-bottom: 22px;
  border: 1px solid #ffcaab;
  border-radius: 12px;
  background: #fff3eb;
  color: #873600;
}
.aviso-sem-jogos svg {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.aviso-sem-jogos h3 {
  font-size: 0.95rem;
  font-weight: 650;
}
.aviso-sem-jogos p {
  margin-top: 2px;
  font-size: 0.85rem;
}
@media (max-width: 900px) {
  .agendas {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .pagina-agenda {
    padding: 32px 16px 48px;
  }
  .painel-filtros {
    padding: 20px;
  }
  .filtros {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .resumo {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
