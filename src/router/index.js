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
        component: () => import('@/views/msite/'),
        meta: { keepAlive: true }
      },
      {
        path: '/search/:geohash',
        component: () => import('@/views/search/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
