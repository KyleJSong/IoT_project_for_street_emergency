import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Detail from '../views/Detail.vue'
import Previous from '../views/Previous.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/previous',
    name: 'previous',
    component: Previous
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
