const nav = new Vue({
	el: '#nav',
	data: { // TODO data here
		titulo: "Climatic"
	}
})
/*
	Coordenadas:[{
		nombre: Papantla
		lat: 20.4567,
		lon: -97.3156
	},
	{
		nombre: Pachuca
		lat: 20.116,
		lon: -98.733
	},
	{
		nombre: Xalapa
		lat: 19.5426,
		lon: -96.9137
	}]
	
*/
const clima = new Vue({
	el: '#clima',
	data: { // TODO data here
		lat: 20.116,
		lon: -98.733,
		temperatura: "",
		nombreCiudad: "Pachuca",
		sensacion: "",
		humedad: "",
		estadoClima: "",
		descripcionClima: ""


	}, //Ends data
	methods:{ //TODO methods here
		obClima: async function(){
			try{
				const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&lang=es&appid=a1b6ad9591d61658f66fe94ddedb4f9c`)
				//const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=a1b6ad9591d61658f66fe94ddedb4f9c`)
				const datosClima = await response.json()
				let temperatura = datosClima.main.temp
				let sensacion = datosClima.main.feels_like
				let nombreCiudad = datosClima.name
				let humedad = datosClima.main.humidity
				let estadoClima = datosClima.weather[0].main
				let descripcionClima = datosClima.weather[0].description

				this.nombreCiudad = nombreCiudad
				this.temperatura = temperatura.toFixed(1).toString() + " °"
				this.sensacion = sensacion.toFixed(1).toString() + " °"
				this.humedad = humedad.toString() + " %"
				this.estadoClima = estadoClima
				this.descripcionClima = descripcionClima
				console.log(datosClima)
			}catch(e){
				console.log(e)
			}
		}
	} //Ends methods
})         