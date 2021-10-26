<template>
    <main>
        <div>
            <input type="number" name="lat" v-model="lat" value="this.clima.latitud">
            <input type="number" name="lon" v-model="lon" value="this.clima.longitud">
            <button type="button" v-on:click="consultarClima">Consultar</button>  
            <hr>
        </div>
        <Temperatura
            :temperatura="this.clima.temperatura"
            :sensacion="this.clima.sensacion"
            :temperaturaMax="this.clima.temperaturaMax"
            :temperaturaMin="this.clima.temperaturaMin"
            :nombreCiudad="this.clima.nombreCiudad">
        </Temperatura>
        <Clima
            :sensacion="this.clima.sensacion"
            :humedad="this.clima.humedad"
            :estadoClima="this.clima.estadoClima"
            :descripcion="this.clima.descripcion">
        </Clima>
    </main>

</template>

<script>
import ServicioClima from '../service/ServicioClima'
import Clima from './Clima'
import Temperatura from './Temperatura'

export default {
    name: 'AplicacionClima',
    components:{
        Clima,
        Temperatura
    },
    data() {
        return {
            clima: new ServicioClima,
            lon: 0,
            lat: 0
        }
    },
    methods:{
        consultarClima(){
            this.clima.actualizarClima(this.lat,this.lon)
            console.log("Objeto clima de botón: ")
            console.log(this.clima)
            localStorage.setItem('clima', JSON.stringify(this.clima))
        }
    },
    created: function(){
        let datosClima = new ServicioClima
        datosClima = JSON.parse(localStorage.getItem('clima'))
        if(datosClima != null){
            this.clima.latitud = datosClima.latitud
            this.clima.longitud = datosClima.longitud
            this.clima.temperatura = datosClima.temperatura
            this.clima.temperaturaMax = datosClima.temperaturaMax
            this.clima.temperaturaMin = datosClima.temperaturaMin
            this.clima.nombreCiudad = datosClima.nombreCiudad
            this.clima.sensacion = datosClima.sensacion
            this.clima.humedad = datosClima.humedad
            this.clima.estadoClima = datosClima.estadoClima
            this.clima.descripcion = datosClima.descripcion
            this.clima.metrica = datosClima.metrica
            this.clima.icono = datosClima.icono
            this.lat = datosClima.latitud
            this.lon = datosClima.longitud
            console.log("Objeto clima de la base:")
            console.log(this.clima)
        }else{
            console.log("Objeto clima de la base: vacío")
        }
    },
    updated: function(){
            localStorage.setItem('clima', JSON.stringify(this.clima))
    }
    
}

</script>

<style scoped>
</style>
