<script setup>
import { ref, watch } from 'vue';
import CloseIcon from '@iconify-vue/mdi/close';
import UploadIcon from '@iconify-vue/mdi/upload';

const props = defineProps({
  modalidade: Object
});

const emit = defineEmits(['fechar', 'atualizar']);

const nome = ref('');
const descricao = ref('');
const imagem = ref('');
const tempo = ref('');

// Preenche os campos quando a modalidade selecionada mudar
watch(() => props.modalidade, (novaVal) => {
  if (novaVal) {
    nome.value = novaVal.nome || '';
    descricao.value = novaVal.desc || '';
    imagem.value = novaVal.image || '';
    tempo.value = novaVal.tempo || '';
  }
}, { immediate: true });

function salvarEdicao() {
  emit('atualizar', {
    id: props.modalidade.id,
    nome: nome.value,
    desc: descricao.value,
    image: imagem.value,
    tempo: tempo.value
  });
  emit('fechar');
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <h2>Editar Modalidade</h2>
          <p>Controle das Modalidades</p>
        </div>
        <button class="close-btn" @click="$emit('fechar')">
          <CloseIcon height="1.2em" />
        </button>
      </div>

      <div class="modal-body">
        <div class="input-group">
          <label>Modalidade*</label>
          <input type="text" v-model="nome" placeholder="-" />
        </div>

        <div class="input-group">
          <label>Descrição*</label>
          <textarea v-model="descricao" placeholder="text"></textarea>
        </div>

        <div class="row-group">
          <div class="input-group half">
            <label>PNG*</label>
            <div class="file-input-wrapper">
              <input type="text" v-model="imagem" placeholder="photo" readonly />
              <button type="button"><UploadIcon height="1em" /> selecione</button>
            </div>
          </div>

          <div class="input-group half">
            <label>Tempo</label>
            <input type="text" v-model="tempo" placeholder="-" />
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="save-btn" @click="salvarEdicao">Salvar Alterações</button>
        <button class="clear-btn" @click="$emit('fechar')">Cancelar / Limpar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Aproveita exatamente os mesmos estilos do modal de Adicionar */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: #FFFFFF;
  width: 100%;
  max-width: 550px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  font-family: sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 1.4rem;
  color: #111827;
  margin: 0 0 4px 0;
}

.modal-header p {
  font-size: 0.85rem;
  color: #6B7280;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 6px;
}

.input-group input,
.input-group textarea {
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 0.95rem;
  color: #1F2937;
  outline: none;
}

.input-group textarea {
  resize: none;
  height: 80px;
}

.row-group {
  display: flex;
  gap: 15px;
}

.half {
  flex: 1;
}

.file-input-wrapper {
  display: flex;
  gap: 8px;
}

.file-input-wrapper input {
  flex: 1;
}

.file-input-wrapper button {
  background-color: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  gap: 10px;
}

.save-btn {
  background-color: #16A34A;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background-color: #15803D;
}

.clear-btn {
  background: none;
  border: none;
  color: #6B7280;
  font-size: 0.85rem;
  cursor: pointer;
}
</style>
