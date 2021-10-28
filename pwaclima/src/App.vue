<template>
  <div id="app" class="container" :class="horaActual">
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
  data(){
    return{
      fecha: new Date
    }
  },
  computed:{
    horaActual(){
      let hora = this.fecha.getHours();
      return (hora > 7 && hora < 19)? 'dia': 'noche'
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(232, 240, 245,0.80);
}
.container{
  height: 100vh;
}
.dia{
  background-image: url('./assets/fondos/fondoDia.png');
  background-repeat: no-repeat;
  background-size: 730px 1080px;
  background-size: 100% 100%;
}
.noche{
  background-image: url('./assets/fondos/fondoNoche.png');
  background-repeat: no-repeat;
  background-size: 720px 1080px;
  background-size: 100% 100%;
}

</style>
