<script setup>
import rankingtimesChild from '@/Components/rankingtimesChild.vue';
</script>
<template>
  <main>
    <rankingtimesChild></rankingtimesChild>
  </main>

</template>
 <style scoped>
main {
  padding: 10vw 0;
  width: 100%;
    min-height: 100vh;
    background-color: #000;
    background-image: url("/images/linhasPagRanking.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
@media (min-width: 1200px){
  main{
   background-image: linear-gradient(to left, #151313 0%, #3d0f0f 100%);
  }
}
 </style>
