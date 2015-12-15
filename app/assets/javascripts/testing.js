$(document).ready(function() {

	//DURING PAGE LOAD
		$('reportcontent').hide();
		$('carmodeltop').hide();
		$('carmodelback').hide();
		$('wheelmodel').hide();
		$('#run-program-button').hide();
		$('instructionscontent').hide();
		$('#instructions-button').hide();
		$('#instructions-button').css('background-color', 'red');

	setTimeout(function() {
		$('#instructions-button').fadeIn(300);
	}, 1000);
	setTimeout(function() {
		$('#instructions-button').fadeOut(1000);
	}, 2000);
	setTimeout(function() {
		$('#instructions-button').fadeIn(300);
	}, 3000);
	setTimeout(function() {
		$('#instructions-button').fadeOut(1000);
	}, 4000);
	setTimeout(function() {
		$('#instructions-button').fadeIn(300);
	}, 5000);
	setTimeout(function() {
		$('#instructions-button').fadeOut(1000);
	}, 6000);
	setTimeout(function() {
		$('#instructions-button').css('background-color', 'black');
		$('#instructions-button').fadeIn(2000);
	}, 7000);

	$('html').css('display', 'none');
	$('html').fadeIn(2000);
	$('.hide-then-show').hide('.hide-then-show');
	
	//POST PAGE LOAD
	// $('#some-test-button').on('click', function() {
	// 	reduce the amount of function called by loops OKAY
	// });
	$('#show-all-data-button').on('click', function() {
		$('.button-panel-right').css('text-align', 'right');
		$('.home').toggle('hide');
		$('.hide-this').toggle('hide');
		$('.hide-then-show').show('.hide-then-show');
		
		$('#report-button').hide();
		$('#report-button').css('background-color', 'red');
		setTimeout(function() {
			$('#report-button').fadeIn(300);
		}, 1000);
		setTimeout(function() {
			$('#report-button').fadeOut(1000);
		}, 2000);
		setTimeout(function() {
			$('#report-button').fadeIn(300);
		}, 3000);
		setTimeout(function() {
			$('#report-button').fadeOut(1000);
		}, 4000);
		setTimeout(function() {
			$('#report-button').fadeIn(300);
		}, 5000);
		setTimeout(function() {
			$('#report-button').fadeOut(1000);
		}, 6000);
		setTimeout(function() {
			$('#report-button').css('background-color', 'black');
			$('#report-button').fadeIn(2000);
		}, 7000);
	
		$('video').toggle('show');
		setTimeout(function() { 
			$('video').get(0).play()
		}, 0);
		carMovementInWords(dataDownFlagstaff1, 0, 18000, 5, 2, 3, 11, 10);
		// 0,1,2,6,7,8,9,11
		liveDataPrintOut(dataDownFlagstaff1, 0, 18000, 5, 1);
		// 0,1,2,6,12
		warningMessages(dataDownFlagstaff1, 0, 18000, 5, 2, 3, 11);
		// 0,1,2,6,7,8,9
		carMovementAndPositionVisuals(dataDownFlagstaff1, 0, 18000, 60, 60, 2, 5, 2, 3, 11, 15);
		// 0,1,2,3,4,5,6,7,8,9,10
		carModelFromBack(dataDownFlagstaff1, 0, 18000, 60, 60, 2, 5, 2, 3, 11, 20);
		// 0,1,2,3,4,5,6,7,8,9,10
		steeringWheelModel(dataDownFlagstaff1, 0, 18000, 60, 60, 2, 5, 15);
		// 0,1,2,3,4,5,6,10
		orientation(dataDownFlagstaff1, 0, 18000, 5);
		// 0,1,2,6
		reportContentAccelerometerVisuals(dataDownFlagstaff1, 0, 18000, 60, 60, 2, 5, 2, 3, 11, 10);
		// 0,1,2,3,4,5,6,7,8,9,10
		movementXy1Point(dataDownFlagstaff1, 0, 18000, 60, 60, 1, 5, 3, 25);
		//0,1,2,3,4,6,7,8,10
	});
	$('form').on('submit', function(e) {
		e.preventDefault();
		var parameterData = [dataDownFlagstaff1, 0, 18000, 60, 60, 2, 5, 2, 3, 11, 1, 1, 1];//
		var fileContents = [];
		$('#run-program-button').show();
		$('#parameter-input-submit-button').css("background-color", "gray");

		var startInput=parseInt(document.getElementById('testing-input-start-point').value);
		var endInput=parseInt(document.getElementById('testing-input-end-point').value);
		var multiX=parseInt(document.getElementById('testing-input-multix').value);
		var multiY=parseInt(document.getElementById('testing-input-multiy').value);
		var multiZ=parseInt(document.getElementById('testing-input-multiz').value);
		var dataPoints=parseInt(document.getElementById('testing-input-data-points').value);
		var redlineX=parseInt(document.getElementById('testing-input-redline-x').value);
		var redlineY=parseInt(document.getElementById('testing-input-redline-y').value);
		var redlineZ=parseInt(document.getElementById('testing-input-redline-z').value);
		var dataStabilizerVisuals=parseInt(document.getElementById('testing-input-data-stabilizer').value);
		var dataStabilizerWords=parseInt(document.getElementById('testing-input-words-stabilizer').value);
		var dataStabilizerData=parseInt(document.getElementById('testing-input-data-stabilizer-data').value);
		fileContents.push(document.getElementById('testing-input-file-contents').value);
		if (startInput !== parameterData[1] && startInput > 0) { parameterData[1] = startInput; }
		if (endInput !== parameterData[2] && endInput > 0) { parameterData[2] = endInput; }
		if (multiX !== parameterData[3] && multiX > 0) { parameterData[3] = multiX; }
		if (multiY !== parameterData[4] && multiY > 0) { parameterData[4] = multiY; }
		if (multiZ !== parameterData[5] && multiZ > 0) { parameterData[5] = multiZ; }
		if (dataPoints !== parameterData[6] && dataPoints > 0) { parameterData[6] = dataPoints; }
		if (redlineX !== parameterData[7] && redlineX > 0) { parameterData[7] = redlineX; }
		if (redlineY !== parameterData[8] && redlineY > 0) { parameterData[8] = redlineY; }
		if (redlineZ !== parameterData[9] && redlineZ > 0) { parameterData[9] = redlineZ; }
		if (dataStabilizerVisuals !== parameterData[10] && dataStabilizerVisuals > 0) { parameterData[10] = dataStabilizerVisuals; }
		if (dataStabilizerWords !== parameterData[11] && dataStabilizerWords > 0) { parameterData[11] = dataStabilizerWords; }
		if (dataStabilizerData !== parameterData[12] && dataStabilizerData > 0) { parameterData[12] = dataStabilizerData; }

		document.getElementById("set-parameters-window").innerHTML = "Profile Loaded";
		document.getElementById("parameter-input-submit-button").innerHTML = "Run Program";
		console.log(parameterData);
		console.log(fileContents);
		sessionStorage.setItem("UserChoices", parameterData);
		console.log(sessionStorage);
		console.log(localStorage);

		$('#run-program-button').on('click', function() {
			$('#report-button').css('background-color', 'red');
			$('#testing-area').css("background-color", "red");
			$('#report-button').hide();
			$('#report-button').css('background-color', 'red');
				setTimeout(function() {
					$('#report-button').fadeIn(300);	
				}, 1000);
				setTimeout(function() {
					$('#report-button').fadeOut(1000);
				}, 2000);
				setTimeout(function() {
					$('#report-button').fadeIn(300);
				}, 3000);
				setTimeout(function() {
					$('#report-button').fadeOut(1000);
				}, 4000);
				setTimeout(function() {
					$('#report-button').fadeIn(300);
				}, 5000);
				setTimeout(function() {
					$('#report-button').fadeOut(1000);
				}, 6000);
				setTimeout(function() {
					$('#report-button').css('background-color', 'black');
					$('#report-button').fadeIn(2000);
				}, 7000);

			steeringWheelModel(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[3], 
				parameterData[4], parameterData[5], 
				parameterData[6], parameterData[10]); 
			carModelFromBack(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[3], 
				parameterData[4], parameterData[5], 
				parameterData[6], parameterData[7], 
				parameterData[8], parameterData[9],
				parameterData[10]);
			orientation(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[6]);				
			warningMessages(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[6],  
				parameterData[7], parameterData[8], 
				parameterData[9]);	
			carMovementAndPositionVisuals(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[3], 
				parameterData[4], parameterData[5], 
				parameterData[6], parameterData[7], 
				parameterData[8], parameterData[9],
				parameterData[10]);
			liveDataPrintOut(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[6],
				parameterData[12]);				
			carMovementInWords(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[6],  
				parameterData[7], parameterData[8], 
				parameterData[9], parameterData[11]);	
			reportContentAccelerometerVisuals(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[3], 
				parameterData[4], parameterData[5], 
				parameterData[6], parameterData[7], 
				parameterData[8], parameterData[9],
				parameterData[10]);
			movementXy1Point(parameterData[0], parameterData[1], 
				parameterData[2], parameterData[3], 
				parameterData[4], parameterData[6], 
				parameterData[7], parameterData[8],
				parameterData[10]);

			$('.hide-this').toggle('hide');
			$('.hide-then-show').show('.hide-then-show');
			$('video').toggle('show');
			setTimeout(function() { 
				$('video').get(0).play()
			}, 0);
		});
	});
	$('#report-button').on('click', function() {
		$('datacontent').toggle('hide');
		$('reportcontent').toggle('show');
		// forceXyzForReport(dataDownFlagstaff1, 0, 10000, 200, 200, 200, 1, 1);
	});
	
	$('#freeze-button').on('click', function() {
		alert("DATA FREEZE, IT'S COLD IN HERE");
		$('video').each(this.pause());
	});
	$('#reset-button').on('click', function() {
		location.reload();
	});
	$('#testing-area').on('click', function() {
		$('#testing-area').css("background-color", "red");
	});
	$('#test-functions').on('click', function() {
		graphicsFunctionOne(data5MileDown, 101, 15000, 5000, 1);
	});

	$('#data-page').on('click', function() {
		$('datacontent').toggle('show');
		$('reportcontent').toggle('hide');
	});
	$('#data-page2').on('click', function() {
		$('datacontent').toggle('show');
		$('instructionscontent').toggle('hide');
	});
	$('#parameter-input-fields').css('text-align', 'right');
	$('#instructions-button').on('click', function() {
		$('datacontent').toggle('hide');
		$('instructionscontent').toggle('show');
	});
	$('body').on('click', function() {
		$('#instructions-button').css('background-color', 'black');	
	});


});