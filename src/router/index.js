import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SobreNosView from '@/views/SobreNosView.vue'
import AdministradoresView from '@/views/AdministradoresView.vue'
import chaveamentoView from '@/views/chaveamentoView.vue'
import LoginView from '@/views/LoginView.vue'
import TorneioView from '@/views/TorneioView.vue'
import TimesViewTabela from '@/views/TimesViewTabela.vue'
import JogosView from '@/views/JogosView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/times',
      name: 'times',
      component: TimesViewTabela,
    },
    {
      path: '/sobrenos',
      name: 'sobrenos',
      component: SobreNosView
    },
     {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/administradores',
      name: 'administradores',
      component: AdministradoresView,
    },
    {
      path: '/chaveamento/:id',
      name: 'chaveamento',
      component: chaveamentoView
    },
      {
      path: '/torneio/:id',
      name: 'torneio',
      component: TorneioView
    },
    {
      path:'/jogos/',
      name: 'jogos',
      component: JogosView
    }
  ]
}
)
export default router
