import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TimesView from '@/views/TimesView.vue'
import SobreNosView from '@/views/SobreNosView.vue'
import AdministradoresView from '@/views/AdministradoresView.vue'
import chaveamentoView from '@/views/chaveamentoView.vue'
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
      component: TimesView,
    },
    {
      path: '/sobrenos',
      name: 'sobrenos',
      component: SobreNosView
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
    }
  ]
}
)
export default router
