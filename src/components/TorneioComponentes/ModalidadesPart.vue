<script setup>
import { modalidades } from '@/data/modalidades';
import ModalidadesNewCard from '../Cards/ModalidadesNewCard.vue';
import { ref, computed, onMounted } from 'vue';
import AdicionarModalidade from '../AdicionarModalidade.vue';
import EditarModalidade from '../EditarModalidade.vue';
import { editarModalidade } from '@/Utils/editarUtils.js';
import { apagarModalidade } from '@/Utils/exclusaoUtils';
import { useJogos } from '@/composables/useJogos';
import { useParticipa } from '@/composables/useParticipa';
const { jogos, carregarJogos, removerJogoLocal } = useJogos()
const { participa, carregarParticipa } = useParticipa()
const API_URL = 'http://localhost:3000';
async function carregarDados() {
  await Promise.all([carregarJogos(), carregarParticipa()])
}
onMounted(carregarDados);
async function exluirModalidade(id) {
    const confirmarExclusao = window.confirm('Deseja realmente excluir esta modalidade?')
    if (!confirmarExclusao) return

    const jogosDaModalidade = jogos.value.filter(
        (jogo) => Number(jogo.id_modalidade) === Number(id),
    )

    for (const jogo of jogosDaModalidade) {
        const resposta = await fetch(`${API_URL}/jogos/${jogo.id}`, { method: 'DELETE' })
        if (!resposta.ok) {
            alert('Não foi possível excluir os jogos da modalidade.')
            return
        }
        removerJogoLocal(jogo.id)
    }

    apagarModalidade(id, {
        participa: participa.value,
        modalidades,
        codigosJogos: jogosDaModalidade.map((jogo) => jogo.id),
    })
    await carregarDados()
}
const props = defineProps(['torneio'])
const emits = defineEmits(['salvar', 'voltar'])

const modalidadesTorneio = computed(() => {
    return modalidades.filter(item => item.cod_torneio === props.torneio);
});
const modalidadeAdicionar = ref(false)

const modalidadeEditar = ref(false)
const modalidadeEditarId = ref(null)
function abrirEditar(id) {
    modalidadeEditarId.value = id
    modalidadeEditar.value = true
}
function avancar() {
    if (modalidadesTorneio.value.length > 0) {
        emits('salvar')
    } else {
        alert('O torneio deve ter pelo menos uma modalidade cadastrada')
    }
}
</script>

<template>
    <div class="sla">
        <div class="header">
            <h3>Modalides</h3>
            <button @click="modalidadeAdicionar = true" class="adicionar">Adicionar</button>
        </div>
        <div class="cards">
            <ul>
                <li>Modalidades</li>
                <li>Local</li>
                <li>Tempo</li>
                <li>Ações</li>
            </ul>
            <ul class="cardss">
                <ModalidadesNewCard v-for="(modalidade, index) in modalidadesTorneio" :key="modalidade.cod_modalidade"
                    :id="modalidade.cod_modalidade" :class="index % 2 === 0 ? 'item-branco' : 'item-preto'"
                    @excluir-modalidade="exluirModalidade" @editar-modalidade="abrirEditar">
                </ModalidadesNewCard>
            </ul>
        </div>
    </div>
    <div class="nav">
        <button class="voltar" @click="emits('voltar')">Voltar</button>
        <button class="salvar" v-on:click="avancar">Salvar Alterações</button>
    </div>

    <AdicionarModalidade v-show="modalidadeAdicionar" @fechar-adicionar-modalidade="modalidadeAdicionar = false"
        :torneio="torneio"></AdicionarModalidade>
    <EditarModalidade :modalidade="modalidades.find((m) => m.cod_modalidade === modalidadeEditarId)"
        @atualizar="editarModalidade($event.cod_modalidade, $event)" @fechar="modalidadeEditar = false"
        v-show="modalidadeEditar">
    </EditarModalidade>
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
