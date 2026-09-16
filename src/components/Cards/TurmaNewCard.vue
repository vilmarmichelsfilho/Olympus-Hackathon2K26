<script setup>
import { computed, ref } from 'vue';
import AdicionarOuEditar from '../AdicionarOuEditar.vue';
import { times } from '@/data/times.js';
import { turmas } from '@/data/turmas.js';
import { adicionar } from '@/Utils/turmasUtils.js';

const props = defineProps(['id','class'])
const index = times.findIndex(item => item.cod_time === props.id)

const edit = ref(false)

const turmasEmTime = computed(() => {
    return turmas.filter(item => item.cod_time === props.id);
});

</script>

<template>
<li :class="props.class">
<div class="info">
    <div class="color" :style="{background: times[index].cor_time}">

    </div>
    <h4>{{ times[index].nome_time }}</h4>
</div>
<h4>{{ turmasEmTime.map(item => item.nome_turma).join(' - ') }}</h4>
<div class="botoes">
    <button v-on:click.prevent="edit=true">Editar</button>
    <button v-on:click.prevent="deletar(index)">Excluir</button>
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