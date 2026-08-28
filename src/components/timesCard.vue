<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
import AdicionarOuEditarTime from './AdicionarOuEditarTime.vue';
import { ref } from 'vue';
const props = defineProps(['nome', 'turma1', 'turma2', 'turma3', 'vitorias', 'empates', 'derrotas', 'pontuacao','variante','id'])

const add = ref(false)

</script>

<template>
    <li :class="props.variante">
        <h2>{{ props.nome }}</h2>
        <ul class="turmas">
            <div>
                <p>{{ props.turma1 }}</p>
                <p>{{ props.turma2 }}</p>
                <p>{{ props.turma3 }}</p>
            </div>
        </ul>
        <div class="pontuacao">
            <p>{{ vitorias }}/{{ empates }}/{{ derrotas }}</p>
        </div>
        <h3>{{ pontuacao }}</h3>
        <button class="edit" v-on:click.prevent="add=true"><EditIcon width="1.5vw"></EditIcon></button>
    </li>
    <AdicionarOuEditarTime v-if="add" @fechar="add=false" :nome1="props.nome" :um1="props.turma1" :dois1="props.turma2" :tres1="props.turma3" :vitorias1="props.vitorias" :empates1="props.empates" :derrotas1="props.derrotas" :tipo="'editar'" :id="props.id"></AdicionarOuEditarTime>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
h2 {
    color: #E85002;
}

li {
    margin: 0 1vw;
    display: grid;
    grid-template-columns: 16.5vw 17.5vw 17.5vw 13.5vw 2vw;
    align-items: center;
    min-height: 36px;

    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 0.8vw;

    padding: 0.6vw 0;

    border-bottom: solid 0.15vw black;
}
.turmas div {
    gap: 0.5vw;
    display: flex;
    padding: none;
    list-style: none;
    align-items: center;
}

button {
    background: none;
    border: none;
}

</style>