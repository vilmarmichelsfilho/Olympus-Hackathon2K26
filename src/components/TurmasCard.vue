<script setup>
import Confirm from './Confirm.vue';
import EditOutlineIcon from '@iconify-vue/mdi/edit-outline';
import TrashCanOutlineIcon from '@iconify-vue/mdi/trash-can-outline';
import { ref } from 'vue';
const props = defineProps(['tecnico','ano','serie','id']);
const emit = defineEmits(['editar', 'excluir']);
import { excluir } from '@/Utils/turmasUtils';

const edit = ref(false);
</script>

<template>
<tr>

    <td>Tec: {{ props.tecnico }}</td>
    <td>Ano: {{ props.ano }}</td>
    <td>Série: {{ props.serie }}</td>
    <td class="botoes">
        <button class="editar" v-on:click.prevent="emit('editar')"><EditOutlineIcon height="2vw"></EditOutlineIcon>Editar</button>
        <button class="excluir" v-on:click.prevent="emit('excluir')"><TrashCanOutlineIcon height="2vw"></TrashCanOutlineIcon>Excluir</button>
    </td>
    <Confirm v-show="edit" @cancelar="edit=false" @excluir="excluir(props.id)"></Confirm>
  </tr>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
td {
    color: black;
    font-family: "Krona One", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.4vw;
}
tr {
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
    cursor: pointer;
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
@media (max-width: 768px) {
    td {
        font-size: 2vw;
    }
    button {
        padding: 0.5vw 2vw;
    }
}
</style>
