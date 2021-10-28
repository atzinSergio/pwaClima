class ServicioClima{
    constructor(){
        this.latitud = 0
        this.longitud = 0
        this.temperatura = 0
        this.temperaturaMax = 0
        this.temperaturaMin = 0
        this.nombreCiudad = ""
        this.pais = ""
        this.sensacion = 0
        this.humedad = 100
        this.estadoClima = ""
        this.descripcion = "Realiza una búsqueda por coordenadas para obtener el estado del clima! :D"
        this.metrica = "C"
        this.icono = require('../assets/parcialnublado_dark.png')
        //<img class="icono" :src="icono" :alt="descripcion">
    }

    async actualizarClima(lat,lon){
        this.latitud = lat
        this.longitud = lon
        let datosClima = null
        try{
            datosClima = await this.obClima(lat,lon)
        }catch(e){
            datosClima = this.setErrorDatos()
        }
        console.log(datosClima)
        this.llenarDatos(datosClima)
    }

    async obClima(lat, lon){
        let appId = 'a1b6ad9591d61658f66fe94ddedb4f9c'
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${appId}`
        let response = await fetch(endpoint)       
        return await response.json()
    }
    setErrorDatos(){
        return{
            lat: 0,
            lon: 0,
            temperatura: 0,
            temperaturaMax: 0,
            temperaturaMin: 0,
            nombreCiudad: "",
            pais: "",
            sensacion: 0,
            humedad: 0,
            estadoClima: "",
            metrica: "",
            descripcion: "No se pudieron obtener los datos del clima :(, intenta de nuevo más tarde. ",
            icono: ('../assets/parcialnublado_dark.png')

        }
    }
    llenarDatos(datosClima){
        this.latitud = datosClima.coord.lat
        this.longitud = datosClima.coord.lon
        this.temperatura = Math.round(datosClima.main.temp)
        this.temperaturaMax = Math.round(datosClima.main.temp_max)
        this.temperaturaMin = Math.round(datosClima.main.temp_min)
        this.nombreCiudad = datosClima.name
        this.pais = datosClima.sys.country
        this.sensacion = Math.round(datosClima.main.feels_like)
        this.humedad = datosClima.main.humidity
        this.estadoClima = datosClima.weather[0].main
        this.descripcion = datosClima.weather[0].description.charAt(0).toUpperCase() + datosClima.weather[0].description.slice(1)
        this.icono = this.obtenerIdClima(datosClima.weather[0].id)
        this.metrica = "C"
        
        
    }

    obtenerIdClima(id){
        if(id >= 200 && id <= 232){ 
            //return 2 //Icono tormenta
            console.log("Es tormenta")
            return require('../assets/electrica_dark.png');
        }
        if(id >= 300 && id <= 321){
           // return 3 //Icono llovizna
           console.log("Es llovizna")
            return require('../assets/chubascos_dark.png');
        }
        if(id >= 501 && id <= 531){
            return require('../assets/lluvia_dark.png');
        }
        if(id >= 600 && id <= 622){
           // return 5 //Icono nieve
           console.log("Es nieve")
           return require('../assets/nevada_dark.png');
        }
        if(id == 781){
            //tornado
            return require('../assets/viento_dark.png');
        }
        if(id == 800){
            return require('../assets/soleado_dark.png')
        }
        if(id >= 801 && 804 <= id){
            return require('../assets/soleado_dark.png')
        }
        console.log("No es ninguna de las anteriores")
        return require('../assets/parcialnublado_dark.png')
    }
    
   
}
export default ServicioClima;