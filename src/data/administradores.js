import { reactive } from 'vue'

export const administradores = reactive([])

export async function carregarAdministradores() {
  const resposta = await fetch('http://localhost:3000/administradores')

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os administradores.')
  }

  const dados = await resposta.json()

  administradores.splice(0, administradores.length, ...dados)
}
