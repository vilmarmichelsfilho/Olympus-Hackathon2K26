<script setup>
import KeyboardArrowRightIcon from '@iconify-vue/mdi/keyboard-arrow-right'
import { computed } from 'vue'
const props = defineProps(['torneio'])
const emit = defineEmits(['mandarCodtorneio'])
const anodotorneio = computed(() => props.torneio.data_inicio_torneio.split('-')[0].slice(-2))
function formatarData(data) {
  return data.split('-').reverse().join('/')
}
function mandarEmit() {
  emit('mandarCodtorneio', props.torneio.cod_torneio)
}
</script>
<template>
  <li>
    <button
      type="button"
      :aria-label="`Selecionar ${props.torneio.nome_torneio}`"
      @click="mandarEmit()"
    >
      <div class="conteiner">
        <p class="ano">{{ anodotorneio }}</p>
        <div class="content">
          <h4>{{ props.torneio.nome_torneio }}</h4>
          <p class="detalhes">
            <span class="datas"
              >{{ formatarData(props.torneio.data_inicio_torneio) }} a
              {{ formatarData(props.torneio.data_fim_torneio) }}</span
            >
            <span class="status" :data-status="props.torneio.status_torneio">{{
              props.torneio.status_torneio
            }}</span>
          </p>
        </div>
      </div>
      <span class="seta" aria-hidden="true">
        <KeyboardArrowRightIcon class="icon" />
      </span>
    </button>
  </li>
</template>
<style scoped>
li {
  list-style: none;
  margin-bottom: 2vw;
}
button {
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: #0e1d46;
  padding: 1vw;
  border-radius: 0.4vw;
  border: none;
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: background-color 0.2s ease;
}
.conteiner {
  display: flex;
  gap: 2vw;
  align-items: center;
}
p.ano {
  color: white;
  background-color: #e85002;
  padding: 0.5vw 0.6vw;
  border-radius: 100vw;
  width: fit-content;
}
.content {
  min-width: 0;
}
.detalhes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
}
.seta {
  background-color: white;
  width: clamp(2.25rem, 3vw, 3rem);
  height: clamp(2.25rem, 3vw, 3rem);
  padding: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
button:hover {
  background-color: #192c59;
}
button:focus-visible {
  outline: 0.2rem solid #e85002;
  outline-offset: 0.2rem;
}
h4 {
  color: white;
}
p {
  color: #afafaf;
}
.icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #e85002;
}
@media (max-width: 1000px) {
  li {
    width: 100%;
    min-width: 0;
    margin: 0;
  }

  button {
    gap: 10px;
    padding: 16px 14px;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(14, 29, 70, 0.12);
  }

  .conteiner {
    min-width: 0;
    gap: 12px;
    align-items: flex-start;
  }

  p.ano {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    flex-shrink: 0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .detalhes {
    gap: 8px;
    margin-top: 6px;
    font-size: 12px;
    line-height: 1.5;
    color: #c8d0e3;
  }

  .datas {
    width: 100%;
  }

  .status {
    padding: 3px 9px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.12);
    color: #e2e7f1;
    font-size: 11px;
    font-weight: 600;
  }

  .status[data-status='Planejado'] {
    background: #fff0df;
    color: #8a3900;
  }

  .seta {
    width: 32px;
    height: 32px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
}
</style>
