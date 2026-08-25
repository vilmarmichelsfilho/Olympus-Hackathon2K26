<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
const props = defineProps(['nome', 'turma1', 'turma2', 'turma3', 'vitorias', 'empates', 'derrotas', 'pontuacao','variante'])
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
        <button class="edit"><EditIcon width="1vw"></EditIcon></button>
    </li>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
li {
    margin: 0 1vw;
    display: grid;
    grid-template-columns: 16vw 17vw 17vw 13.5vw 2vw;
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
</style>