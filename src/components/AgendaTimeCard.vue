<script setup>
import CalendarOutlineIcon from '@iconify-vue/mdi/calendar-outline'
import MapMarkerOutlineIcon from '@iconify-vue/mdi/map-marker-outline'

defineProps({
  time: { type: Object, required: true },
  modalidadeFiltrada: { type: Boolean, default: false },
})

const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
})
</script>

<template>
  <article class="agenda-time" :aria-labelledby="`agenda-time-${time.cod_time}`">
    <header class="cabecalho-time">
      <div class="identidade-time">
        <img v-if="time.escudo_time" :src="time.escudo_time" alt="" class="escudo" />
        <div>
          <p class="rotulo">Agenda do time</p>
          <h3 :id="`agenda-time-${time.cod_time}`">{{ time.nome_time }}</h3>
        </div>
      </div>
      <span class="quantidade" :class="{ 'sem-jogos': !time.jogos.length }">
        {{
          time.jogos.length
            ? `${time.jogos.length} ${time.jogos.length === 1 ? 'jogo' : 'jogos'}`
            : 'Sem jogos'
        }}
      </span>
    </header>

    <ul v-if="time.jogos.length" class="lista-jogos">
      <li v-for="(jogo, indice) in time.jogos" :key="jogo.cod_jogo" class="jogo">
        <div class="detalhes-jogo">
          <div class="modalidade">
            <span>{{ jogo.modalidade }}</span>
            <span v-if="indice === 0" class="proximo">Próximo jogo</span>
          </div>
          <p class="confronto">
            {{ jogo.participantes[0].nome_time }} <span>×</span>
            {{ jogo.participantes[1].nome_time }}
          </p>
          <p class="local"><MapMarkerOutlineIcon aria-hidden="true" /> {{ jogo.local }}</p>
          <p v-if="jogo.fase_jogo" class="fase">{{ jogo.fase_jogo }}</p>
        </div>
        <time class="data-jogo" :datetime="jogo.dataHora">
          <strong>{{ jogo.horario }}</strong>
          <span>{{ formatadorData.format(new Date(jogo.instante)) }}</span>
        </time>
      </li>
    </ul>
    <div v-else class="estado-vazio">
      <CalendarOutlineIcon aria-hidden="true" />
      <p>Nenhum próximo jogo agendado</p>
      <span v-if="modalidadeFiltrada"
        >Este time não tem partidas futuras na modalidade selecionada.</span
      >
      <span v-else>Este time não tem partidas futuras agendadas neste torneio.</span>
    </div>
  </article>
</template>

<style scoped>
.agenda-time {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e6e3e1;
  border-radius: 16px;
  background: #fff;
  color: #17171a;
}
.cabecalho-time,
.identidade-time,
.modalidade,
.local {
  display: flex;
  align-items: center;
}
.cabecalho-time {
  justify-content: space-between;
  gap: 12px;
  padding: 22px 24px;
  border-bottom: 1px solid #eee9e5;
}
.identidade-time {
  gap: 14px;
  min-width: 0;
}
.escudo {
  width: 46px;
  height: 46px;
  object-fit: contain;
}
.rotulo {
  color: #757579;
  font-size: 0.75rem;
}
h3 {
  overflow-wrap: anywhere;
  font-size: 1.25rem;
  font-weight: 700;
}
.quantidade {
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 20px;
  background: #fff0e6;
  color: #a73b00;
  font-size: 0.75rem;
  font-weight: 600;
}
.sem-jogos {
  background: #f0f0f2;
  color: #66666c;
}
.lista-jogos {
  padding: 0;
  margin: 0;
  list-style: none;
}
.jogo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
}
.jogo + .jogo {
  border-top: 1px solid #eee9e5;
}
.detalhes-jogo {
  min-width: 0;
}
.modalidade {
  flex-wrap: wrap;
  gap: 8px;
  color: #ae3d00;
  font-size: 0.8rem;
  font-weight: 600;
}
.proximo {
  padding: 2px 6px;
  border-radius: 4px;
  background: #edf5e8;
  color: #416e26;
  font-size: 0.65rem;
}
.confronto {
  margin: 6px 0;
  overflow-wrap: anywhere;
  font-size: 1.1rem;
  font-weight: 650;
}
.confronto span {
  padding: 0 4px;
  color: #929297;
}
.local,
.fase {
  color: #6e6e75;
  font-size: 0.8rem;
}
.local {
  gap: 4px;
}
.local svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.data-jogo {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  text-align: right;
}
.data-jogo strong {
  color: #17171a;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
}
.data-jogo span {
  color: #6e6e75;
  font-size: 0.75rem;
}
.estado-vazio {
  display: flex;
  min-height: 176px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 24px;
  text-align: center;
}
.estado-vazio svg {
  width: 30px;
  height: 30px;
  margin-bottom: 6px;
  color: #929297;
}
.estado-vazio p {
  font-weight: 600;
}
.estado-vazio span {
  max-width: 300px;
  color: #6e6e75;
  font-size: 0.85rem;
}
@media (max-width: 600px) {
  .cabecalho-time,
  .jogo {
    padding: 18px;
  }
  .jogo {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
  .data-jogo {
    flex-direction: row;
    align-items: baseline;
    gap: 10px;
    text-align: left;
    flex-wrap: wrap;
  }
  .data-jogo strong {
    font-size: 1.35rem;
  }
}
</style>
