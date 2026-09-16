<script setup>
import { times } from '@/data/times';
import { computed, ref } from 'vue';
import AdicionarOuEditarTime from '../AdicionarOuEditarTime.vue';

const props = defineProps(['id','class'])
const emits = defineEmits(['editar-time', 'excluir-time'])
const index = times.findIndex(item => item.cod_time === props.id)

const edit = ref(false)

function deletar() {
    times.splice(times.findIndex(item => item.cod_time === props.id),1)
}
</script>

<template>
<li :class="props.class">
<div class="info">
    <div class="color" :style="{background: times[index].cor_time}">

    </div>
    <h4>{{ times[index].nome_time }}</h4>
</div>
<h4>{{ times[index].pontuacaogeral_time }}</h4>
<div class="botoes">
    <button v-on:click.prevent="edit=true">Editar</button>
    <button v-on:click.prevent="deletar(index)">Excluir</button>
</div>
</li>

<AdicionarOuEditarTime @fechar="edit=false" v-if="edit" :id="id" :nome1="times[times.findIndex(item => item.cod_time === props.id)].nome_time" :cor="times[times.findIndex(item => item.cod_time === props.id)].cor_time" :tipo="'editar'" :escudo="times[times.findIndex(item => item.cod_time === props.id)].escudo_time" :pontuacao_geral="times[times.findIndex(item => item.cod_time === props.id)].pontuacaogeral_time" :torneio="times[times.findIndex(item => item.cod_time === props.id)].cod_torneio"></AdicionarOuEditarTime>

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