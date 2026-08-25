<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
const props = defineProps(['nome', 'turma1', 'turma2', 'turma3', 'vitorias', 'empates', 'derrotas', 'pontuacao'])
</script>

<template>
    <li>
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
        <button><EditIcon width="1vw"></EditIcon></button>
    </li>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

li {
    display: grid;
    grid-template-columns: 16.5vw 17.5vw 17.4vw 15vw 40px;
    align-items: center;
    min-height: 36px;

    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
}
.turmas div {
    gap: 0.5vw;
    display: flex;
    padding: none;
    list-style: none;
    align-items: center;
}
</style>