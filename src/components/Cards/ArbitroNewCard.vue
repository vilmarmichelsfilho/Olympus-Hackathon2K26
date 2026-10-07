<script setup>
import { arbitros } from '@/data/arbitros'
import { computed } from 'vue'

const props = defineProps(['id', 'class'])
const emits = defineEmits(['editar-arbitro', 'excluir-arbitro'])
const arbitro = computed(() => arbitros.find((item) => item.cod_arbitro === props.id))
</script>

<template>
  <li v-if="arbitro" class="cadastro-item cadastro-arbitro" :class="props.class">
    <h4>{{ arbitro.nome_arbitro }}</h4>
    <div class="campo-arbitro">
      <span class="rotulo">Login</span>
      <p>{{ arbitro.login_arbitro }}</p>
    </div>
    <div class="campo-arbitro">
      <span class="rotulo">Senha</span>
      <p>{{ arbitro.senha_arbitro }}</p>
    </div>
    <div class="botoes">
      <button
        type="button"
        :aria-label="`Editar ${arbitro.nome_arbitro}`"
        v-on:click.prevent="emits('editar-arbitro', props.id)"
      >
        Editar
      </button>
      <button
        type="button"
        :aria-label="`Excluir ${arbitro.nome_arbitro}`"
        v-on:click.prevent="emits('excluir-arbitro', props.id)"
      >
        Excluir
      </button>
    </div>
  </li>
</template>

<style scoped>
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
}
button {
  background: none;
  border: none;
  color: #e85002;
  cursor: pointer;
}

.campo-arbitro {
  min-width: 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.rotulo {
  display: none;
}

@media (max-width: 768px) {
  li.cadastro-item.cadastro-arbitro {
    flex: 0 0 calc((100% - 12px) / 2);
    width: calc((100% - 12px) / 2);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    min-width: 0;
    gap: 10px;
    padding: 14px;
    border: 1px solid #e1e1e6;
    border-radius: 10px;
    background: white;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
  }

  .cadastro-arbitro h4 {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  .rotulo {
    display: block;
    margin-bottom: 2px;
    color: #777;
    font-size: 12px;
    font-weight: 600;
  }

  .botoes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .botoes button {
    flex: 1 1 80px;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid #e85002;
    border-radius: 8px;
    font-size: 14px;
  }

  button:focus-visible {
    outline: 2px solid #e85002;
    outline-offset: 2px;
  }
}
</style>
