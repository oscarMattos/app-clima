// Function to do visible label input
function searchInput() {
	var label = document.getElementById('search-label');
	if(label.style.visibility == 'hidden'){
		label.style.visibility = 'visible';
	}else{
		label.style.visibility = 'visible';	
	}
	//label.style.visibility = (label.style.visibility!='hidden') ? 'visible' : 'visible';
}

// Function to do white text in input when leave this
function leaveInput() {
	var input = document.getElementById('search');
	input.style.color = "white";
}

// Function to do white text in input when return this
function comeBackInput() {
	var input = document.getElementById('search');
	input.style.color = "white";
}

// Funcion para detectar si el usuario presiona enter y no el boton del avioncito
function enterDetect(event) {
    if (event.which == 13 || event.keyCode == 13) {
        getWeather();
        return false;
    }
    return true;
};


// Function to get weather 
function getWeather(){
	var xmlhttp;
	var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var city = document.getElementById('search').value;
	var apiKey = '&APPID=37358de45ae2ebaa59786c62beab3551';
	var language = '&lang=es';
	var units = '&units=metric';

	if(city != ''){
		document.getElementById('busqueda').innerHTML = '<span class="subheading">Buscaste: </span><span class="subheading">' + city + '</span><hr class="divisor">';
	}

	try { //modern browsers
		xmlhttp = new XMLHttpRequest();
	} 
	catch (y) {
		try { //ie6
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");	
		} 
		catch (y){ //ie5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	xmlhttp.onreadystatechange = function (){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var data = xmlhttp.responseText;
				console.log(data);
				var weather = JSON.parse(data);
				console.log(weather);
				
				// Arrays con la info de la api
				var arrayData = [weather.sys.country, weather.name, weather.main.temp, weather.main.humidity, weather.main.pressure, weather.wind.speed, weather.weather[0].id, weather.sys.sunrise, weather.sys.sunset];
				var titlesData = ['Pais', 'Ciudad', 'Temperatura', 'Humedad', 'Presión', 'Viento', 'Amanecer', 'Atardecer'];
				var actualWeather = [weather.weather[0].description, weather.weather[0].icon, weather.weather[0].id, weather.weather[0].main];

				// Variables para armar el icono dinamicamente
				var prefix = 'wi wi-owm';
				var code = actualWeather[2];
				var icon;
				
				// Segun el valor del icono muestra el que es de dia o de noche
				  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
				    icon = '<i class="' + prefix + '-day-' + code + '"/></i>';
				  }
				  else{
				  	icon = '<i class="' + prefix + '-night-' + code + '"/></i>';
				  }

				// Parseando el unix para tener la hora de amanecer y atardecer
				var sunriseUnix = arrayData[7];
				var sunsetUnix = arrayData[6];
				
				var sunriseTime = new Date(sunriseUnix * 1000);
				var sunsetTime = new Date(sunsetUnix * 1000);

				var sunriseHour = sunriseTime.getHours();
				var sunriseMin = "0" + sunriseTime.getHours();
				var sunriseSec = "0" + sunriseTime.getHours();

				var sunsetHour = sunsetTime.getHours();
				var sunsetMin = "0" + sunsetTime.getMinutes();
				var sunsetSec = "0" + sunsetTime.getSeconds();

				var sunrise = sunriseHour + ':' + sunriseMin.substr(-2) + ':' + sunriseSec.substr(-2) + 'h'; 
				var sunset = sunsetHour + ':' + sunsetMin.substr(-2) + ':' + sunsetSec.substr(-2) + 'h';

				// Se dibujan los tag li en el dom con la info de la api
				document.getElementById('weather').innerHTML = 
					'<li>' + icon + '<p class="body2">' + actualWeather[0] + '</p></li>'+
					'<li><span class="body2">'+ titlesData[0] + ': </span><span class="body1">' + arrayData[0] + '</span></li>'+
					'<li><span class="body2">'+ titlesData[1] + ': </span><span class="body1">' + arrayData[1] + '</span></li>'+
					'<li><i class="wi wi-thermometer"></i> <span class="body2">'+ titlesData[2] + ': </span><span class="body1">' + arrayData[2] + 'Cº</span></li>'+
					'<li><i class="wi wi-humidity"></i> <span class="body2">'+ titlesData[3] + ': </span><span class="body1">' + arrayData[3] + '%</span></li>'+
					'<li><i class="wi wi-barometer"></i> <span class="body2">'+ titlesData[4] + ': </span><span class="body1">' + arrayData[4] + 'hPa</span></li>'+
					'<li><i class="wi wi-strong-wind"></i> <span class="body2">'+ titlesData[5] + ': </span><span class="body1">' + arrayData[5] + 'km/h</span></li>'+
					'<li><i class="wi wi-sunrise"></i> <span class="body2">'+ titlesData[6] + ': </span><span class="body1">' + sunrise + '</span></li>'+
					'<li><i class="wi wi-sunset"></i> <span class="body2">'+ titlesData[7] + ': </span><span class="body1">' + sunset + '</span></li>'
				;
				
			}else{

				document.getElementById('weather').innerHTML = '<h3 class="caption" style="color:red;">Hubo un error! Intentalo de vuelta...</h3>';
			}
		}
	}
	//"http://api.openweathermap.org/data/2.5/weather?q=London&APPID=37358de45ae2ebaa59786c62beab3551&units=metric"
	xmlhttp.open("GET", api + city + apiKey + language + units , true);
	xmlhttp.send();

	document.getElementById("search").value = "";

};