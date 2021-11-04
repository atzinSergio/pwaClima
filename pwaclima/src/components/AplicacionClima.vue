<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col">
                    <b-button  v-b-toggle href="#example-collapse" @click.prevent id="btnUbicacion" class="btnUbi">
                        <b-icon icon="geo-alt-fill" animation="cylon-vertical" font-scale="1.8" variant="white"></b-icon><br><br>
                    </b-button>
                    <b-collapse id="example-collapse" bg-variant="Light">
                        <b-card title="Latitud y Longitud">
                            <input type="text" name="lat" v-model="lat" onClick="this.select();" placeholder="20.4567" required>
                            <input type="text" name="lon" v-model="lon" onClick="this.select();" placeholder="-97.3156" required><br>
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
                    <a>{{status}}</a>
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
            lat: 0,
            lon: 0,
            status: ""
        }
    },
    methods:{
        convertirDec(coordenada){
            let arregloNumeros = [0,0,0]
            let i = 0
            let posicion = 0
            let valor = ""
            let coord = 0
            while(i<coordenada.length){
                if(coordenada.charAt(i) === ' '){
                    i++
                    continue
                }
                if(coordenada.charAt(i) != '°' && coordenada.charAt(i) != '′' && coordenada.charAt(i) != '″' && coordenada.charAt(i) != '\'' && coordenada.charAt(i) != '"'){
                    valor+= coordenada.charAt(i)
                }else{
                    arregloNumeros[posicion] = parseInt(valor,10)
                    valor = ""
                    posicion++
                }
                i++
            }
            coord = (arregloNumeros[0] + (arregloNumeros[1] / 60) + (arregloNumeros[2] / 3600)).toFixed(4)
            if(coordenada.includes('S') || coordenada.includes('O') || coordenada.includes('s') || coordenada.includes('o')){
                coord = coord * -1
            }
            return coord
        },

        consultarClima(){
            let regexLat = new RegExp("^[0-9]{1,2}°\\s?[0-6][0-9](′|')\\s?[0-6][0-9](″|\")\\s?(N|n|S|s)$")
            let regexLon = new RegExp("^[0-9]{1,3}°\\s?[0-6][0-9](′|')\\s?[0-6][0-9](″|\")\\s?(E|e|O|o)$")
            let regexLatDecimal = new RegExp("^-?[0-9]{1,2}(.[0-9]{1,10})?$")
            let regexLonDecimal = new RegExp("^-?[0-9]{1,2}(.[0-9]{1,10})?$")

            if((regexLat.test(this.lat) || regexLatDecimal.test(this.lat)) && (regexLon.test(this.lon) || regexLonDecimal.test(this.lon)) ){
                
                if(regexLat.test(this.lat) && regexLon.test(this.lon)){ //si las dos están en grados
                    let coordLat = this.convertirDec(this.lat)
                    let coordLon = this.convertirDec(this.lon)
                    this.clima.actualizarClima(coordLat,coordLon)
                    localStorage.setItem('clima', JSON.stringify(this.clima))
                }else{                                                  //Si solo hay una en grados, encuentra cual
                    if(regexLat.test(this.lat)){                        //Si es latitud, manda una en grados y una normal
                        let coordLat = this.convertirDec(this.lat)
                        this.clima.actualizarClima(coordLat,this.lon)
                        localStorage.setItem('clima', JSON.stringify(this.clima))
                    }else if(regexLon.test(this.lon)){                  //Si es longitud, manda una en grados y una normal
                        let coordLon = this.convertirDec(this.lon)
                        this.clima.actualizarClima(this.lat,coordLon)
                        localStorage.setItem('clima', JSON.stringify(this.clima))
                    }else{                                              //Si no es ninguna, manda ambas normal
                        this.clima.actualizarClima(this.lat,this.lon)
                        localStorage.setItem('clima', JSON.stringify(this.clima))
                    }
                }
                this.status = ""
            }else{
                this.status = "Las coordenadas no son válidas. Asegúrate de seguir uno de estos formatos: 20° 07′ 21″ N o 20.116."
            }
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
        }
    },
    updated: function(){
        localStorage.setItem('clima', JSON.stringify(this.clima))
    }

}
</script>

<style scoped>
    input{
        background: transparent;
        border-color: rgba(136,136,136,0.3);
        color: rgba(255, 255, 255,0.9);
        min-width: 25%;
        margin-bottom: 5px;
    }
    ::placeholder{
        color: rgba(232, 240, 245,0.5);
    }
    .btn:transition-property{
        box-shadow: none;
        border:  transparent;
        color:  transparent;
    }
    .btnUbi{
        margin-top: 10px;
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
    }
    button{
        border-radius: 12px;
        background-color: transparent;
        border-color: rgba(136,136,136,0.5);
        color: rgba(232, 240, 245,0.85);
    }
</style>
