<script setup>
import { times } from '@/data/times';
import { computed, ref } from 'vue';
import { excluirTurmasDoTime } from '@/services/turmasApi'
import { excluirEntidade } from '@/services/entidadesApi'
import AdicionarOuEditarTime from '../AdicionarOuEditarTime.vue';

const props = defineProps(['id','class'])
const time = computed(() => times.find(item => item.cod_time === props.id))

const edit = ref(false)

async function deletar() {
    const indice = times.findIndex(item => item.cod_time === props.id)
    if (indice === -1) return

    await excluirTurmasDoTime(props.id)
    await excluirEntidade('times', props.id, times)
}
</script>

<template>
<li v-if="time" :class="props.class">
<div class="info">
    <div class="color" :style="{background: time.cor_time}">

    </div>
    <h4>{{ time.nome_time }}</h4>
</div>
<h4>{{ time.pontuacaogeral_time }}</h4>
<div class="botoes">
    <button v-on:click.prevent="edit=true">Editar</button>
    <button v-on:click.prevent="deletar">Excluir</button>
</div>
</li>

<AdicionarOuEditarTime @fechar="edit=false" v-if="edit && time" :id="id" :nome1="time.nome_time" :cor="time.cor_time" :tipo="'editar'" :escudo="time.escudo_time" :pontuacao_geral="time.pontuacaogeral_time" :torneio="time.cod_torneio"></AdicionarOuEditarTime>

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
