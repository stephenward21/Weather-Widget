//API Key is in config.js, so we can ignore it when pushing the code.

$(document).ready(()=>{

	const weatherAPI = "http://api.openweathermap.org/data/2.5/weather";

	$('#weather-form').submit(function(event){
		event.preventDefault();
		// console.log("user submitted the form");
		var zipCode = $('#zip-code').val();
		// console.log(zipCode)
		var weatherURL = `${weatherAPI}?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
		$.getJSON(weatherURL, (weatherData)=>{
			// console.log(weatherData);
			var curTemp = weatherData.main.temp;
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var descrip = weatherData.weather[0].description;
			var newHTML = '<img src="http://openweathermap.org/img/w/' + icon + '">' + descrip;
			newHTML += '<div>The temp in ' + name + ' is currently ' + curTemp + '&deg;</div>'
			$('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0,curTemp);
			console.log(curTemp)

		});
	
	});

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var assumedTemp = 65;
	var currentPercent = 0;

	function animateCircle(currentArc, currentTemp){
		if (currentTemp < assumedTemp){
			context.fillStyle = "#0000ff";
			context.beginPath();
			context.arc(155,100,70,Math.PI*0,Math.PI*2);
			context.closePath();
			context.fill();	
		}
		else{
			context.fillStyle = "#ff0000";
			context.beginPath();
			context.arc(155,100,70,Math.PI*0,Math.PI*2);
			context.closePath();
			context.fill();
		}

		// Draw inner circle
		// context.fillStyle = "#ccc";
		// context.beginPath();
		// context.arc(155,100,70,Math.PI*0,Math.PI*2);
		// context.closePath();
		// context.fill();
		context.font = "30px Comic Sans MS";
		context.textAlign = "center"
		context.fillText(currentTemp + '&deg', canvas.width/2, canvas.height/2);


		//Draw outer line
		context.lineWidth = 5;
		context.strokeColor = "#ffff00";
		context.beginPath();
		//circle point starts at 3 oclock, need to start at 12, hence the Math.PI*1.5
		context.arc(155,100,75,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		context.stroke();
		//update current percentage;
		currentPercent++
		if(currentPercent < currentTemp){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100, currentTemp);

			});
		}

		

		
	}

	// animateCircle();

});