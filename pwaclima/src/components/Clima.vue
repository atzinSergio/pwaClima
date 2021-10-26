<template>
  <div class="clima">
      <h2 class="humedad">Humedad: {{humedad}}%</h2>
      <h2 class="estadoClima"></h2>
      <h2 class="descripcion">{{descripcion}}</h2>
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

</style>