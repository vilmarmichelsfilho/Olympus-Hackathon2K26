<script setup>
import { RouterLink} from 'vue-router'
import { computed } from 'vue';
import { jogos } from '@/data/jogos';
import TableJogosDesktop from '@/components/TableJogosDesktop.vue';
const jogosVerificados = computed(() =>
  jogos.filter(jogo => jogo.status === 'AoVivo')
)
</script>
<template>

<RouterLink to="/sobrenos">
<p> Teste</p>
</RouterLink>
<div class="placares">
      <ul>
        <TableJogosDesktop v-for="jogo in jogosVerificados" :key="jogo.id"
          :data="jogo.data"
          :horario="jogo.horario"
          :modalidade="jogo.modalidade"
          :time1="jogo.time1"
          :time2="jogo.time2"
          :pontuacao1="jogo.pontuacao1"
          :pontuacao2="jogo.pontuacao2"
          :status="jogo.status"
          :escudo1="jogo.escudo1"
          :escudo2="jogo.escudo2"
        >
        </TableJogosDesktop>
      </ul>     
    </div>  
</template>
 <style scoped>
 .placares ul {
  position: relative;
  margin-top: 10rem;
  background-color: transparent;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}
 </style>
