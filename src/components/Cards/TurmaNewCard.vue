<script setup>
import { computed, ref, onMounted } from 'vue';
import { times } from '@/data/times.js';
import { listarTurmas, excluirTurmasDoTime } from '@/services/turmasApi'

const props = defineProps(['id', 'class'])
const time = computed(() => times.find(item => item.cod_time === props.id))

const turmasEmTime = computed(() => turmasCarregadas.value.filter(item => Number(item.cod_time) === Number(props.id)))
const turmasCarregadas = ref([])
async function carregarTurmas() { turmasCarregadas.value = await listarTurmas() }
onMounted(carregarTurmas)

async function deletar() {
    await excluirTurmasDoTime(props.id)
    await carregarTurmas()
}

</script>

<template>
    <li v-if="time" :class="props.class">
        <div class="info">
            <div class="color" :style="{ background: time.cor_time }">

            </div>
            <h4>{{ time.nome_time }}</h4>
        </div>
        <h4>{{turmasEmTime.map(item => item.nome_turma).join(' - ')}}</h4>
        <div class="botoes">
            <button v-on:click.prevent="deletar">Excluir</button>
        </div>
    </li>

</template>

<style scoped>
.info {
    margin-left: 1vw;
    display: flex;
    align-items: center;
    gap: 0.3vw;
}

.color {
    width: 2vw;
    height: 2vw;
    border-radius: 2vw;
}

.item-preto {
    background: #e5e5e7;
}

.item-branco {
    background: white;
}

.info p {
    font-size: 0.5vw;
    opacity: 0.4;
}

li {
    padding: 0.8vw 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    background: none;
    border: none;
    color: #E85002;
    cursor: pointer;
}
</style>
