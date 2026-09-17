<script setup>
import { modalidades } from '@/data/modalidades';
import { computed } from 'vue';

const props = defineProps(['id','class'])
const emits = defineEmits(['editar-Modalidade', 'excluir-Modalidade'])
const modalidade = computed(() => modalidades.find(item => item.cod_modalidade === props.id))
</script>

<template>
<li v-if="modalidade" :class="props.class">
<div class="info">
    <h4>{{ modalidade.nome_modalidade }}</h4>
    <p>Esporte coletivo</p>
</div>
<h4>{{ modalidade.localdojogo_modalidade }}</h4>
<h4>{{ modalidade.tempojogemminutos_modalidade }} min</h4>
<div class="botoes">
    <button v-on:click.prevent="emits('editar-Modalidade',props.id)">Editar</button>
    <button v-on:click.prevent="emits('excluir-Modalidade',props.id)">Excluir</button>
</div>
</li>
</template>

<style scoped>
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
}
button {
    background: none;
    border: none;
    color: #E85002;
    cursor: pointer;
}
</style>
