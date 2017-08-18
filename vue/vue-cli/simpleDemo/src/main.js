import Vue from 'vue'
import Router from './router/router'
import './main.css'
import App from './App.vue'

new Vue({
  el: '#app',
  router: Router,
  components: {
    App
  },
  template: '<App></App>',
  methods: {
  }
})
