import Vue from 'vue'
import Router from './router/router'
import './main.css'

new Vue({
  el: '#app',
  router: Router,
  template:
  '<transition>' +
  '<router-view></router-view>' +
  '</transition>',
  methods: {
  }
})
