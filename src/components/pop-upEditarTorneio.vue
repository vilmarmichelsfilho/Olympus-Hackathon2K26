<script setup>
import { ref, watch } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { jogos } from '@/data/jogos';
import { modalidades } from '@/data/modalidades';
const emit = defineEmits(['fecharEditarTorneio', 'atualizar']);
const props = defineProps(['torneio']);
const nome = ref('');
const dataInicio = ref('');
const dataFim = ref('');
const status = ref('');
watch(
  () => props.torneio,
  (nova) => {
    if (nova) {
      nome.value = nova.nome_torneio || '';
      dataInicio.value = nova.data_inicio_torneio || '';
      dataFim.value = nova.data_fim_torneio || '';
      status.value = nova.status_torneio || '';
    }
  },
  { immediate: true }
);
function checarDados() {
  if (nome.value !== '') {
    if (dataInicio.value !== '') {
      if (dataFim.value !== '') {
        if (dataFim.value < dataInicio.value) {
          alert('A data final não pode ser anterior à data inicial.')
          return
        }

        const codigosModalidades = new Set(
          modalidades
            .filter((modalidade) => modalidade.cod_torneio === props.torneio.cod_torneio)
            .map((modalidade) => modalidade.cod_modalidade),
        )
        const jogoForaDoPeriodo = jogos.some((jogo) => {
          if (!codigosModalidades.has(jogo.cod_modalidade)) return false
          const dataJogo = jogo.horario_jogo.split(' ')[0]
          return dataJogo < dataInicio.value || dataJogo > dataFim.value
        })
        if (jogoForaDoPeriodo) {
          alert('Existem jogos fora do novo período. Ajuste os jogos antes de reduzir as datas.')
          return
        }

        emit('atualizar', {
          cod_torneio: props.torneio.cod_torneio,
          nome_torneio: nome.value,
          data_inicio_torneio: dataInicio.value,
          data_fim_torneio: dataFim.value,
          status_torneio: status.value
        })
        emit('fecharEditarTorneio');
      } else {
        alert('Preencha a data de término do torneio')
      }
    } else {
      alert('Preencha a data de início do torneio')
    }
  } else {
    alert('Preencha o nome do torneio')
  }
}
function fechar() {
  emit('fecharEditarTorneio')
}
</script>
<template>
  <div class="overlay">
    <div class="dialog">
      <div class="titulos">
        <h2>Editar Torneio</h2>
        <h4>Controle dos torneios</h4>
      </div>
      <div class="inputs">
        <div class="nome">
          <h3>Nome do torneio</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="nome">
        </div>
        <div class="data">
          <div class="datainicio">
            <h3>Data de início</h3>
            <input type="date" placeholder="Digite" class="inputAnim" v-model="dataInicio">
          </div>
          <div class="datafim">
            <h3>Data de termino</h3>
            <input type="date" placeholder="Digite" class="inputAnim" v-model="dataFim">
          </div>
        </div>
        <div class="status">
            <h3>Status</h3>
            <select name="status" id="status" placeholder="Status" v-model="status">
              <option value="Planejado">PLANEJADO</option>
              <option value="Ativo">ATIVO</option>
              <option value="Finalizado">FINALIZADO</option>
            </select>
          </div>
          </div>

        <div class="botoes">
          <button style="align-items: center; display: flex; justify-content: center;" class="save"
            v-on:click.prevent="checarDados()">
            <ContentSaveOutlineIcon width="1.5vw" />Salvar
          </button>
          <button class="cancel" v-on:click="fechar()">Cancelar</button>
        </div>
      </div>
    </div>
</template>
<style scoped>
.inputs {
  display: flex;
  gap: 3vw;
  flex-direction: column;
}
.botoes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nome input {
  min-width: 100%;
  max-width: 100%;
}
.status select {
  min-width: 100%;
  max-width: 100%;
  text-align: center;
  color: rgb(152, 151, 151);
  background: #E2E2E2;
  font-size: 1.3vw;
  border-radius: 0.2vw;
}
.data{
  display: flex;
  gap: 3vw;
  flex-direction: row;
}
.data input{
  max-width: 50%;
}
button.cancel {
  margin: 0.2vw 0;
  background: none;
  border: none;
  font-weight: bolder;
  font-size: 1.1vw;
  cursor: pointer;
}

button.cancel:hover {
  text-decoration: underline;
}

button.save {
  background: #6EAC31;
  border: none;
  color: white;
  font-weight: bolder;
  font-size: 1.1vw;
  padding: 0.1vw 2vw;
  border-radius: 0.2vw;
  transition: 0.3s;
  margin-bottom: 0.5vw;
  cursor: pointer;
}

h2 {
  font-size: 2vw;
  font-weight: bolder;
}

h3 {
  font-size: 1.2vw;
  font-weight: bolder;
  margin-bottom: 0.2vw;
}

h4 {
  color: grey;
  font-size: 1vw;
  font-weight: bolder;
}

input {
  text-align: center;
  color: rgb(152, 151, 151);
  background: #E2E2E2;
  border: solid #bdbdbd 0.1vw;
  font-size: 1.3vw;
  min-width: 20vw;
  max-width: 20vw;
  padding: 0.3vw 2vw;
  border-radius: 0.2vw;
  transition: 0.3s;
}

input.inputAnim:focus {
  outline: none;
  transform: scale(1.05);
  font-weight: bolder;
  box-shadow: 0 0 10px 1px #DE6D1C;
  border: solid #DE6D1C 0.1vw;
}

.dialog {
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  color: black;
  background: white;
  border: solid rgb(185, 184, 184) 0.15vw;
  padding: 4vw 3vw;
  border-radius: 1vw;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

@media (max-width: 1000px) {
  h2 {
    font-size: 5vw;
  }

  h4 {
    font-size: 3vw;
  }

  h3 {
    font-size: 2vw;
  }

  .dialog {
    justify-content: center;
    min-width: 80vw;
  }

  .inputs {
    flex-direction: column;
    text-align: center;
  }
  .data{
    flex-direction: column;
    text-align: center;
  }
   .data input{
    min-width: 70vw;
    }
  div.status select{
    min-width: 70vw;
    max-width: 70vw;
    font-size: 3.3vw;
    padding: 1vw 5vw;
    }
  .inputs input {
    min-width: 70vw;
    font-size: 3.3vw;
    padding: 1vw 5vw;
  }

  button.save {
    padding: 0.5vw 2vw;
    font-size: 3vw;
  }

  button.cancel {
    font-size: 3vw;
  }
}
</style>
