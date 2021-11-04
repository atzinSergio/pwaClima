<template>
  <div class="clima">
    <div class="row">
      <div class="col-6">
        <h2 class="humedad">Humedad: {{humedad}}%</h2>
      </div>
      <div class="col-6">
         <h2 class="estadoClima"></h2>
          <h2 class="descripcion">Clima: {{descripcion}}</h2>
      </div>

    </div>
      
     
      
  </div>
</template>

<script>
export default {
  name: 'Clima',
  props: {
    humedad: Number,
    estadoClima: String,
    descripcion: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  font-size: 4vmin;
}
</style>