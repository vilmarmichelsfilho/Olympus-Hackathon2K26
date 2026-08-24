import { turmas } from "@/data/turmas";
import { computed } from "vue";

function excluir(id) {
    const index = turmas.findIndex(item => item.id === id);
    turmas.splice(index,1);
}

export{excluir}