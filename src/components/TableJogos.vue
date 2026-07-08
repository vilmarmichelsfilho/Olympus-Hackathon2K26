<script setup>
defineProps(['horario','data','modalidade','time1','time2','pontuacao1','pontuacao2','status','escudo1','escudo2'])
</script>

<template>
 <li class="card-jogo">
 <div class="linha-topo">
  <p>{{ horario }}</p>
  <div class="ao-vivo">
    <p>ao vivo</p>
  </div>
 </div>
 <div class="times">
 <div class="escudos">
    <img :src="escudo1" alt="" class="escudo" />
    <img :src="escudo2" alt="" class="escudo" />
    </div>
 <div class="nomes">
  <p>{{ time1 }}</p>
  <p>{{ time2 }}</p>
</div>
<div class="placares">
  <p>{{ pontuacao1 }}</p>
  <p>{{ pontuacao2 }}</p>
</div>
  </div>
  <div class="modalidade">
   <p>{{modalidade }}</p>
  </div>
 </li>




</template>

<style scoped>
.card-jogo {
  background-color: #ffffff;
  color: black;
  border-radius: 0.8rem;
}
.card-jogo {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding:5vw;
  box-shadow: black 10px;
}
.linha-topo {
  display: flex;
  justify-content: space-between;
  gap: 7vw ;
}
.times {
  display: flex;
  justify-content: space-between;
  gap: 3vw;
  line-height: 8vw;
  font-size:4vw;
}
.modalidade {
  display: flex;
justify-content: end;
}
.escudos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>
