<script setup>
defineProps(['titulo', 'valor', 'icone', 'rota'])


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
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 0.2rem 1rem 0.2rem 1rem;
  min-width: 0;
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
  font-size: 2rem;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .tudo {
    border: 1px solid #e5e7eb;
  }
}

</style>
