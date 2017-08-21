import Vue from 'vue'
import Router from './router/router'
import Store from './store/store'
import './main.css'
import App from './App.vue'

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: {
    App
  },
  template: '<App></App>',
  methods: {
  }
})
