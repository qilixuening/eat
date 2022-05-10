import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { keepAlive: true }
      },
      {
        path: '/city/:cityId',
        name: 'city',
        component: () => import('@/views/city/')
      },
      {
        path: '/msite',
        name: 'msite',
        component: () => import('@/views/msite/'),
        meta: { keepAlive: true }
      },
      {
        path: '/search/:geohash',
        component: () => import('@/views/search/')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/')
      },
      {
        path: '/forget',
        name: 'forget',
        component: () => import('@/views/forget/')
      },
      {
        path: '/find',
        name: 'find',
        component: () => import('@/views/find/')
      },
      {
        path: '/food',
        name: 'food',
        component: () => import('@/views/food/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
