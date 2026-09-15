import { ref } from "vue";
const cod_torneioAtual = ref(null)
function modificarCodTorneio(cod_torneio){
  cod_torneioAtual.value = cod_torneio
}
export {modificarCodTorneio, cod_torneioAtual}
