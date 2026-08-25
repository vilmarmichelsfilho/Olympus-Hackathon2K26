<script setup>
import { ref, watch } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';

const props = defineProps(['modalidade']);
const emit = defineEmits(['fechar', 'atualizar']);

const nome = ref('');
const desc = ref('');
const tempo = ref('');
let imagem = null;

watch(
  () => props.modalidade,
  (nova) => {
    if (nova) {
      nome.value = nova.nome ?? '';
      desc.value = nova.desc ?? '';
      tempo.value = nova.tempo ?? '';
      imagem = nova.image ?? null;
    }
  },
  { immediate: true }
);

function checarDados() {
  if (nome.value !== '') {
    if (desc.value !== '') {
      if (imagem !== null) {
        emit('atualizar', {
          id: props.modalidade.id,
          nome: nome.value,
          desc: desc.value,
          tempo: tempo.value,
          image: imagem
        });
        emit('fechar');
      } else {
        alert('Adicione uma imagem à modalidade');
      }
    } else {
      alert('Preencha a descrição da modalidade');
    }
  } else {
    alert('Preencha o nome da modalidade');
  }
}

function fechar() {
  emit('fechar');
}

function pegarImagem(event) {
  const arquivo = event.target.files[0];
  if (!arquivo) return;
  const reader = new FileReader();
  reader.onload = () => {
    imagem = reader.result;
  };
  reader.readAsDataURL(arquivo);
}
</script>

<template>
  <div class="overlay">
    <div class="dialog">
      <div class="titulos">
        <h2>Editar Modalidade</h2>
        <h4>Controle das modalidades</h4>
      </div>
      <div class="inputs">
        <div class="nome">
          <h3>Nome da Modalidade</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="nome">
        </div>
        <div class="desc">
          <h3>Descrição da Modalidade</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="desc">
        </div>
      </div>
      <div class="partedebaixo">
        <div class="tempo">
          <h3>Tempo da Modalidade</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="tempo">
        </div>
        <div class="imagem">
          <h3>Imagem da Modalidade</h3>
          <input type="file" accept="image/png, image/jpeg, .jpg" @change="pegarImagem">
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
}

.partedebaixo {
  display: flex;
  gap: 3vw;
  margin-top: 1vw;
}

.botoes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


button.cancel {
  background: none;
  border: none;
  font-weight: bolder;
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
}

h2 {
  font-size: 2vw;
  font-weight: bolder;
}

h3 {
  font-weight: bolder;
  margin-bottom: 0.2vw;
}

h4 {
  color: grey;
  font-size: 1vw;
  font-weight: bolder;
}

input {
  color: gray;
  background: #E2E2E2;
  border: solid #bdbdbd 0.1vw;
  border-radius: 0.2vw;
  transition: 0.3s;
}

input.inputAnim:focus {
    outline: none;
    transform: scale(1.05);
    font-weight: bolder;
    border: solid #DE6D1C 0.1vw;
    box-shadow: 0 0 10px 1px #DE6D1C;
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

  .dialog {
    justify-content: center;
    min-width: 80vw;
  }

  .inputs {
    flex-direction: column;
    text-align: center;
  }

  .inputs input {
    min-width: 70vw;
  }

  .partedebaixo {
    flex-direction: column;
    text-align: center;
  }

  .partedebaixo input {
    min-width: 70vw;
  }

  .imagem {
    max-width: none;
  }

  .partedebaixo .imagem input {
    text-align: center;
    font-size: 2.8vw;
    min-width: 72vw;
  }

  button.save {
    padding: 0.5vw 2vw;
    font-size: 3vw;
  }
}
</style>
