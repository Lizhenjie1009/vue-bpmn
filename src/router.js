import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bpmn',
      component: () => import('./views/Bpmn1')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home')
    }
  ]
})
