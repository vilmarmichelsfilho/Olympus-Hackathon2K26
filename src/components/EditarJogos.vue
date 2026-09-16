<script setup>
import { computed, ref, watch } from 'vue';
import ContentSaveOutlineIcon from '@iconify-vue/mdi/content-save-outline';
import { modalidades } from '@/data/modalidades';
import { times } from '@/data/times';
import { participa } from '@/data/participa';

const emit = defineEmits(['fecharEditarJogo', 'atualizar']);
const props = defineProps(['jogo']);

const codModalidade = ref('');
const data = ref('');
const hora = ref('');
const status = ref('');
const time1 = ref('');
const time2 = ref('');

const codTorneioDoJogo = computed(() => {
  const modalidadeDoJogo = modalidades.find(
    (modalidade) => modalidade.cod_modalidade === props.jogo?.cod_modalidade
  )
  return modalidadeDoJogo?.cod_torneio
})

const modalidadesDoTorneio = computed(() =>
  modalidades.filter((modalidade) => modalidade.cod_torneio === codTorneioDoJogo.value)
)

const timesDoTorneio = computed(() =>
  times.filter((time) => time.cod_torneio === codTorneioDoJogo.value)
)

watch(
  () => props.jogo,
  (novo) => {
    if (novo) {
      codModalidade.value = novo.cod_modalidade || '';
      status.value = novo.status_jogo || '';

      const [d, h] = (novo.horario_jogo || ' ').split(' ');
      data.value = d;
      hora.value = h;

      const participantes = participa
        .filter(p => p.cod_jogo === novo.cod_jogo)
        .sort((a, b) => a.posicao_participante - b.posicao_participante);

      time1.value = participantes[0]?.cod_time || '';
      time2.value = participantes[1]?.cod_time || '';
    }
  },
  { immediate: true }
);

function checarDados() {
  if (codModalidade.value !== '') {
    if (data.value !== '') {
      if (hora.value !== '') {
        if (time1.value !== '' && time2.value !== '') {
          if (time1.value !== time2.value) {
            emit('atualizar', {
              cod_jogo: props.jogo.cod_jogo,
              cod_modalidade: codModalidade.value,
              horario_jogo: `${data.value} ${hora.value}`,
              status_jogo: status.value,
              time1: time1.value,
              time2: time2.value
            })
            emit('fecharEditarJogo');
          } else {
            alert('Os dois times não podem ser o mesmo')
          }
        } else {
          alert('Selecione os dois times')
        }
      } else {
        alert('Preencha o horário do jogo')
      }
    } else {
      alert('Preencha a data do jogo')
    }
  } else {
    alert('Selecione a modalidade')
  }
}

function fechar() {
  emit('fecharEditarJogo')
}
</script>

<template>
  <div class="overlay">
    <div class="dialog">
      <div class="titulos">
        <h2>Editar Jogo</h2>
        <p>Controle dos jogos</p>
 </div>
      <div class="inputs">
        <div class="nome">
          <h3>Modalidade</h3>
          <select class="inputAnim" v-model="codModalidade">
            <option v-for="m in modalidadesDoTorneio" :key="m.cod_modalidade" :value="m.cod_modalidade">
              {{ m.nome_modalidade }}
            </option>
          </select>
        </div>

        <div class="data">
          <div class="datainicio">
            <h3>Time 01</h3>
            <select class="inputAnim" v-model="time1">
              <option disabled value="">A definir</option>
              <option v-for="t in timesDoTorneio" :key="t.cod_time" :value="t.cod_time">
                {{ t.nome_time }}
              </option>
            </select>
          </div>
          <div class="datafim">
            <h3>Time 02</h3>
            <select class="inputAnim" v-model="time2">
              <option disabled value="">A definir</option>
              <option v-for="t in timesDoTorneio" :key="t.cod_time" :value="t.cod_time">
                {{ t.nome_time }}
              </option>
            </select>
          </div>
        </div>

        <div class="data">
          <div class="datainicio">
            <h3>Data</h3>
            <input type="date" class="inputAnim" v-model="data">
          </div>
          <div class="datafim">
            <h3>Horário</h3>
            <input type="time" class="inputAnim" v-model="hora">
          </div>
        </div>

        <div class="status">
          <h3>Status</h3>
          <select v-model="status">
            <option value="Agendado">AGENDADO</option>
            <option value="AoVivo">AO VIVO</option>
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
}
.dialog {
  background: white;

  width: 46vw;
  max-width: 510px;
  min-width: 450px;

  padding: 2vw 3.5vw 1.5vw;

  border-radius: 1.2vw;

  box-sizing: border-box;

  position: relative;

  max-height: 90vh;
  overflow-y: auto;
}


.titulos h2 {
  color: #111;
  font-size: 2vw;
  margin: 0;

}

.titulos h4 {
  color: #999;
  font-size: 1vw;

  margin: 0.5vw 0 0;

  font-weight: normal;
}



.inputs {
  display: flex;
  flex-direction: column;
  gap: 1.1vw;
}



.inputs h3 {
  color: #111;

  font-size: 1.3vw;

  margin: 0 0 1%;

  font-weight: bold;
}

.inputAnim,
.status select,
.inputs input {
  width: 100%;
  height: 2vw;

  box-sizing: border-box;

  border: 0.08vw solid #ddd;

  background: #f5f5f5;

  border-radius: 0.35vw;

  padding: 0 0.8vw;

  color: #999;

  font-size: 1vw;

  outline: none;
}



.inputAnim:focus,
.status select:focus,
.inputs input:focus {
  border-color: #E85002;
}



.nome {
  width: 100%;
}

.nome select {
  color: #E85002;
  font-weight: bold;
}
.data {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 2vw;
}
.status {
  width: 100%;
}
.status select {
  width: 100%;
}
.botoes {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.5vw;

  margin-top: 1.5vw;
}
.save {
  width: 85%;

  height: 2.4vw;

  border: none;

  border-radius: 0.3vw;

  background: #65B32E;

  color: white;

  font-family: "Krona One", sans-serif;

  font-size: 0.7vw;

  cursor: pointer;

  gap: 0.5vw;

  transition: 0.2s;
}

.save:hover {
  background: #579b27;
}
.cancel {
  border: none;

  background: transparent;

  color: #111;

  font-size: 1vw;

  cursor: pointer;
}

.cancel:hover {
  color: #E85002;
}
@media (max-width: 700px) {

  .dialog {
    width: 90vw;
    min-width: 0;

    padding: 6vw;
    border-radius: 3vw;
  }

  .titulos {
    margin-bottom: 5vw;
  }

  .titulos h2 {
    font-size: 5vw;
  }

  .titulos h4 {
    font-size: 2.5vw;
  }

  .inputs {
    gap: 4vw;
  }

  .inputs h3 {
    font-size: 2.8vw;
    margin-bottom: 1.5vw;
  }

  .inputAnim,
  .status select,
  .inputs input {
    height: 8vw;

    border-radius: 1vw;

    font-size: 2.8vw;
  }

  .data {
    gap: 4vw;
  }

  .save {
    width: 100%;
    height: 10vw;

    font-size: 2.8vw;

    border-radius: 1vw;
  }

  .cancel {
    font-size: 2.5vw;
  }
}


</style>
