import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Friend from '../pages/Friend.vue'
import Honors from '../pages/Honors.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/friend',
    name: 'Friend',
    component: Friend
  },
  {
    path: '/honors',
    name: 'Honors',
    component: Honors
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 