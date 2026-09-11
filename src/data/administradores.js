import { reactive } from 'vue'

export const administradores = reactive([
  {
    cod_adm: 1,
    nome_adm: "Administrador Principal",
    login_adm: "admin",
    senha_adm: "123456"
  },
  {
    cod_adm: 2,
    nome_adm: "Administrador Auxiliar",
    login_adm: "admin2",
    senha_adm: "123456"
  }
])
