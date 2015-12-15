GR

-Chems in M


if (-data[start][0] >= redlineX) {//HARD LEFT
					ctx.fillStyle=("red");
					fullReportDataStored.push(
						"- Hard left turn. (" +
						data[start][0] +
						" m/s^2 - Time-in-ms/DataPoint - " +
						data[start][31] + " sec / " + int);
					var hardLeft = document.createElement('div');
					hardLeft.innerHTML = fullReportDataStored[ii];
					document.getElementById("text-div-report-full").appendChild(hardLeft);		
				}


				////////////////////


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

				//one after the other reversed