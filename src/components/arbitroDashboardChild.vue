<script setup>
import EditIcon from '@iconify-vue/mdi/edit';
import DeleteIcon from '@iconify-vue/mdi/delete';
defineEmits(['editar-Arbitro', 'excluir-Arbitro'])
const props = defineProps(['id', 'login', 'nome', 'senha']);
</script>
<template>
  <tr>
    <td>{{ props.nome }}</td>
    <td>{{ props.login }}</td>
    <td>{{ props.senha }}</td>
      <td>
 <button class="edit" @click="$emit('editar-Arbitro', props.id)"><EditIcon class="edit-icon"/></button>
 <button @click="$emit('excluir-Arbitro', props.id)"><DeleteIcon class="delete"/></button>
    </td>
  </tr>
</template>
<style scoped>
tr {
  width: 100%;
  border-bottom: 1px solid #1E293B;
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}
.edit-icon {
  color: white;
  height: 4em;
}
.delete {
  color: red;
  height: 4em;
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
  text-align: center;
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
  padding: 0.5vw;
  margin-left: 0.75vw;
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
  .edit-icon{
    height: 1.8em;
    color: black;
  }
  .delete{
    height: 1.8em;
  }
}
</style>
