<template>
  <div id="temp">
    <h3 class="nombreCiudad">{{nombreCiudad}}</h3>
    <img class="img-fluid" :src="icono">
    <div class="info">
      <h3 class="temperatura">Temperatura actual: {{(getMetrica === 'C')? temperatura: tempF}} °<span id="e"><a @click.prevent="cambiarMetrica">{{escala}}</a></span></h3> 
      <h3 class="sensacion">Sensacion térmica: {{(getMetrica === 'C')? sensacion : senF}} °{{escala}}</h3>
      <h3 class="temperaturaMax">Max: {{(getMetrica === 'C')? temperaturaMax : maxTempF}} °{{escala}}</h3>
      <h3 class="temperaturaMin">Min: {{(getMetrica === 'C')? temperaturaMin : minTempF}} °{{escala}}</h3>
    </div>
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
    icono:{
      type: String,
      required: true
    }
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
        return this.farenheit(this.temperatura)
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
h3{
  font-size: vmin;
}
.img-fluid{
  max-width: 35%;
  height: auto;
  margin: -15px;
}
.info{
  margin-top: -25px;
}
</style>
