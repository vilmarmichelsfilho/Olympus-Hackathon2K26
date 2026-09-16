<script setup>
import { arbitros } from '@/data/arbitros';
import { ref } from 'vue';

const props = defineProps(['id','class'])
const emits = defineEmits(['editar-arbitro', 'excluir-arbitro'])
const index = arbitros.findIndex(item => item.cod_arbitro === props.id)
</script>

<template>
<li :class="props.class">
<h4>{{ arbitros[index].nome_arbitro }}</h4>
<h4>{{ arbitros[index].login_arbitro }}</h4>
<h4 style="opacity: 0.5;">{{ arbitros[index].senha_arbitro }}</h4>
<div class="botoes">
    <button v-on:click.prevent="emits('editar-arbitro',props.id)">Editar</button>
    <button v-on:click.prevent="emits('excluir-arbitro',props.id)">Excluir</button>
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