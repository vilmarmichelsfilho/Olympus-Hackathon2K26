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
  color: #1a1a1a;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 220px;
}

.linha-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.linha-topo p {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
}

.ao-vivo p {
  background-color: #e63946;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  margin: 0;
}

.times {
  display: flex;
  gap: 0.6rem;
}

.escudos {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.4rem;
}

.escudo {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  object-fit: cover;
}

.nomes {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.placares {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
}

.nomes p,
.placares p {
  margin: 0;
  line-height: 1.4;
}

.modalidade {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.4rem;
}

.modalidade p {
  font-size: 0.7rem;
  color: #999;
  font-style: italic;
  margin: 0;
}
@media (min-width: 1024px) {
  .card-jogo {
    max-width: 260px;
    padding: 1.4rem 1.6rem;
  }
}

</style>
