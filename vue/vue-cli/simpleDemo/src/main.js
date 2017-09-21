import Vue from 'vue'
import Router from './router/router'
import Store from './store/store'
import './globalcss/main.css'
import App from './App.vue'
import {createTransformStyle} from './init'

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: {
    App
  },
  template: '<App></App>',
  methods: {
  },
  created () {
    createTransformStyle();
  }
})
