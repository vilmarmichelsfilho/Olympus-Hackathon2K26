import { times } from "@/data/times";
import { computed } from "vue";
const timesDoMaiorAoMenor = computed(() => {
  return [...times].sort((a, b) => b.pontuacao_geral - a.pontuacao_geral)
})
function definirposicao(id){
const posicao = timesDoMaiorAoMenor.value.findIndex(t => t.id == id) + 1
return posicao
}
export{timesDoMaiorAoMenor, definirposicao}
