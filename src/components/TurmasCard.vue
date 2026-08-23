<script setup>
import EditOutlineIcon from '@iconify-vue/mdi/edit-outline';
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline';
const props = defineProps(['nome']);
</script>

<template>
<li>
    <h3>{{ props.nome }}</h3>
    <div class="botoes">
        <button class="editar"><EditOutlineIcon height="2vw"></EditOutlineIcon>Editar</button>
        <button class="excluir"><TrashCanOutlineIcon height="2vw"></TrashCanOutlineIcon>Excluir</button>
    </div>
</li>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
h3 {
    color: black;
    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
}
li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 0.2vw #0000000e;
    padding: 1vw 1vw;
}
.botoes {
    display: flex;
    align-items: center;
    gap: 0.5vw;
}
button {
    display: flex;
    align-items: center;
    padding: 0.2vw 1vw;
    background: white;
    border: none;
    transition: 0.3s;
    border-radius: 0.5vw;
}
.editar {
    color: black;
    border: solid 0.1vw black;
}
.editar:hover {
    background: #D9D9D9;
}
.excluir {
    color: #FF6961;
    border: solid 0.1vw #FF6961;
}
.excluir:hover {
    background: #ffcac7;
}
</style>