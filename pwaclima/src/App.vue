<template>
  <div id="app" class="container-fluid" :class="horaActual">
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

.container{
  height: 100vh;
  width: 100vw;
}
@media (min-width: 300px) and (max-width: 736px) {
  .dia{
    background: rgb(62,101,165);
    background: linear-gradient(180deg, rgba(62,101,165,1) 0%, rgba(75,122,187,1) 50%, rgba(40,61,102,1) 100%);
    background-image: url('./assets/fondos/fondoDia.png');
    background-size: 730px 1080px;
    background-size: 100% 100%;
  }
  .noche{
    background: rgb(23,25,99);
    background: linear-gradient(180deg, rgba(23,25,99,1) 0%, rgba(51,80,138,1) 50%, rgba(12,13,31,1) 100%);
    background-image: url('./assets/fondos/fondoNoche.png');
    background-size: 720px 1080px;
    background-size: 100% 100%;
  }
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(232, 240, 245,0.8);
}
  
}
@media (min-width: 736px) and (max-width: 1800px) {
  .dia{
    background: rgb(169,200,225);
    background: linear-gradient(180deg, rgba(169,200,225,1) 0%, rgba(216,230,231,1) 50%, rgba(75,104,80,1) 100%);
    background-image: url('./assets/fondos/fondoDia_xl.png');
    background-size: 730px 1080px;
    background-size: 100% 100%;
  }
  .noche{
    background: rgb(82,110,164);
    background: linear-gradient(180deg, rgba(82,110,164,1) 0%, rgba(87,116,177,1) 50%, rgba(43,71,102,1) 100%);
    background-image: url('./assets/fondos/fondoNoche_xl.png');
    background-size: 720px 1080px;
    background-size: 100% 100%;
  }
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255,1);
}
}


</style>
