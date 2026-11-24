import { ref, onMounted } from 'vue'
import { carregarAdministradores } from '@/data/administradores'

export function useAdministradores() {
  const carregando = ref(true)
  const erro = ref('')

  onMounted(async () => {
    try {
      await carregarAdministradores()
    } catch (problema) {
      console.error(problema)
      erro.value = 'Não foi possível carregar os administradores.'
    } finally {
      carregando.value = false
    }
  })

  return { carregando, erro }
}
