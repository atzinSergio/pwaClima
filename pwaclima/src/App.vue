<template>
  <div id="app" class="container">
  <AplicacionClima></AplicacionClima>
  </div>
</template>

<script>
import AplicacionClima from './components/AplicacionClima'


export default {
  name: 'App',
  components: {
    AplicacionClima
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
