<script setup>
import PencilOutlineIcon from '@iconify-vue/mdi/pencil-outline'
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline'
import { excluirTorneioCompleto } from '@/Utils/exclusaoUtils'
import { AlterarCodTorneio, codTorneioSelecionadoAdm } from '@/Utils/cod_torneioAdmUtils'
const emit = defineEmits(['editar'])
const props = defineProps(['nome', 'dataInicio', 'dataFim', 'status', 'id'])


function formatarData(data) {
    const [, mes, dia] = data.split('-')
    return `${dia}/${mes}`
}
function excluir() {
    excluirTorneioCompleto(props.id)
    if (codTorneioSelecionadoAdm.value === props.id) AlterarCodTorneio(null)
}
</script>

<template>
    <li class="linha-torneio">
        <span class="nome">{{ nome }}</span>
        <span class="periodo">{{ formatarData(dataInicio) }} — {{ formatarData(dataFim) }}</span>
        <span class="status" :class="status === 'Ativo' ? 'ativo' : 'agendado'">{{ status }}</span>
        <span class="icones">
            <PencilOutlineIcon width="1.1vw" class="icone-editar" @click="emit('editar', props.id)" />
            <TrashCanOutlineIcon width="1.1vw" class="icone-excluir" @click="excluir" />
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
    padding: 0.2vw 0.2vw;
    border-radius: 999px;
    font-size: 1vw;
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

.icone-editar {
    color: #ccc;
    cursor: pointer;
}

.icone-excluir {
    color: #E53935;
    cursor: pointer;
}
</style>
