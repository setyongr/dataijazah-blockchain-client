import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('../views/Input.vue')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/Data.vue')
  },
  {
    path: '/pool',
    name: 'Pool',
    component: () => import('../views/Pool.vue')
  },
  {
    path: '/host',
    name: 'Pool',
    component: () => import('../views/Host.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
