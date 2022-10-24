import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      if (window.innerWidth/window.innerHeight > 1) {
        return import('../views/home/Home.vue');
      } else {
        return import('../views/home-mobile/HomeMobile.vue');
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: () => {
      return import('../views/NotFound.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
