<script setup>
import { computed } from 'vue';
import { times } from '@/data/times.js';
import { turmas } from '@/data/turmas.js';

const props = defineProps(['id', 'class'])
const time = computed(() => times.find(item => item.cod_time === props.id))

const turmasEmTime = computed(() => {
    return turmas.filter(item => item.cod_time === props.id);
});

function deletar() {
    for (let i = turmas.length - 1; i >= 0; i--) {
        if (turmas[i].cod_time == props.id) {
            turmas.splice(i, 1);
        }
    }
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
