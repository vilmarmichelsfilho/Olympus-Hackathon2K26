<script setup>
import { arbitros } from '@/data/arbitros.js';
import ArbitroNewCard from '../Cards/ArbitroNewCard.vue';
import { computed, ref } from 'vue';
import AdicionarArbitro from '../AdicionarArbitro.vue';
import editarrArbitro from '../EditarArbitroView.vue';
import { editarArbitro } from '@/Utils/editarUtils.js';
import { excluirArbitroSeguro } from '@/Utils/exclusaoUtils';

const props = defineProps(['torneio'])
const emits = defineEmits(['salvar','voltar'])

const arbitrosTorneio = computed(() => {
    return arbitros.filter(item => item.cod_torneio === props.torneio);
});

function excluirArbitro(id) {
  const resultado = excluirArbitroSeguro(id)
  if (!resultado.sucesso) alert(resultado.mensagem)
}
const adicionarrArbitro = ref(false)
const arbitroEditar = ref(false)
const arbitroEditarId = ref(null)
function abrirEditarArbitro(id) {
  arbitroEditarId.value = id
  arbitroEditar.value = true
}

function avancar() {
    if (arbitrosTorneio.value.length > 0) {
        emits('salvar')
    } else {
        alert('O torneio precisa ter pelo menos 1 arbitro adicionado')
    }
}
</script>

<template>
    <div class="sla">
        <div class="header">
            <h3>Árbitros</h3>
            <button @click="adicionarrArbitro = true" class="adicionar">Adicionar</button>
        </div>
        <div class="cards">
            <ul>
                <li>Nome</li>
                <li>Login</li>
                <li>Senha</li>
                <li>Ações</li>
            </ul>
            <ul class="cardss">
                <ArbitroNewCard v-for="(arbitro, index) in arbitrosTorneio" :key="arbitro.cod_arbitro"
                    :id="arbitro.cod_arbitro" :class="index % 2 === 0 ? 'item-branco' : 'item-preto'"
                    @excluir-arbitro="excluirArbitro" @editar-arbitro="abrirEditarArbitro"> 
                </ArbitroNewCard>
            </ul>
        </div>
    </div>
    <div class="nav">
        <button class="voltar" v-on:click.prevent="emits('voltar')">Voltar</button>
        <button class="salvar" v-on:click="avancar">Salvar Alterações</button>
    </div>
    <AdicionarArbitro
      @fecharAdicionarArbitro="adicionarrArbitro = false" :torneio="torneio"
      v-if="adicionarrArbitro"
    ></AdicionarArbitro>
    <editarrArbitro
      :arbitro="arbitros.find((a) => a.cod_arbitro === arbitroEditarId)"
      @atualizar="editarArbitro($event.cod_arbitro, $event)"
      @fecharEditarArbitro="arbitroEditar = false"
      v-if="arbitroEditar"
    />
</template>

<style scoped>
.adicionar {
    font-weight: bolder;
    font-size: 1.2rem;
    border: black solid 0.2vw;
    border-radius: 0.7vw;
    padding: 0.2vw 0.6vw;
}
button {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    transition: 0.3s;
}
button {
    cursor: pointer;
}
.salvar {
    background: #6EAC31;
    padding: 0.5vw 2vw;
    border-radius: 0.7vw;
    color: white;
}
.nav {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
}
.voltar {
    font-size: 1rem;
    font-weight: bolder;
    border: black solid 0.2vw;
    padding: 0 3vw;
    border-radius: 0.5vw;
}
.header {
    display: flex;
    justify-content: space-between;
}

.sla {
    background: #F8F8FA;
    padding: 1vw;
    border-radius: 0.5vw;
}

.cardss {
    flex-direction: column;
}

.cards {
    max-height: 27rem;
    overflow: auto;
}

ul {
    overflow: hidden;
    background: #F8F8FA;
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding: 0;
}
</style>
