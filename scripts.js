$(document).ready(()=>{

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');

	var assumedTemp = 65;

	var currentPercent = 0;
	function animateCircle(currentArc){
		//Draw inner circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(155,100,70,Math.PI*0,Math.PI*2);
		context.fill();

		//Draw outer line
		context.lineWidth = 5;
		context.strokeColor = "#ff0";
		context.beginPath();
		//circle point starts at 3 oclock, need to start at 12, hence the Math.PI*1.5
		context.arc(155,100,75,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		context.stroke();
		//update current percentage;
		currentPercent++
		if(currentPercent < assumedTemp){
			requestAnimationFrame(function(){
			animateCircle(currentPercent/100);
		});

		}
	}

	animateCircle();

});