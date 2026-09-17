<script setup>
import { computed } from 'vue'
import PencilOutlineIcon from '@iconify-vue/mdi/pencil-outline'
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline'
import { torneios } from '@/data/torneios'
import { modalidades } from '@/data/modalidades'
import { times } from '@/data/times'

const emit = defineEmits(['editar'])
const props = defineProps(['nome', 'dataInicio', 'dataFim', 'status', 'id'])
const ano = computed(() => props.dataInicio?.slice(2, 4) ?? '')
const quantidadeModalidades = computed(() => modalidades.filter((item) => item.cod_torneio === props.id).length)
const quantidadeTimes = computed(() => times.filter((item) => item.cod_torneio === props.id).length)
const classeStatus = computed(() => {
  if (props.status === 'Em andamento' || props.status === 'Ativo') return 'ativo'
  return props.status === 'Finalizado' ? 'finalizado' : 'agendado'
})

function formatarData(data, comAno = false) {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return comAno ? `${dia}/${mes}/${ano}` : `${dia}/${mes}`
}

function excluir() {
  const indice = torneios.findIndex((t) => t.cod_torneio === props.id)
  if (indice !== -1) torneios.splice(indice, 1)
}
</script>

<template>
  <li class="linha-torneio">
    <span class="ano" aria-hidden="true">{{ ano }}</span>
    <span class="nome">{{ nome }}</span>
    <span class="periodo periodo-desktop">{{ formatarData(dataInicio) }} — {{ formatarData(dataFim) }}</span>
    <span class="periodo periodo-mobile">{{ formatarData(dataInicio) }} — {{ formatarData(dataFim, true) }}</span>
    <span class="resumo">{{ quantidadeModalidades }} {{ quantidadeModalidades === 1 ? 'modalidade' : 'modalidades' }} · {{ quantidadeTimes }} {{ quantidadeTimes === 1 ? 'time' : 'times' }}</span>
    <span class="status" :class="classeStatus">
      <span class="status-ponto" aria-hidden="true"></span>
      <span class="status-desktop">{{ status }}</span>
      <span class="status-mobile">{{ classeStatus === 'ativo' ? 'Ativo' : status }}</span>
    </span>
    <span class="icones">
      <button type="button" class="acao icone-editar" :aria-label="`Editar ${nome}`" @click="emit('editar', props.id)">
        <PencilOutlineIcon aria-hidden="true" />
        <span>Editar</span>
      </button>
      <button type="button" class="acao icone-excluir" :aria-label="`Excluir ${nome}`" @click="excluir">
        <TrashCanOutlineIcon aria-hidden="true" />
        <span>Excluir</span>
      </button>
    </span>
  </li>
</template>

<style scoped>
.linha-torneio {
  list-style: none;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 0.3fr;
  align-items: center;
  margin: 0 1vw;
  padding: 1vw 0;
  border-bottom: 0.05vw solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1vw;
}
.status {
  padding: 0.2vw;
  border-radius: 999px;
  font-size: 1vw;
  text-align: center;
}
.status.ativo {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}
.status.agendado,
.status.finalizado {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}
.icones {
  display: flex;
  gap: 0.8vw;
}
.acao {
  display: inline-flex;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.acao svg {
  width: 1.1vw;
  height: 1.1vw;
}
.icone-editar {
  color: #ccc;
}
.icone-excluir {
  color: #e53935;
}
.ano,
.resumo,
.periodo-mobile,
.status-mobile,
.status-ponto,
.acao span {
  display: none;
}

@media (max-width: 768px) {
  .linha-torneio {
    grid-template-columns: 60px minmax(0, 1fr);
    grid-template-rows: auto auto auto auto;
    column-gap: 10px;
    align-items: start;
    min-height: 144px;
    margin: 0;
    padding: 26px 12px 12px 22px;
    border: 1px solid #b8b8b8;
    border-radius: 20px;
    background: white;
    box-shadow: 7px 9px 6px rgb(0 0 0 / 10%);
    color: #080808;
  }
  .ano {
    display: flex;
    grid-column: 1;
    grid-row: 1 / 4;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: 50px;
    height: 50px;
    margin-top: 2px;
    border-radius: 50%;
    background: #ed5000;
    color: white;
    font-size: 16px;
  }
  .nome {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
    font-family: 'Krona One', sans-serif;
    font-size: 16px;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
  .periodo-desktop,
  .status-desktop {
    display: none;
  }
  .periodo-mobile {
    display: block;
    grid-column: 2;
    grid-row: 2;
    margin-top: 1px;
    color: #999;
    font-size: 14px;
    line-height: 1.4;
  }
  .resumo {
    display: block;
    grid-column: 2;
    grid-row: 3;
    color: #999;
    font-size: 14px;
    line-height: 1.4;
  }
  .status {
    display: inline-flex;
    grid-column: 1;
    grid-row: 4;
    align-items: center;
    justify-content: center;
    justify-self: center;
    gap: 4px;
    max-width: 100%;
    padding: 3px 6px;
    border-radius: 999px;
    font-size: 10px;
    line-height: 1.5;
  }
  .status-mobile,
  .status-ponto {
    display: block;
  }
  .status-ponto {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
  .status.ativo {
    background: #203f28;
    color: white;
  }
  .status.ativo .status-ponto {
    background: #70c432;
  }
  .status.agendado {
    background: #fff1ce;
    color: #826000;
  }
  .status.finalizado {
    background: #fff1ce;
    color: #826000;
  }
  .icones {
    grid-column: 2;
    grid-row: 4;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 14px;
  }
  .acao {
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 30px;
    padding: 4px 10px;
    border: 1px solid #ddd;
    border-radius: 999px;
    background: #fafafa;
    font-family: 'Krona One', sans-serif;
    font-size: 12px;
    line-height: 1.25;
  }
  .acao span {
    display: inline;
  }
  .acao svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
  .icone-editar {
    color: #080808;
  }
  .icone-excluir {
    color: #ff6060;
  }
}

@media (max-width: 359px) {
  .linha-torneio {
    padding-left: 14px;
    column-gap: 8px;
  }
  .nome {
    font-size: 14px;
  }
  .acao {
    padding-inline: 7px;
    font-size: 10px;
  }
}
</style>
