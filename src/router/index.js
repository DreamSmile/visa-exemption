import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
  // , {
  //   path: '/more',
  //   name: 'More',
  //   component: () => import('../views/More.vue')
  // }, {
  //   path: '/single',
  //   name: 'Single',
  //   component: () => import('../views/Single.vue')
  // }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router