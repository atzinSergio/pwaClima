<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col">
                    <b-button  v-b-toggle href="#example-collapse" @click.prevent id="btnUbicacion" class="btnUbi">
                        <b-icon icon="geo-alt-fill" animation="cylon-vertical" font-scale="1.8" variant="white"></b-icon><br><br>
                    </b-button>
                    <b-collapse id="example-collapse" bg-variant="Light">
                        <b-card title="Latitud y Longitud" >
                            <input type="number" name="lat" v-model="lat" value="this.clima.latitud">
                            <input type="number" name="lon" v-model="lon" value="this.clima.longitud"><br>
                            <b-button v-b-toggle href="#example-collapse" id="consultar" type="button" v-on:click="consultarClima">
                                Consultar
                            </b-button>
                            <!-- <button id="consultar" type="button" v-on:click="consultarClima">Consultar</button>   -->
                        </b-card>
                    </b-collapse>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <Temperatura
                    :nombreCiudad="this.clima.nombreCiudad"
                    :icono="this.clima.icono"
                    :temperatura="this.clima.temperatura"
                    :sensacion="this.clima.sensacion"
                    :temperaturaMax="this.clima.temperaturaMax"
                    :temperaturaMin="this.clima.temperaturaMin"
                    >
                    </Temperatura>
                </div>
                <div class="row">
                    <div class="col">
                        <Clima
                            :humedad="this.clima.humedad"
                            :estadoClima="this.clima.estadoClima"
                            :descripcion="this.clima.descripcion">
                        </Clima>
                    </div>
                </div>
            </div>
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
    margin-bottom: 10px;
}
.btn:transition-property{
    box-shadow: none;
    border:  transparent;
    color:  transparent;
}
.btnUbi{
    margin-top: 30px;
    background-color: transparent;
    border:none;
    box-shadow: none;
}
.btnUbi:focus{
    background-color: transparent;
    box-shadow: none;
    border: transparent;
}
.btnUbi:hover{
    background-color: transparent;
    box-shadow: none;
    border: transparent;
}
.card{
    background-color: transparent;
    border: transparent;
    margin-bottom: 15px;
}
input{
    background: transparent;
    border-color: rgba(136,136,136,0.3);
    color: rgba(232, 240, 245,0.85);
}
button{
    border-radius: 12px;
    background-color: transparent;
    border-color: rgba(136,136,136,0.5);
    color: rgba(232, 240, 245,0.85);
}
</style>
