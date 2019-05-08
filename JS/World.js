var si = true;
function animate() 
{
	//console.log('Function : animate()');
		
	//clearCanvas();
	if (si) 
	{
		displayBg();
		player1.display();	
		for (var i = 0; i < player1.ammoArr.length; i++) 
		{
			player1.ammoArr[i].start();
		}
		grunt1.start();
	}
}

function start() 
{
	//initPlayer1();
	setInterval(animate,1000 / 60);
	var can = document.getElementById('canvas-1')
	/*can.onclick = function (event) 
								{
									si = !si;
								}	*/
}

start();
