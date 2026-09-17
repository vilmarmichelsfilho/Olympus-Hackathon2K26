<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
import DeleteIcon from '@iconify-vue/mdi/delete';
import { computed } from 'vue';
defineEmits(['editar-Modalidade', 'excluir-Modalidade'])
const props = defineProps(['id', 'imagem', 'nome', 'desc', 'tempo', 'local']);
let limite = 10;
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
    <td>{{ local }}</td>
    <td><img :src="imagem" :alt="nome"></td>
    <td>{{ tempo }}m
 <button class="edit" @click="$emit('editar-Modalidade', id)"><EditIcon class="edit-icon"/></button>
 <button @click="$emit('excluir-Modalidade', id)"><DeleteIcon class="delete"/></button>
    </td>
  </tr>
</template>
<style scoped>
button{
  cursor: pointer;
}
.edit-icon {
  color: white;
  height: 4em;
}
.delete {
  color: red;
  height: 4em;
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

td:nth-child(4) {
  text-align: center;
}

td:nth-child(5) {
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
  .edit-icon{
    height: 1.5em;
    color: black;
  }
  .delete{
    height: 1em;
  }
  tr{
    border-bottom: 1px solid #b5b2b2;
  }
  td{
    color: black;
    font-size: 3vw;
    font-weight: bold;
    align-items: center;
  }
  td img{
    width: 10vw;
    height: 10vw;
  }

}
</style>

