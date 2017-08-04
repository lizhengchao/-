<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
    <router-link to="/error">Go to error</router-link>
    <router-link to="/hello">Go to hello</router-link>
      <router-link to="/bind">Go to bind</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

  img {
    width: 50px;
  }
</style>
