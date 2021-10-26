class ServicioClima{
    constructor(){
        this.latitud = 0
        this.longitud = 0
        this.temperatura = 0
        this.temperaturaMax = 0
        this.temperaturaMin = 0
        this.nombreCiudad = ""
        this.sensacion = 0
        this.humedad = 100
        this.estadoClima = ""
        this.descripcion = "Realiza una búsqueda por coordenadas para obtener el estado del clima! :D"
        this.metrica = "C"
        this.icono = 0
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
            sensacion: 0,
            humedad: 0,
            estadoClima: "",
            metrica: "",
            descripcion: "No se pudieron obtener los datos del clima :(, intenta de nuevo más tarde. "

        }
    }
    llenarDatos(datosClima){
        this.latitud = datosClima.coord.lat
        this.longitud = datosClima.coord.lon
        this.temperatura = Math.round(datosClima.main.temp)
        this.temperaturaMax = Math.round(datosClima.main.temp_max)
        this.temperaturaMin = Math.round(datosClima.main.temp_min)
        this.nombreCiudad = datosClima.name
        this.sensacion = Math.round(datosClima.main.feels_like)
        this.humedad = datosClima.main.humidity
        this.estadoClima = datosClima.weather[0].main
        this.descripcion = datosClima.weather[0].description
        this.icono = this.obtenerIdClima(datosClima.weather[0].id)
        this.metrica = "C"
        
        
    }

    obtenerIdClima(id){
        if(id > 199 && id < 233){ 
            return 2 //Icono tormenta
        }
        if(id > 299 && id < 322){
            return 3 //Icono llovizna
        }
        if(id > 499 && id < 532){
            return 4 //Icono lluvia
        }
        if(id > 599 && id < 623){
            return 5 //Icono nieve
        }
        if(id <= 199){
            return 0
        }
    }
}
export default ServicioClima;