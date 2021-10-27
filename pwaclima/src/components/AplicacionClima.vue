<template>
    <main>
        <div>
            <b-container>
                <b-card-group>
                    <b-card text-variant="white"  class="text-center"  bg-variant="Default">
                        <b-card-body class="contenedor">
                            <b-icon icon="geo-alt-fill" animation="cylon-vertical" font-scale="1.5" variant="white"></b-icon><br><br>
                            <div >
                                
                                <div class="mb-3">
                                    <b-button   b-button a v-b-toggle href="#example-collapse" @click.prevent>Ubicacion</b-button>
                                </div>

                                <b-collapse id="example-collapse" bg-variant="Default">
                                    <b-card title="Collapsible card" >
                                        <input type="number" name="lat" v-model="lat" value="this.clima.latitud">
                                        <input type="number" name="lon" v-model="lon" value="this.clima.longitud"><br>
                                        <button type="button" v-on:click="consultarClima">Consultar</button>  
                                    </b-card>
                                </b-collapse> 
                                <hr>
                                <Temperatura
                                    :nombreCiudad="this.clima.nombreCiudad"
                                    :icono="this.clima.icono"
                                    :temperatura="this.clima.temperatura"
                                    :sensacion="this.clima.sensacion"
                                    :temperaturaMax="this.clima.temperaturaMax"
                                    :temperaturaMin="this.clima.temperaturaMin"
                                    >
                                </Temperatura>
                                <Clima
                                    :humedad="this.clima.humedad"
                                    :estadoClima="this.clima.estadoClima"
                                    :descripcion="this.clima.descripcion">
                                </Clima>
                                    

                            </div>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-container>
        </div>

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
input{
    width: 35%;
}
.contenedor{
    background: rgb(102,111,126);
    background: linear-gradient(180deg, rgba(102,111,126,1) 0%, rgba(61,69,85,1) 100%);
}
</style>
