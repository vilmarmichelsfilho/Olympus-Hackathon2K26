import { reactive } from "vue";
const administradores = reactive([
    {
        id: 1,
        nome: 'Administrador',
        login: 'admin',
        senha: '12345678',
    }
])
export {administradores}
