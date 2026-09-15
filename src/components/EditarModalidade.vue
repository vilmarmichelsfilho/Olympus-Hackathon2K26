<script setup>
import { ref, watch } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';

const props = defineProps(['modalidade']);
const emit = defineEmits(['fechar', 'atualizar']);
const local = ref('');
const nome = ref('');
const desc = ref('');
const tempo = ref('');
let imagem = null;

watch(
  () => props.modalidade,
  (nova) => {
    if (nova) {
      local.value = nova.localdojogo_modalidade || '';
      nome.value = nova.nome_modalidade || '';
      desc.value = nova.desc_modalidade || '';
      tempo.value = nova.tempojogemminutos_modalidade || '';
      imagem = nova.foto_modalidade || null;
    }
  },
  { immediate: true }
);

function checarDados() {
  if (local.value !== '') {
    if (nome.value !== '') {
      if (desc.value !== '') {
        if(tempo.value !== '') {
          if (imagem !== null) {
            emit('atualizar', {
              cod_modalidade: props.modalidade.cod_modalidade,
              nome_modalidade: nome.value,
              desc_modalidade: desc.value,
              tempojogemminutos_modalidade: Number(tempo.value),
              localdojogo_modalidade: local.value,
              foto_modalidade: imagem,
            })
            emit('fechar');
          } else {
            alert('Adicione uma imagem à modalidade');
          }
        } else {
          alert('Preencha o tempo da modalidade');
        }
      } else {
        alert('Preencha a descrição da modalidade');
      }
    } else {
      alert('Preencha o nome da modalidade');
    }
  } else {
    alert('Preencha o local da modalidade');
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
         <div class="local">
          <h3>Local da Modalidade</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="local">
          </div>
      </div>
        <div class="desc">
          <h3>Descrição da Modalidade</h3>
          <input type="text" placeholder="Digite" class="inputAnim" v-model="desc">
        </div>
      <div class="partedebaixo">
        <div class="tempo">
          <h3>Tempo da Modalidade (em minutos)</h3>
          <input type="number" min="0" max="99" v-model="tempo" oninput="if(this.value.length > 2) this.value = this.value.slice(0, 2);" onkeydown="return event.key !== '-' && event.key !== 'e' && event.key !== 'E'">
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
  margin: 0.2vw 0;
  background: none;
  border: none;
  font-weight: bolder;
  font-size: 1.1vw;
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
button.save:disabled {
    background: grey;
}

h2 {
  font-size: 2vw;
  font-weight: bolder;
}

h3 {
  font-size: 1vw;
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
  color:  rgb(152, 151, 151);
  background: #E2E2E2;
  border: solid #bdbdbd 0.1vw;
  font-size: 1.3vw;
  min-width: 20vw;
  max-width: 20vw;
  padding: 0.3vw 2vw;
  border-radius: 0.2vw;
  transition: 0.3s;
}
div.desc{
  text-align: center;
  place-items: center;

}
.imagem input{
  font-size: 0.8vw;
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
  h3{
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

  .inputs input {
    min-width: 70vw;
    font-size: 3.3vw;
    padding: 1vw 5vw;
  }

  .partedebaixo {
    flex-direction: column;
    text-align: center;
  }

  .partedebaixo input {
    min-width: 70vw;
    font-size: 3.3vw;
    padding: 1vw 5vw;
  }

  .imagem {
    max-width: none;
  }
div.desc input {
    min-width: 70vw;
    font-size: 3.3vw;
    padding: 1vw 5vw;
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
  button.cancel{
    font-size: 3vw;
  }
}
</style>
