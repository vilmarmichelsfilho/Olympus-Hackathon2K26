import { administradores } from "@/data/administradores";
import { reactive, computed, ref } from "vue"
import router from "@/router";

function logar(usuario,senha) {
    if (usuario == administradores[0].login) {
        if (senha == administradores[0].senha) {
            localStorage.setItem("logado", JSON.stringify(true));
            router.replace('/administradores')
        } else {
            alert('Senha incorreta');
        }
    } else {
        alert('Este usuario não existe.');
    }
}
export {logar}