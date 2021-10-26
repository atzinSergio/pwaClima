<template>
  <div class="temperatura">
        <img class="icono" :src=icono>{{icono}}
        <h2 class="icono">icono:</h2>
        <h2 class="nombreCiudad">Ciudad: {{nombreCiudad}}</h2>
        <hr>
        <h3 class="temperaturaa">Temperatura actual: {{(getMetrica === 'C')? temperatura: tempF}} °<a @click.prevent="cambiarMetrica">{{escala}}</a></h3> 
        <h3 class="sensacion">Sensacion térmica: {{(getMetrica === 'C')? sensacion : senF}} °{{escala}}</h3>
        <h3 class="temperaturaMax">Max: {{(getMetrica === 'C')? temperaturaMax : maxTempF}} °{{escala}}</h3>
        <h3 class="temperaturaMin">Min: {{(getMetrica === 'C')? temperaturaMin : minTempF}} °{{escala}}</h3>
        
  </div>
</template>

<script>
export default {
  name: 'Temperatura',
  props: {
    temperatura: Number,
    sensacion: Number,
    temperaturaMax: Number,
    temperaturaMin: Number,
    nombreCiudad: String,
    icono: Number
  },
  data(){
    return{
      escala: "C"
    }
  },
  computed:{
     getMetrica(){
       return this.escala
     },
     senF(){
       return this.farenheit(this.sensacion)
     },
      tempF(){
        return this.farenheit(this.temperaturaa)
      },
      maxTempF(){
        return this.farenheit(this.temperaturaMax)
      },
      minTempF(){
        return this.farenheit(this.temperaturaMin)
      }
  },
  methods:{
    farenheit(valor){
      return Math.round((valor * 5/9) + 32)
    },

    cambiarMetrica(){
      (this.escala === 'C')? this.escala = 'F' : this.escala = 'C'
    }
  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
