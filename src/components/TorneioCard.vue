<script setup>
import PencilOutlineIcon from '@iconify-vue/mdi/pencil-outline'
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline'
import { onMounted } from 'vue'
import { apagarTorneio } from '@/Utils/exclusaoUtils'
import { modalidades } from '@/data/modalidades'
import { turmas } from '@/data/turmas'
import { times } from '@/data/times'
import { arbitros } from '@/data/arbitros'
import { torneios } from '@/data/torneios'
import { AlterarCodTorneio, codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
import { useJogos } from '@/composables/useJogos'
import { useParticipa } from '@/composables/useParticipa'
const emit = defineEmits(['editar'])
const props = defineProps(['nome', 'dataInicio', 'dataFim', 'status', 'id'])
const { jogos, carregarJogos, removerJogoLocal } = useJogos()
const { participa, carregarParticipa } = useParticipa()
const API_URL = 'http://localhost:3000';
async function carregarDados() {
  await Promise.all([carregarJogos(), carregarParticipa()])
}
onMounted(carregarDados);



function formatarData(data) {
    const [, mes, dia] = data.split('-')
    return `${dia}/${mes}`
}
async function excluir() {
  const confirmarExclusao = window.confirm('Deseja realmente excluir este torneio?')
  if (!confirmarExclusao) return

  const modalidadesDoTorneio = new Set(
    modalidades
      .filter((modalidade) => modalidade.cod_torneio === props.id)
      .map((modalidade) => modalidade.cod_modalidade),
  )
  const jogosDoTorneio = jogos.value.filter((jogo) =>
    modalidadesDoTorneio.has(Number(jogo.id_modalidade)),
  )

  for (const jogo of jogosDoTorneio) {
    const resposta = await fetch(`${API_URL}/jogos/${jogo.id}`, { method: 'DELETE' })
    if (!resposta.ok) {
      alert('Não foi possível excluir os jogos do torneio.')
      return
    }
    removerJogoLocal(jogo.id)
  }

  apagarTorneio(props.id, {
    participa: participa.value,
    codigosJogos: jogosDoTorneio.map((jogo) => jogo.id),
    modalidades,
    turmas,
    times,
    arbitros,
    torneios,
  })
  await carregarDados()
    if (codTorneioSelecionadoAdm.value === props.id) AlterarCodTorneio(null)
}
</script>

<template>
    <li class="linha-torneio">
        <span class="nome">{{ nome }}</span>
        <span class="periodo">{{ formatarData(dataInicio) }} — {{ formatarData(dataFim) }}</span>
        <span class="status" :class="status === 'Ativo' ? 'ativo' : 'agendado'">{{ status }}</span>
        <span class="icones">
            <PencilOutlineIcon class="icone-editar" @click="emit('editar', props.id)" />
            <TrashCanOutlineIcon class="icone-excluir" @click="excluir" />
        </span>
    </li>
</template>

<style scoped>
.linha-torneio {
    list-style: none;
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 0.3fr;
    align-items: center;
    gap: 1rem;
    margin: 0 1.5rem;
    padding: 1rem 0;
    border-bottom: 0.05vw solid rgba(255, 255, 255, 0.1);
    color: white;
    font-size: clamp(0.75rem, 0.9vw, 0.9rem);
}

.status {
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.8rem;
    text-align: center;
}

.status.ativo {
    background: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
}

.status.agendado {
    background: rgba(255, 193, 7, 0.2);
    color: #FFC107;
}

.icones {
    display: flex;
    gap: 0.8vw;
}

.icones svg {
    width: 1.15rem;
    height: 1.15rem;
}

.icone-editar {
    color: #ccc;
    cursor: pointer;
}

.icone-excluir {
    color: #E53935;
    cursor: pointer;
}

@media (max-width: 768px) {
    .linha-torneio {
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas:
            'nome status'
            'periodo icones';
        gap: 0.6rem 1rem;
        margin: 0;
        padding: 1rem;
        border: 1px solid #e3e5eb;
        border-radius: 8px;
        background: #fff;
        color: #17171a;
        font-size: 0.85rem;
    }

    .nome {
        grid-area: nome;
        overflow: hidden;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .periodo {
        grid-area: periodo;
        color: #6b7280;
    }

    .status {
        grid-area: status;
        min-width: 5.5rem;
    }

    .icones {
        grid-area: icones;
        gap: 1rem;
    }
}
</style>
