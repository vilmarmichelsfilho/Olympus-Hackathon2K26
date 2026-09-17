<script setup>
import { computed, ref } from 'vue'
import EditIcon from '@iconify-vue/mdi/edit'
import AdicionarOuEditarTime from './AdicionarOuEditarTime.vue'
import { participa } from '@/data/participa'
import { times } from '@/data/times'
import { turmas } from '@/data/turmas'

const props = defineProps(['id'])
const editando = ref(false)

const time = computed(() => times.find((item) => item.cod_time === props.id))

const nomesTurmas = computed(() => {
  const nomes = turmas
    .filter((turma) => turma.cod_time === props.id)
    .map((turma) => turma.nome_turma)

  return nomes.length ? nomes.join(', ') : 'Sem turmas vinculadas'
})

const resultados = computed(() => {
  const participacoes = participa.filter((item) => item.cod_time === props.id)
  const contar = (resultado) =>
    participacoes.filter((item) => item.resultado_time === resultado).length

  return {
    vitorias: contar('Vitória'),
    empates: contar('Empate'),
    derrotas: contar('Derrota'),
  }
})

</script>

<template>
  <tr v-if="time">
    <td>
      <div class="dados-time">
        <img
          v-if="time.escudo_time"
          :src="time.escudo_time"
          :alt="`Escudo do time ${time.nome_time}`"
        />
        <span v-else class="cor-time" :style="{ background: time.cor_time }"></span>
        <strong>{{ time.nome_time }}</strong>
      </div>
    </td>
    <td class="turmas-time">{{ nomesTurmas }}</td>
    <td class="resultado">
      {{ resultados.vitorias }}/{{ resultados.empates }}/{{ resultados.derrotas }}
    </td>
    <td class="pontos">{{ time.pontuacaogeral_time }}</td>
    <td class="botoes">
      <button
        type="button"
        title="Editar time"
        :aria-label="`Editar ${time.nome_time}`"
        @click="editando = true"
      >
        <EditIcon />
      </button>
    </td>
  </tr>

  <Teleport to="body">
    <AdicionarOuEditarTime
      v-if="editando && time"
      tipo="editar"
      :id="time.cod_time"
      :nome1="time.nome_time"
      :cor="time.cor_time"
      :escudo="time.escudo_time"
      :pontuacao_geral="time.pontuacaogeral_time"
      :torneio="time.cod_torneio"
      @fechar="editando = false"
    />
  </Teleport>
</template>

<style scoped>
tr {
  border-bottom: 1px solid #1e293b;
}

tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

td {
  padding: 0.8rem;
  color: white;
  font-size: clamp(0.82rem, 0.95vw, 1rem);
  vertical-align: middle;
}

.dados-time {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.dados-time img,
.cor-time {
  width: 2.3rem;
  height: 2.3rem;
  flex: 0 0 auto;
  border-radius: 50%;
  object-fit: cover;
}

.cor-time {
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.turmas-time {
  color: #aeb9d0;
  line-height: 1.5;
}

.resultado,
.pontos,
.botoes {
  text-align: center;
}

.pontos {
  font-weight: 700;
}

.botoes button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.15rem;
  border: 0;
  background: transparent;
  color: white;
  font-size: 1.35rem;
  cursor: pointer;
}

.botoes button:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  tr {
    border-bottom-color: #ddd;
  }

  tr:hover {
    background: #fafafa;
  }

  td {
    color: #17171b;
    font-size: 0.85rem;
  }

  .turmas-time {
    color: #666;
  }

  .botoes button {
    color: #17171b;
  }

}
</style>
