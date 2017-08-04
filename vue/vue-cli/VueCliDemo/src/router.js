/**
 * Created by lzc on 2017/8/4.
 */
import Vue from 'vue'
import Hello from './components/Hello.vue'
import Error from './components/error.vue'
import Bind from './components/bind.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '/bind',
    component: Bind
  }
]

var router = new VueRouter({
  routes: routes
})

export default router
