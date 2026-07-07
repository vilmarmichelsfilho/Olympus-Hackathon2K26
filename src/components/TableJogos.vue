<script setup>
defineProps(['horario','data','modalidade','time1','time2','pontuacao1','pontuacao2','status'])
</script>

<template>
 <li> 
 <p>Ao vivo</p>
    {{ horario }}
        {{ data }}
        {{ modalidade }}
        {{ time1 }} x {{ time2 }}
        {{ pontuacao1 }} x {{ pontuacao2 }}</li>
       
    
       
</template>

<style scoped>

</style>