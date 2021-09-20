<!--
 * @Author: your name
 * @Date: 2021-09-18 12:16:34
 * @LastEditTime: 2021-09-18 12:39:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vuegis\src\App.vue
-->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <baselayer/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import baselayer from './components/Baselayer.vue'

export default {
  name: 'App',
  components:{
    baselayer
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
  
</style>
