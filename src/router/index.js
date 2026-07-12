import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RankingTimesView from '@/views/RankingTimesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/RankingTimes',
      name: 'RankingTimes',
      component: RankingTimesView
    },
  ],
  }
)
export default router
