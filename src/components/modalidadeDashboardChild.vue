<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
import DeleteIcon from '@iconify-vue/mdi/delete';
import { computed } from 'vue';
defineEmits(['editar-Modalidade', 'excluir-Modalidade'])
const props = defineProps(['id', 'imagem', 'nome', 'desc', 'tempo'])
let limite = 15;
let descricaoExibida = computed(() => {
  if (props.desc.length > limite) {
    return props.desc.substring(0, limite) + '...';
  }
  return props.desc;
});

</script>
<template>
  <tr>
    <td>{{ nome }}</td>
    <td>{{ descricaoExibida }}</td>
    <td><img :src="imagem" :alt="nome"></td>
    <td>{{ tempo }}m
 <button class="edit" @click="$emit('editar-Modalidade', id)"><EditIcon height="3.5em" ></EditIcon></button>
 <button @click="$emit('excluir-Modalidade', id)"><DeleteIcon height="3.5em" style="color: red;"/></button>
    </td>
  </tr>
</template>
<style scoped>
.edit{
  color: white;
}
tr {
  width: 100%;
  border-bottom: 1px solid #1E293B;
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

td {
  color: white;
  padding: 0.2vw;
  font-size: 1vw;
  vertical-align: middle;
  text-align: left;
}

td:nth-child(3) {
  text-align: center;
}

td:nth-child(4) {
  text-align: right;
}

td img {
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 4px;
  object-fit: cover;
}

td button {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  transition: opacity 0.2s;
}

td button:hover {
  opacity: 0.7;
}
@media (max-width: 750px){
  tr{
    border-bottom: 1px solid #b5b2b2;
  }
  td{
    color: black;
    font-size: 3.6vw;
    font-weight: bold;
    align-items: center;
  }
  td img{
    width: 10vw;
    height: 10vw;
  }
  td button{
    height: 1em;
  }
  .edit{
    color: black;
  }
}
</style>

