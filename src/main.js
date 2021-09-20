/*
 * @Author: your name
 * @Date: 2021-09-18 12:16:34
 * @LastEditTime: 2021-09-18 12:40:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vuegis\src\main.js
 */
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
