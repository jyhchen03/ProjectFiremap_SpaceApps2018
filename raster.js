function getData(latitude, longitude) {
	return axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=e5d2334fc57b0005a1abcf1638be18a0')
	.then(function(response) {
		weather = response.data;
	})
	.then(function() {
		score = 10 * Math.exp(Math.log(2) - 0.45 - 0.0345 * weather.main.humidity + 0.0338 * (weather.main.temp - 273.15) + 0.0234 * (weather.wind.speed * 36 / 10));
		console.log(score);
		document.getElementById('firescore').innerHTML = "Fire risk: " + score.toFixed(2);
		document.getElementById('temperature').innerHTML = "Temperature: " + (weather.main.temp - 273.15).toFixed(1) + " °C";
		document.getElementById('location').innerHTML = "Approximate location: " + weather.name + ", " + weather.sys.country;
		document.getElementById('weather').innerHTML = "Weather: " + weather.weather[0].main;
		document.getElementById("windspeed").innerHTML = "Windspeed: " + (weather.wind.speed * 10 / 36).toFixed(2) + " km/h";
		document.getElementById("humidity").innerHTML = "Humidity: " + weather.main.humidity.toFixed(0) + "%";
		return score;
		/* do something with the result */
	})
	.then(function(score) {
		return {
			location: {
				center: {lat: latitude, lng: longitude},
				fire_index: score
			}
		};
	})
	.catch(function(error) {
		console.log(error);
		/* error :( */
	});
}

function colour (location) {
	// calculates the colour of each location based on the fire index
	if (location.fire_index <= 5) {
		return '#F7F7F7';
	}
	else if (location.fire_index <= 10) {
		return '#FFFF24';
	}
	else if (location.fire_index <= 15) {
		return '#F5C400';
	}
	else if (location.fire_index <= 20) {
		return '#F58F00';
	}
	else if (location.fire_index <= 25) {
		return '#FF0000';
	}
	else if (location.fire_index <= 50) {
		return '#620007';
	}
	else if (location.fire_index <= 75) {
		return '#450045';
	}
	else {
		return '#000000';
	}
}