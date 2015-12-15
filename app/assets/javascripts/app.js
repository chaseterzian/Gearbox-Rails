g = 9.81;
fullReportDataStored = [];
/////////////////////////////////////////////////////////////////////////////
function carMovementInWords(data, start, stop, dropDataPoints, redlineX, redlineY, redlineZ, wordsStabilizerNumber) { 
	var int = 0;
	var timer = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {

			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < wordsStabilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/wordsStabilizerNumber;
				dataStableY = dataStableY/wordsStabilizerNumber;
				dataStableZ = dataStableZ/wordsStabilizerNumber;

			if(data[start][27] > 0) { 
				if (dataStableX > 1) { document.getElementById("left-right-straight-window").innerHTML = "Turning Right"; }
				else if (dataStableX < -1) { document.getElementById("left-right-straight-window").innerHTML = "Turning Left"; }
				else { document.getElementById("left-right-straight-window").innerHTML = "Driving Straight"; }

				document.getElementById("and-window").innerHTML = " And "

				if (-dataStableY > 6) { document.getElementById("braking-accelerating-in-words").innerHTML = "Braking Hard"; }//Y IS FLIPPED
				else if (-dataStableY < -3) { document.getElementById("braking-accelerating-in-words").innerHTML = "Accelerating Quickly"; }//Y IS FLIPPED
				else if (-dataStableY < -.8) { document.getElementById("braking-accelerating-in-words").innerHTML = "Accelerating"; }//Y IS FLIPPED
				else if (-dataStableY > 1) { document.getElementById("braking-accelerating-in-words").innerHTML = "Braking"; }//Y IS FLIPPED
				else { document.getElementById("braking-accelerating-in-words").innerHTML = "Coasting"; }
				
				} else {
				document.getElementById("left-right-straight-window").innerHTML = "Stopped";
			}

			start += dropDataPoints;
			int += dropDataPoints;
			timer += 8;

		}, data[ii][31]*dropDataPoints);//MS
	}
}//LOOP1		
/////////////////////////////////////////////////////////////////////////////
function liveDataPrintOut(data, start, stop, dropDataPoints, dataStabilizeNumber) { 
	var int = 0;
	var timer = 0;////

	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {

			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < dataStabilizeNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/dataStabilizeNumber;
				dataStableY = dataStableY/dataStabilizeNumber;
				dataStableZ = dataStableZ/dataStabilizeNumber;

	var speedInMphWindowElem = document.getElementById("speed-in-mph-window");//SO I DONT QUERY THE DOM 100 TIMES PER SECOND
	// var highestAllAxesWindowELem = document.getElementById("highest-all-axes-window");
	var timeWindowElem = document.getElementById("time-window");
	var soundLevelWindowElem = document.getElementById("sound-level-window");
	var altitudeWindowElem = document.getElementById("altitude-window");
	var xAxisWindowElem = document.getElementById("x-axis-window");
	var yAxisWindowElem = document.getElementById("y-axis-window");
	var zAxisWindowElem = document.getElementById("z-axis-window");
	var dataPointsWindowElem = document.getElementById("data-points-window");
		document.getElementById("highest-all-axes-window").innerHTML = highestAllAxesWithTime(data);//MAX FORCE OF ALL DATA AT TIME
		speedInMphWindowElem.innerHTML = "Speed in MPH: " + data[start][27];
		timeWindowElem.innerHTML = "Time: " + data[start][33] + ":" + data[start][34] + ":" + data[start][35] + ":" + data[start][36];
			var soundLevelToRound = data[start][21]-80
		soundLevelWindowElem.innerHTML = "dB Level: " + Math.round(soundLevelToRound)/10;
		altitudeWindowElem.innerHTML = "Altitude in ft: " + data[start][24];
		xAxisWindowElem.innerHTML = "X: " + Math.round(100*dataStableX)/100;
		yAxisWindowElem.innerHTML = "Y: " + Math.round(100*dataStableY)/100;
		zAxisWindowElem.innerHTML = "Z: " + Math.round(100*dataStableZ)/100;
		dataPointsWindowElem.innerHTML = "Data Points: " + int;

		start += dropDataPoints;
			int += dropDataPoints;
			timer += 8;

		}, data[ii][31]*dropDataPoints);//MS
	}
}//LOOP1
/////////////////////////////////////////////////////////////////////////////
function warningMessages(data, start, stop, dropDataPoints, redlineX, redlineY, redlineZ) { 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var timer = 0;
		for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
			setTimeout(function () {

				if (data[start][2] >= 2*g) {//BUMP
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- The car went over a large bump (" + data[start][2]/g + "m/s^2 toward the road)";
					// $('#text-div-good-driver').hide();
				}
				if (data[start][2] <= 0*g) {//AIRBORNE - BRAKS ON CIRCLE GRAPHIC
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- You are now airborne, goodnight";
					// $('#text-div-good-driver').hide();
				}
				if (-data[start][0] >= redlineX) {//HARD LEFT
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- Hard left turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div-good-driver').hide();
				}
				if (-data[start][0] < -redlineX) {//HARD RIGHT
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- Hard right turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div7').hide();
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] <= -redlineY) {//BRAKING
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- Heavy braking event (" +
						data[start][1] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > redlineY) {//ACCELERATION
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"- Heavy acceleration event (" +
						data[start][1] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] < -redlineY && data[start][0] > redlineX || data[start][1] < -redlineY && data[start][0] < -redlineX) {//HEAVY BRAKING
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"***WARNING - Heavy braking combined with hard cornering: (" +
						data[start][1] + "m/s^2 forward, and " + data[start][0] + "m/2^2 to the side, while moving at " + data[start][27] + " MPH. ";
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > redlineY && data[start][0] >= redlineX || data[start][1] > redlineY && data[start][0] < -redlineX) {//HEAVY ACCELERATION
					ctx.fillStyle=("red");
					document.getElementById("text-div-report").innerHTML =
					"***WARNING - Heavy acceleration combined with hard cornering: (" +
						data[start][1] + "m/s^2 backward, and " + data[start][0] + " m/2^2 to the side, while moving at " + data[start][27] + " MPH."
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > 2*g) {//CRASH AUTO CONTACT HELP************
					document.getElementById("text-div-report").innerHTML =
					"***ACCIDENT WARNING: It seems that you may have been in an accident. Time: " + int;
					// $('#text-div-good-driver').hide();
				}
				if (data[start][21] > 125) {//SOUND
					console.log(data[start][21])
					document.getElementById("text-div-report").innerHTML = "- With the stereo this high, you may not hear the horns of other cars";
				}

				start += dropDataPoints;
				int += dropDataPoints;
				timer += 8;

			}, data[ii][31]*dropDataPoints);//MS

			ctx.fillStyle=("black");
			setTimeout(function() {
					document.getElementById("text-div-report").innerHTML = "- No swerving, heavy braking/acceleration or aggressive turning has been detected.";
			}, 4000);

	}
}//LOOP1
/////////////////////////////////////////////////////////////////////////////
function reportDetailsFull(data, start, stop, dropDataPoints, redlineX, redlineY, redlineZ) { 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var timer = 0;
		for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+dropDataPoints) {
			setTimeout(function () {

				if (data[start][2] >= 2*g) {//BUMP
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"- The car went over a large bump (" + data[start][2]/g + "m/s^2 toward the road)";
					// $('#text-div-good-driver').hide();
				}
				if (data[start][2] <= 0*g) {//AIRBORNE - BRAKS ON CIRCLE GRAPHIC
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"- You are now airborne, goodnight";
					// $('#text-div-good-driver').hide();
				}
				
				if (-data[start][0] >= redlineX) {//HARD LEFT
					ctx.fillStyle=("red");
					fullReportDataStored.push(
						"- Hard left turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int);

					var hardLeft = document.createElement('div');
					hardLeft.innerHTML = 
						"- Hard left turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
					document.getElementById("text-div-report-full").appendChild(hardLeft);		
				}
				

				if (-data[start][0] < -redlineX) {//HARD RIGHT
					ctx.fillStyle=("red");
					var hardRight = document.createElement('div');
					hardRight.innerHTML =
						"- Hard right turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
					document.getElementById("text-div-report-full").appendChild(hardRight);		
						// $('#text-div7').hide();
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] <= -redlineY) {//BRAKING
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"- Heavy braking event (" +
						data[start][1] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > redlineY) {//ACCELERATION
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"- Heavy acceleration event (" +
						data[start][1] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int;
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] < -redlineY && data[start][0] > redlineX || data[start][1] < -redlineY && data[start][0] < -redlineX) {//HEAVY BRAKING
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"***WARNING - Heavy braking combined with hard cornering: (" +
						data[start][1] + "m/s^2 forward, and " + data[start][0] + "m/2^2 to the side, while moving at " + data[start][27] + " MPH. ";
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > redlineY && data[start][0] >= redlineX || data[start][1] > redlineY && data[start][0] < -redlineX) {//HEAVY ACCELERATION
					ctx.fillStyle=("red");
					document.getElementById("text-div-report-full").innerHTML =
					"***WARNING - Heavy acceleration combined with hard cornering: (" +
						data[start][1] + "m/s^2 backward, and " + data[start][0] + " m/2^2 to the side, while moving at " + data[start][27] + " MPH."
						// $('#text-div-good-driver').hide();
				}
				if (data[start][1] > 2*g) {//CRASH AUTO CONTACT HELP************
					document.getElementById("text-div-report-full").innerHTML =
					"***ACCIDENT WARNING: It seems that you may have been in an accident. Time: " + int;
					$('#text-div-good-driver').hide();
				}
				if (data[start][21] > 125) {//SOUND
					console.log(data[start][21])
					document.getElementById("text-div-report-full").innerHTML = "- With the stereo this high, you may not hear the horns of other cars";
				}

				start += dropDataPoints;
				int += dropDataPoints;
				timer += 8;//?

			}, data[ii][31]);//MS

			ctx.fillStyle=("black");
			setTimeout(function() {
				var goodDriver = document.getElementById('text-div-good-driver');
					goodDriver.innerHTML = "- No swerving, heavy braking/acceleration or aggressive turning has been detected.";
			}, 4000);

	}
}//LOOP1
/////////////////////////////////////////////////////////////////////////////
function carMovementAndPositionVisuals(data, start, stop, multiX, multiY, multiZ, dropDataPoints, redlineX, redlineY, redlineZ, visualsStablilizerNumber) { 
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var timer = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {

			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			ctx.scale(1,1);
			ctx.translate(canvas.width/2, canvas.height/2);//DO PERCENTAGES FOR BALL
			ctx.rotate(dataStableX/6);
	
				// ctx.lineWidth = 1;				
				// ctx.beginPath(); ctx.arc(0, 0, 600, 600, Math.PI, true); ctx.stroke(); ctx.closePath();//LARGE CIRCLE
				// ctx.beginPath(); ctx.arc(0, 0, 603, 603, Math.PI, true); ctx.stroke(); ctx.closePath();
				// ctx.beginPath(); ctx.arc(0, 0, 606, 606, Math.PI, true); ctx.stroke(); ctx.closePath();
				// ctx.beginPath(); ctx.arc(0, 0, 609, 609, Math.PI, true); ctx.stroke(); ctx.closePath();
				// ctx.beginPath(); ctx.arc(0, 0, 611, 611, Math.PI, true); ctx.stroke(); ctx.closePath();

				ctx.lineWidth = 1;
				if (data[start][2] >= redlineZ || data[start][2] < -redlineZ) { ctx.strokeStyle=("red"); }
				else {ctx.strokeStyle=("black");}
				if (data[start][2] > 1) { 
					ctx.beginPath(); ctx.arc(0, 0, 1+dataStableZ*multiZ*12, 5+dataStableZ*multiZ*12, Math.PI, true); ctx.stroke();//LARGE Z-CIRCLE
					ctx.beginPath(); ctx.arc(0, 0, 6+dataStableZ*multiZ*12, 6+dataStableZ*multiZ*12, Math.PI, true); ctx.stroke();
					ctx.beginPath(); ctx.arc(0, 0, 11+dataStableZ*multiZ*12, 11+dataStableZ*multiZ*12, Math.PI, true); ctx.stroke();
				}

				if (data[start][0] >= redlineX || data[start][0] < -redlineX) { ctx.fillStyle=("red"); }
				if (data[start][1] >= redlineY || data[start][1] < -redlineY) { ctx.fillStyle=("red"); }
				else {ctx.strokeStyle=("black");}
				if (data[start][2] > 1) {
					ctx.beginPath(); ctx.arc(0, 0, 1+data[start][2]*multiZ, 1+data[start][2]*multiZ, Math.PI, true); ctx.stroke();//Z-CIRCLE
				}

				if (data[start][0] >= redlineX || data[start][0] < -redlineX) { ctx.fillStyle=("red"); }
				else {ctx.fillStyle=("black");}
					ctx.beginPath(); ctx.arc(-dataStableX*multiX, 0,20,20, Math.PI, true); ctx.fill();//G BALL X
					ctx.beginPath(); ctx.arc(-dataStableX*multiX, 0,25,25, Math.PI, true); ctx.stroke();

					if (data[start][1] >= redlineY || data[start][1] < -redlineY) { ctx.fillStyle=("red"); }
					else {ctx.fillStyle=("black");}
					ctx.beginPath(); ctx.arc(0, dataStableY*multiY,20,20, Math.PI, true); ctx.fill();//G BALL Y
					ctx.beginPath(); ctx.arc(0, dataStableY*multiY,25,25, Math.PI, true); ctx.stroke();
					ctx.lineWidth = 1;

				// if (data[start][0] >= redline || data[start][0] < -redline) { ctx.strokeStyle=("red"); }
				// if (data[start][1] >= redline || data[start][1] < -redline) { ctx.strokeStyle=("red"); }
				// else {ctx.strokeStyle=("black");}
				// ctx.lineWidth = 1;
				// ctx.beginPath(); ctx.lineTo(data[start][1]*multiY,-300); ctx.lineTo(-data[start][1]*multiY,-300); ctx.stroke(); ctx.closePath();//EXPANDING Y
				// ctx.beginPath(); ctx.lineTo(data[start][1]*multiY,-297); ctx.lineTo(-data[start][1]*multiY,-297); ctx.stroke(); ctx.closePath();//EXPANDING Y
				// ctx.beginPath(); ctx.lineTo(data[start][1]*multiY,-294); ctx.lineTo(-data[start][1]*multiY,-294); ctx.stroke(); ctx.closePath();//EXPANDING Y
				// ctx.beginPath(); ctx.lineTo(data[start][1]*multiY,-291); ctx.lineTo(-data[start][1]*multiY,-291); ctx.stroke(); ctx.closePath();//EXPANDING Y
				// ctx.beginPath(); ctx.lineTo(data[start][1]*multiY,-288); ctx.lineTo(-data[start][1]*multiY,-288); ctx.stroke(); ctx.closePath();//EXPANDING Y

				if (data[start][0] >= 0) {
					ctx.beginPath(); ctx.lineTo(-410, data[start][0]*multiX); ctx.lineTo(-410, -data[start][0]*multiX);//EXPANDING XL
					ctx.beginPath(); ctx.lineTo(-400, data[start][0]*multiX); ctx.lineTo(-400, -data[start][0]*multiX);
					ctx.stroke(); ctx.closePath();
				}	else {
					ctx.beginPath(); ctx.lineTo(400, -data[start][0]*multiX); ctx.lineTo(400, data[start][0]*multiX);//EXPANDING XR
					ctx.beginPath(); ctx.lineTo(410, -data[start][0]*multiX); ctx.lineTo(410, data[start][0]*multiX);
					ctx.stroke(); ctx.closePath();
				}

				var xPoints = [600,-600,600,-600,600,-600,600,-600,600,-600,-6,-6,-3,-3,0,0,3,3,6,6];//GRID FOR XYZ MODEL
				var yPoints = [-6,-6,-3,-3,0,0,3,3,6,6,400,-300,400,-300,400,-300,400,-300,400,-300];
				// ctx.lineWidth = 5;
				ctx.lineWidth = 1;
				ctx.strokeStyle = "black";
				for (var i=0; i<xPoints.length; i=i+2) { 
					ctx.beginPath(); ctx.lineTo(xPoints[i],yPoints[i]); ctx.lineTo(xPoints[i+1],yPoints[i+1]); ctx.stroke(); ctx.closePath();
				}//GRID FOR XYZ MODEL

				// var xPoints = [-400,-400,-400,-400,-400,-400,-400,-400,-400,-400,400,400,400,400,400,400,400,400,400,400];//ROAD VISUAL
				// var yPoints = [-250,-350,-50,-150,50,150,50,150,250,350,-250,-350,-50,-150,50,150,50,150,250,350];
				// ctx.lineWidth = 5;
				// if (data[start][27] < 1.0) { 
				// 	for (var i=0; i<xPoints.length; i=i+2) { 
				// 		ctx.beginPath(); ctx.lineTo(xPoints[i],yPoints[i]); ctx.lineTo(xPoints[i+1],yPoints[i+1]); ctx.stroke(); ctx.closePath();
				// 	}
				// } else { 
				// 	if (start%2 === 0) { 
				// 		var xPoints2  = [-400,-400,-400,-400,-400,-400,400,400,400,400,400,400];
				// 		var yPoints2 = [-150,-250,50,-50,150,250,-150,-250,50,-50,150,250];
				// 		for (var i=0; i<xPoints.length; i=i+2) { 
				// 			ctx.beginPath(); ctx.lineTo(xPoints2[i],yPoints2[i]); ctx.lineTo(xPoints2[i+1],yPoints2[i+1]); ctx.stroke(); ctx.closePath();
				// 		}
				// 	} else { 
				// 		var xPoints3  = [-400,-400,-400,-400,-400,-400,-400,-400,-400,-400,400,400,400,400,400,400,400,400,400,400];
				// 		var yPoints3 = [-250,-350,-50,-150,50,150,50,150,250,350,-250,-350,-50,-150,50,150,50,150,250,350];
				// 		for (var i=0; i<xPoints.length; i=i+2) { 
				// 			ctx.beginPath(); ctx.lineTo(xPoints3[i],yPoints3[i]); ctx.lineTo(xPoints3[i+1],yPoints3[i+1]); ctx.stroke(); ctx.closePath();
				// 		}
				// 	}
				// }//ROAD VISUAL

				ctx.strokeStyle = 'black';//CAR TOP VIEW
				var pointsX = [-100,100,-100,-35,35,100,-35,-25,35,25,-150,-100,150,100,-150,-150,150,150,-150,-130,
											150,130,-150,150,-130,-35,130,35,-35,35,-35,-35,35,35,-105,-105,105,105,-105,-60,
											105,60,-150,-105,-150,-105,-150,-105,150,105,150,105,150,105,-120,-120,-120,-120,120,120,
											120,120,-60,-60,-30,-30,0,0,30,30,60,60,-115,-60,-100,-50,-100,-100,-65,-65,
									   		-60,-50,115,60,100,50,100,100,65,65,60,50,-100,100,-85,85,-100,-85,100,85,
											-85,85,-100,100,-85,-100,85,100];
				var pointsY = [-200,-200,-200,-200,-200,-200,-200,-190,-200,-190,-100,-200,-100,-200,310,-100,310,-100,310,350,
											310,350,310,310,350,350,350,350,330,330,330,350,330,350,280,-77,280,-77,-77,-180,
											-77,-180,0,30,100,120,200,210,0,30,100,120,200,210,85,100,175,190,85,100,
											175,190,48,155,45,152,40,160,45,152,48,155,290,290,310,310,290,310,290,310,
											290,310,290,290,310,310,290,310,290,310,290,310,-40,-40,30,30,-40,30,-40,30,
											170,170,260,260,170,260,170,260];
				var wheels = [0,30,150,0,  0,-40,150,0,  -140,-50,33,33,  -140,-50,30,30,  140,-50,33,33,  140,-50,30,30, 
										    -140,275,33,33,  -140,275,30,30,  140,275,33,33,  140,275,30,30,  
										    -140,-50,32,32,  140,-50,32,32,  -140,275,32,32, 140,275,32,32];
					for (var i=0; i<pointsX.length; i=i+2){
						if(i>91 && i<=107) { ctx.lineWidth = 5; }
						if(i>71 && i<=91) { ctx.lineWidth = 2; }
						if(i>61 && i<=71) { ctx.lineWidth = 1; }
						if(i>53 && i<=61) { ctx.lineWidth = 4; }
						if(i<=53) { ctx.lineWidth = 4; }
						ctx.beginPath(); ctx.lineTo(pointsX[i], pointsY[i]); ctx.lineTo(pointsX[i+1], pointsY[i+1]); ctx.stroke(); ctx.closePath();						
					}
					for (var i=0; i<wheels.length; i=i+4) { 
						ctx.lineWidth = 3;
						if( i<=39) { ctx.beginPath(); ctx.arc(wheels[i], wheels[i+1],wheels[i+2],wheels[i+3], Math.PI, true); ctx.stroke(); ctx.closePath(); }
						if(i>39 && i<55) { ctx.beginPath(); ctx.arc(wheels[i],wheels[i+1],wheels[i+2],wheels[i+3],Math.PI, true); ctx.fillStyle = 'black'; ctx.fill(); ctx.closePath(); }
  				}//CAR TOP VIEW

			start += dropDataPoints;
			int += dropDataPoints;
			timer += 8;

		}, data[ii][31]*dropDataPoints);//MS
	}
}//LOOP1
/////////////////////////////////////////////////////////////////////////////
function carModelFromBack(data, start, stop, multiX, multiY, multiZ, dropDataPoints, redlineX, redlineY, redlineZ, visualsStablilizerNumber) {
	var canvas = document.getElementById('car-model-back');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var timer = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {

			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			ctx.canvas.width  = window.innerWidth/2;
			ctx.canvas.height = window.innerHeight/2+100;
			ctx.scale(1,1);
			ctx.translate(canvas.width/2, canvas.height/2);
			ctx.rotate(-dataStableX/10);

			var pointsX = [-180,180,-195,-195,195,195,-195,-180,195,180,-195,-165,195,165,-165,-150,165,150,-150,150,
								-170,170,-170,-140,170,140,-140,140,-170,-170,-165,-165,-160,-160,-155,-155,-145,-145,-140,-140,
								-135,-135,-130,-130,170,170,165,165,160,160,155,155,145,145,140,140,135,135,130,130,
								-195,195,-195,-55,195,55,-55,-40,55,40,-50,50,-60,60,-60,60,-60,-60,60,60,
								-180,-180,-120,-120,180,180,120,120,-195,-100,195,100,-100,-100,100,100,-160,-170,160,170];
			var pointsY = [100,100,75,-40,75,-40,75,100,75,100,-40,-150,-40,-150,-150,-160,-150,-160,-160,-160,
								-50,-50,-50,-145,-50,-145,-145,-145,100,140,100,143,100,145,100,147,100,147,100,145,
								100,143,100,140,100,140,100,143,100,145,100,147,100,147,100,145,100,143,100,140,
								-40,-40,70,70,70,70,70,100,70,100,80,80,30,30,50,50,30,50,30,50,
								100,120,100,120,100,120,100,120,0,0,0,0,0,-40,0,-40,0,-40,0,-40];
			var circles = [-120,-20,12,12,  -150,-20,12,12,  120,-20,12,12,  150,-20,12,12];

			for(var i=0; i<pointsX.length; i=i+2) {
				if (i <= 19) { ctx.lineWidth = 5; }
				if (i>19 && i<=27) { ctx.lineWidth = 2; }
				if (i>27 && i<=71) { ctx.lineWidth = 3; }
				if (i>71 && i<=79) { ctx.lineWidth = 2; }
				if (i>79 && i<=87) { ctx.lineWidth = 5; }
				if (i>87 && i<=99) { ctx.lineWidth = 2; }
				ctx.beginPath(); ctx.lineTo(pointsX[i], pointsY[i]); ctx.lineTo(pointsX[i+1], pointsY[i+1]); ctx.stroke(); ctx.closePath();
			}

			if (data[start][1] < -redlineY) { ctx.strokeStyle=("red"); ctx.fillStyle=("red"); }
			else {ctx.strokeStyle=("black"); ctx.fillStyle=("black"); }
			for(var i=0; i<circles.length; i=i+4) { 
				ctx.beginPath(); ctx.arc(circles[i],circles[i+1],circles[i+2],circles[i+3], Math.PI, true); ctx.fill(); ctx.closePath();
			}

			if (data[start][1] > redlineY) { ctx.strokeStyle=("red"); } 
			else { ctx.strokeStyle=("black"); }
				ctx.lineWidth = 5;
				ctx.beginPath(); ctx.arc(-150,120,30,0, Math.PI); ctx.stroke(); ctx.closePath();//L WHEEL
				ctx.beginPath(); ctx.arc(150,120,30,0, Math.PI); ctx.stroke(); ctx.closePath();//R WHEEL
					start += dropDataPoints;
					int += dropDataPoints;
					timer += 8;	

		}, data[ii][31]*dropDataPoints);
	}
}//LOOP1
/////////////////////////////////////////////////////////////////////////////
function steeringWheelModel(data, start, stop, multiX, multiY, multiZ, dropDataPoints, visualsStablilizerNumber) {
	var canvas = document.getElementById('canvas-wheel');
	var ctx = canvas.getContext('2d');
	var int = 0;

	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {
			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			// var pointsArc = [0,0,325,325,  0,0,320,320,  0,0,315,315,  0,0,310,310,  0,0,305,305,  
			// 				 0,0,300,300,  0,0,295,295,  0,0,290,290,  0,0,285,285,  0,0,280,280];
			
			// var pointsXy = [-295,-40,295,40,  -295,-30,295,30,  -295,-20,295,20, -295,-10,295,10,  -295,0,295,0,
			// 				20,297,20,0,  10,297,10,0,  0,297,0,0,  -10,297,-10,0,  -20,297,-20,0,
			// 				-150,0,-20,150,  -140,0,-20,-140,  -130,0,-20,130,  -120,0,-20,120,  -110,0,-20,110];


			ctx.canvas.width  = window.innerWidth;
	  		ctx.canvas.height = 800;//window.innerHeight;
	  		ctx.scale(1,1);
	  		ctx.translate(canvas.width/2, canvas.height/2);
	  		ctx.rotate(dataStableX/2);
	  		ctx.strokeStyle="black";
	
		  		ctx.lineWidth = 3;
				ctx.beginPath(); ctx.arc(0, 0, 325, 325, Math.PI, true); ctx.stroke();
	  			ctx.beginPath(); ctx.arc(0, 0, 320, 320, Math.PI, true); ctx.stroke();
	  			ctx.beginPath(); ctx.arc(0, 0, 315, 315, Math.PI, true); ctx.stroke();
	  			ctx.beginPath(); ctx.arc(0, 0, 310, 310, Math.PI, true); ctx.stroke();
	  			ctx.beginPath(); ctx.arc(0, 0, 305, 305, Math.PI, true); ctx.stroke();
				ctx.beginPath(); ctx.arc(0, 0, 300, 300, Math.PI, true); ctx.stroke();
				ctx.beginPath(); ctx.arc(0, 0, 295, 295, Math.PI, true); ctx.stroke();
				ctx.beginPath(); ctx.arc(0, 0, 290, 290, Math.PI, true); ctx.stroke();
				ctx.beginPath(); ctx.arc(0, 0, 285, 285, Math.PI, true); ctx.stroke();
				ctx.beginPath(); ctx.arc(0, 0, 280, 280, Math.PI, true); ctx.stroke();
				
				ctx.lineWidth = 3;
				ctx.beginPath(); ctx.lineTo(-295,-40); ctx.lineTo(295,-40); ctx.stroke(); ctx.closePath();//X
				ctx.beginPath(); ctx.lineTo(-295,-30); ctx.lineTo(295,-30); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-295,-20); ctx.lineTo(295,-20); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-295,-10); ctx.lineTo(295,-10); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-295,0); ctx.lineTo(295,0); ctx.stroke(); ctx.closePath();
				
				ctx.beginPath(); ctx.lineTo(20,297); ctx.lineTo(20,0); ctx.stroke(); ctx.closePath();//Y
				ctx.beginPath(); ctx.lineTo(10,297); ctx.lineTo(10,0); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(0,297); ctx.lineTo(0,0); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-10,297); ctx.lineTo(-10,0); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-20,297); ctx.lineTo(-20,0); ctx.stroke(); ctx.closePath();

				ctx.beginPath(); ctx.lineTo(-150,0); ctx.lineTo(-20,150); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-140,0); ctx.lineTo(-20,140); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-130,0); ctx.lineTo(-20,130); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-120,0); ctx.lineTo(-20,120); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-110,0); ctx.lineTo(-20,110); ctx.stroke(); ctx.closePath();//STOPPED REFACTOR POINTS ON PLANE

				ctx.beginPath(); ctx.lineTo(150,0); ctx.lineTo(20,150); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(140,0); ctx.lineTo(20,140); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(130,0); ctx.lineTo(20,130); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(120,0); ctx.lineTo(20,120); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(110,0); ctx.lineTo(20,110); ctx.stroke(); ctx.closePath();

				start += dropDataPoints;
				int += dropDataPoints;
		}, data[ii][31]*dropDataPoints);
	}
}//LOOP2 NO TIMER
/////////////////////////////////////////////////////////////////////////////
function orientation(data, start, stop, dropDataPoints) { 
	var canvas = document.getElementById('canvas-compas');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var direction = 'N';

	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {
			ctx.canvas.width  = window.innerWidth;
	  		ctx.canvas.height = 800;//window.innerHeight;
	  		ctx.scale(1,1);
	  		ctx.translate(canvas.width/2, canvas.height/2);
	  		ctx.rotate((Math.PI/180)*data[start][29]);

	  		// var compassCircles = [0,0,325,325, 0,0,320,320, 0,0,315,315,  0,0,310,310,  0,0,305,305,  0,0,300,300,  
	  		// 					  0,0,295,295,  0,0,290,290,  0,0,285,285,  0,0,280,280];

	  		// var pointsX = [-70,0, 70,0, -60,0, 60,0, -50,0, 50,0, -40,0, 40,0, -30,0, 30,0, -20,0, 20,0 -10,0, 10,0];

	  		// var pointsY = [];

	  			ctx.strokeStyle="black";
	  			ctx.lineWidth = 1;
	  			ctx.beginPath(); ctx.arc(0, 0, 325, 325, Math.PI, true); ctx.stroke();//COMPASS
	  			ctx.beginPath(); ctx.arc(0, 0, 320, 320, Math.PI, true); ctx.stroke();//COMPASS
	  			ctx.beginPath(); ctx.arc(0, 0, 315, 315, Math.PI, true); ctx.stroke();//COMPASS
	  			ctx.beginPath(); ctx.arc(0, 0, 310, 310, Math.PI, true); ctx.stroke();//COMPASS
	  			ctx.beginPath(); ctx.arc(0, 0, 305, 305, Math.PI, true); ctx.stroke();//COMPASS
				ctx.beginPath(); ctx.arc(0, 0, 300, 300, Math.PI, true); ctx.stroke();//COMPASS
				ctx.beginPath(); ctx.arc(0, 0, 295, 295, Math.PI, true); ctx.stroke();//COMPASS
				ctx.beginPath(); ctx.arc(0, 0, 290, 290, Math.PI, true); ctx.stroke();//COMPASS
				ctx.beginPath(); ctx.arc(0, 0, 285, 285, Math.PI, true); ctx.stroke();//COMPASS
				ctx.beginPath(); ctx.arc(0, 0, 280, 280, Math.PI, true); ctx.stroke();//COMPASS

				ctx.lineWidth = 1;
				ctx.beginPath(); ctx.lineTo(-70,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(70,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-60,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(60,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-50,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(50,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-40,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(40,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-30,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(30,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-20,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(20,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-10,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(10,375); ctx.lineTo(0,-300); ctx.stroke(); ctx.closePath();
				
				ctx.beginPath(); ctx.lineTo(-400,0); ctx.lineTo(-100,0); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-400,0); ctx.lineTo(-100,25); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-400,0); ctx.lineTo(-100,15); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-400,0); ctx.lineTo(-100,-25); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(-400,0); ctx.lineTo(-100,-15); ctx.stroke(); ctx.closePath();

				ctx.beginPath(); ctx.lineTo(400,0); ctx.lineTo(100,0); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(400,0); ctx.lineTo(100,25); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(400,0); ctx.lineTo(100,15); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(400,0); ctx.lineTo(100,-25); ctx.stroke(); ctx.closePath();
				ctx.beginPath(); ctx.lineTo(400,0); ctx.lineTo(100,-15); ctx.stroke(); ctx.closePath();
				ctx.strokeStyle = 'red';
				ctx.beginPath(); ctx.lineTo(0,-300); ctx.lineTo(0,0); ctx.stroke(); ctx.closePath();
				
				if (data[start][29] >= 337.5 || data[start][29] <= 22.5) { direction = 'N'; } 
				if (data[start][29] > 22.5 && data[start][29] <=67.5 ) { direction = 'NE'; } 
				if (data[start][29] > 67.5 && data[start][29] <=112.5 ) { direction = 'E'; } 
				if (data[start][29] > 112.5 && data[start][29] <=157.5 ) { direction = 'SE'; } 
				if (data[start][29] > 157.5 && data[start][29] <=202.5 ) { direction = 'S'; } 
				if (data[start][29] > 202.5 && data[start][29] <=247.5 ) { direction = 'SW'; } 
				if (data[start][29] > 247.5 && data[start][29] <=292.5 ) { direction = 'W'; } 
				if (data[start][29] > 292.5 && data[start][29] <=337.5 ) { direction = 'NW'; } 

				start += dropDataPoints;
				int += dropDataPoints;
				// document.getElementById("orientation-in-degrees").innerHTML = 'Orientation: ' + data[start][29];
				document.getElementById("heading").innerHTML = 'Direction: ' + direction;
		}, data[ii][31]*dropDataPoints);
	}
}//LOOP2 NO TIMER
/////////////////////////////////////////////////////////////////////////////
function highestAllAxesWithTime(data) {//consoleXYZ with time
	var dataXYZ = [['X',0,0],['Y',0,0],['Z',0,0]];
	for (var i=0; i<data.length; i++) {
		if (dataXYZ[0][2] < data[i][1]) { dataXYZ[0][2] = data[i][1]; dataXYZ[0][1] = data[i][0]; }
		if (dataXYZ[1][2] < data[i][2]) { dataXYZ[1][2] = data[i][2]; dataXYZ[1][1] = data[i][0]; }
		if (dataXYZ[2][2] < data[i][3]) { dataXYZ[2][2] = data[i][3]; dataXYZ[2][1] = data[i][0]; }
	}
	return "Max: " + dataXYZ[0] + " /// " + dataXYZ[1] + " /// " + dataXYZ[2] + " /// ";
}
/////////////////////////////////////////////////////////////////////////////
function reportContentAccelerometerVisuals(data, start, stop, multiX, multiY, multiZ, dropDataPoints, redlineX, redlineY, redlineZ, visualsStablilizerNumber) { 
	var canvas = document.getElementById('canvas-reportcontent');
	var ctx = canvas.getContext('2d');
	var int = 0;
	var timer = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {

			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			ctx.scale(.8,.8);
			ctx.translate(canvas.width/2, canvas.height/2);//DO PERCENTAGES FOR BALL
			ctx.rotate(dataStableX/6);


				if (data[start][0] >= redlineX || data[start][0] < -redlineX) { ctx.fillStyle=("red"); }
				else {ctx.fillStyle=("black");}
					ctx.beginPath(); ctx.arc(-dataStableX*multiX, 0,30,30, Math.PI, true); ctx.fill();//G BALL X
					ctx.beginPath(); ctx.arc(-dataStableX*multiX, 0,35,35, Math.PI, true); ctx.stroke();

					if (data[start][1] >= redlineY || data[start][1] < -redlineY) { ctx.fillStyle=("red"); }
					else {ctx.fillStyle=("black");}
					ctx.beginPath(); ctx.arc(0, dataStableY*multiY,30,30, Math.PI, true); ctx.fill();//G BALL Y
					ctx.beginPath(); ctx.arc(0, dataStableY*multiY,35,35, Math.PI, true); ctx.stroke();
					ctx.lineWidth = 1;

								ctx.strokeStyle = 'black';//CAR TOP VIEW
				var pointsX = [-100,100,-100,-35,35,100,-35,-25,35,25,-150,-100,150,100,-150,-150,150,150,-150,-130,
											150,130,-150,150,-130,-35,130,35,-35,35,-35,-35,35,35,-105,-105,105,105,-105,-60,
											105,60,-150,-105,-150,-105,-150,-105,150,105,150,105,150,105,-120,-120,-120,-120,120,120,
											120,120,-60,-60,-30,-30,0,0,30,30,60,60,-115,-60,-100,-50,-100,-100,-65,-65,
									  	-60,-50,115,60,100,50,100,100,65,65,60,50,-100,100,-85,85,-100,-85,100,85,
											-85,85,-100,100,-85,-100,85,100];
				var pointsY = [-200,-200,-200,-200,-200,-200,-200,-190,-200,-190,-100,-200,-100,-200,310,-100,310,-100,310,350,
											310,350,310,310,350,350,350,350,330,330,330,350,330,350,280,-77,280,-77,-77,-180,
											-77,-180,0,30,100,120,200,210,0,30,100,120,200,210,85,100,175,190,85,100,
											175,190,48,155,45,152,40,160,45,152,48,155,290,290,310,310,290,310,290,310,
											290,310,290,290,310,310,290,310,290,310,290,310,-40,-40,30,30,-40,30,-40,30,
											170,170,260,260,170,260,170,260];
				var wheels = [0,30,150,0,  0,-40,150,0,  -140,-50,33,33,  -140,-50,30,30,  140,-50,33,33,  140,-50,30,30, 
										-140,275,33,33,  -140,275,30,30,  140,275,33,33,  140,275,30,30,  
										-140,-50,32,32,  140,-50,32,32,  -140,275,32,32, 140,275,32,32];
					for (var i=0; i<pointsX.length; i=i+2){
						if(i>91 && i<=107) { ctx.lineWidth = 5; }
						if(i>71 && i<=91) { ctx.lineWidth = 2; }
						if(i>61 && i<=71) { ctx.lineWidth = 1; }
						if(i>53 && i<=61) { ctx.lineWidth = 4; }
						if(i<=53) { ctx.lineWidth = 4; }
						ctx.beginPath(); ctx.lineTo(pointsX[i], pointsY[i]); ctx.lineTo(pointsX[i+1], pointsY[i+1]); ctx.stroke(); ctx.closePath();						
					}
					for (var i=0; i<wheels.length; i=i+4) { 
						ctx.lineWidth = 3;
						if( i<=39) { ctx.beginPath(); ctx.arc(wheels[i], wheels[i+1],wheels[i+2],wheels[i+3], Math.PI, true); ctx.stroke(); ctx.closePath(); }
						if(i>39 && i<55) { ctx.beginPath(); ctx.arc(wheels[i],wheels[i+1],wheels[i+2],wheels[i+3],Math.PI, true); ctx.fillStyle = 'black'; ctx.fill(); ctx.closePath(); }
  				}//CAR TOP VIEW



			start += dropDataPoints;
			int += dropDataPoints;
			timer += 8;

		}, data[ii][31]*dropDataPoints);//MS
	}
}
/////////////////////////////////////////////////////////////////////////////
function movementXy1Point(data, start, stop, multiX, multiY, dropDataPoints, redlineX, redlineY, visualsStablilizerNumber) {
	var canvas = document.getElementById('canvas-gball');
	var ctx = canvas.getContext('2d');
	var int = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {
			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			ctx.scale(1,1);
			ctx.translate(canvas.width/2, canvas.height/2);

				ctx.lineWidth = 5;	
				ctx.beginPath(); ctx.lineTo(-325,0); ctx.lineTo(325,0); ctx.stroke(); ctx.closePath(); 
				ctx.beginPath(); ctx.lineTo(0,325); ctx.lineTo(0,-325); ctx.stroke(); ctx.closePath();

				if (dataStableX >= redlineX || dataStableX < -redlineX) { ctx.fillStyle=("red"); }
				if (dataStableY >= redlineY || dataStableY < -redlineY) { ctx.fillStyle=("red"); }
				else { ctx.fillStyle=("black") }
				ctx.beginPath(); ctx.arc(-dataStableX*multiX, dataStableY*multiY,30,30, Math.PI, true); ctx.fill(); ctx.closePath();
				ctx.beginPath(); ctx.arc(-dataStableX*multiX, dataStableY*multiY,35,35, Math.PI, true); ctx.stroke(); ctx.closePath();

				ctx.lineWidth = 20;	
				ctx.beginPath(); ctx.arc(0, 0, 325, 325, Math.PI, true); ctx.stroke();
	  			

				start += dropDataPoints;
				int += dropDataPoints;
			}, data[ii][31]*dropDataPoints);
	}
}
/////////////////////////////////////////////////////////////////////////////
function movementXy1PointForTesting(data, start, stop, multiX, multiY, dropDataPoints, redlineX, redlineY, visualsStablilizerNumber) {
	var canvas = document.getElementById('canvas-gball2');
	var ctx = canvas.getContext('2d');
	var int = 0;
	for (var x=start, ii=0; x<stop; x=x + dropDataPoints, ii=ii+1) {
		setTimeout(function () {
			var dataStableX = 0;
			var dataStableY = 0;
			var dataStableZ = 0;
			var incForStable = 0;
				while (incForStable < visualsStablilizerNumber) { 
					dataStableX = dataStableX + data[start+incForStable][0];
					dataStableY = dataStableY + data[start+incForStable][1];
					dataStableZ = dataStableZ + data[start+incForStable][2];
					incForStable++;
				} 
				dataStableX = dataStableX/visualsStablilizerNumber;
				dataStableY = dataStableY/visualsStablilizerNumber;
				dataStableZ = dataStableZ/visualsStablilizerNumber;

			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			ctx.scale(1,1);
			ctx.translate(canvas.width/2, canvas.height/2);

				ctx.lineWidth = 5;	
				ctx.beginPath(); ctx.lineTo(-325,0); ctx.lineTo(325,0); ctx.stroke(); ctx.closePath(); 
				ctx.beginPath(); ctx.lineTo(0,325); ctx.lineTo(0,-325); ctx.stroke(); ctx.closePath();

				if (dataStableX >= redlineX || dataStableX < -redlineX) { ctx.fillStyle=("red"); }
				if (dataStableY >= redlineY || dataStableY < -redlineY) { ctx.fillStyle=("red"); }
				else { ctx.fillStyle=("black") }
				ctx.beginPath(); ctx.arc(-dataStableX*multiX, dataStableY*multiY,30,30, Math.PI, true); ctx.fill(); ctx.closePath();
				ctx.beginPath(); ctx.arc(-dataStableX*multiX, dataStableY*multiY,35,35, Math.PI, true); ctx.stroke(); ctx.closePath();

				ctx.lineWidth = 20;	
				ctx.beginPath(); ctx.arc(0, 0, 325, 325, Math.PI, true); ctx.stroke();
	  			

				start += dropDataPoints;
				int += dropDataPoints;
			}, data[ii][31]*dropDataPoints);
	}
}