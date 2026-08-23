<script setup>
defineProps({
  titulo: { type: String, required: true },
  valor: { type: [String, Number], required: true },
  icone: { type: String, required: true },
    rota: { type: String, required: true },

})


</script>


<template>
 <div class="tudo">
   <li>
     <div class="header">
       <h3>{{ titulo }}</h3>
       <span class="tres-pontos">...</span>
     </div>
     <div class="corpo">
      <div class="icone-value">
      <img :src="icone" alt="" class="icone" />
      <p class="valor">{{ valor }}</p>
      </div>
      <router-link :to="rota" class="card-seta">»</router-link>
     </div>
   </li>
 </div>
</template>


<style scoped>
li {
  list-style: none;
}

.tudo {
  background-color: white;
  color: black;
  border-radius: 5%;
  padding: 0.2rem 1rem 0.2rem 1rem;
  min-width: 10rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.header h3 {
  font-size: 0.85rem;
  color: black;
  font-weight: 500;
  margin: 0;
}

.header span {
  color: gray;
}

li .corpo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
}

.icone-value {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.corpo img {
  width: 1.4rem;
  height: 2rem;
  object-fit: contain;
}

.valor {
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
  margin: 0;
}

.card-seta {
  color: orange;
  font-weight: bold;
  font-size: 3rem;
  text-decoration: none;
  cursor: pointer;
}

</style>
