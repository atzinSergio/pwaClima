<template>
  <div id="temp">
    <h3 class="nombreCiudad">{{nombreCiudad}}</h3>
    <img class="img-fluid" :src="icono" style="width: 20vmin; heigh: auto;">
    <div class="container-fluid">
      <div class="row">

        <div class="col-4">
          <h3 class="temperatura">{{(getMetrica === 'C')? temperatura: tempF}}</h3> 
        </div>
        <div class="col-2" style="padding-left: 10px;">
          <p class="grados">°<a @click.prevent="cambiarMetrica">{{escala}}</a> </p>
        </div>
        <div class="col-6" >
          <div class="container-fluid">
            <div class="row">
               <div class="col-12">
                  <img src="../assets/tempMax.png" id="imgTemp" style="width: 8vmin; heigh: auto;">
                  <span class="maxMin"><p class="temperaturaMax"> {{(getMetrica === 'C')? temperaturaMax : maxTempF}}°</p> </span>
              </div>
            </div>
            <div class="row">
               <div class="col-12" >
                  <img src="../assets/tempMin.png" id="imgTemp" style="width: 8vmin; heigh: auto;">
                  <span class="maxMin"><p class="temperaturaMin"> {{(getMetrica === 'C')? temperaturaMin : minTempF}}°</p></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sensacionTermica">
        <h3 class="sensacion">Sensación: {{(getMetrica === 'C')? sensacion : senF}} °{{escala}}</h3>
      </div>
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
}
.nombreCiudad{
  font-size: 5vmin;
  font-weight: bold;
}
p{
  display: inline;
}
.maxMin{
  font-size: 6vmin;
}
.temperatura{
  display: inline-block;
  text-align: right;
  font-size: 14vmin;
}
.grados{
  font-size: 6vmin;  
}
a{
  font-size: 6vmin;  
}
a:hover {
  color: rgba(232, 240, 245,0.1);
}
</style>
