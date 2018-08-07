import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home-page',
      component: require('@/page/home').default
    },
    {
      path: '/todo',
      name: 'todo-page',
      component: require('@/page/todo').default
    }
  ]
})
