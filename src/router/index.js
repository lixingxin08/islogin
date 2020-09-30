import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import error404 from '@/components/error_page/404.vue'
import error403 from '@/components/error_page/403.vue'
import error500 from '@/components/error_page/500.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/error404',
      name: 'error404',
      component: error404
    },
    {
      path: '/error403',
      name: 'error403',
      component: error403
    },
    {
      path: '/error500',
      name: 'error500',
      component: error500
    }
  ]
})
