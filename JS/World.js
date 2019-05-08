var si = true;

function isCollision(object1,object2) 
{
	this.object1 = object1;
	this.object2 = object2;
	if ((object1.yPos < object2.yPos + object2.height) && (object2.yPos < object1.yPos + object1.height))
	{
		if ((object1.xPos < object2.xPos + object2.width / 2) && (object2.xPos < object1.xPos + object1.width / 2))
		{
			return true;
		}	
	}
	else
	{
		return false;	
	}
}

function animate() 
{
	//console.log('Function : animate()');
		
	//clearCanvas();
	if (si) 
	{
		displayBg();
		player1.start();	
		grunt1.start();
		for (var i = 0; i < player1.ammoArr.length; i++) 
		{
			player1.ammoArr[i].start();
			if (isCollision(player1.ammoArr[i],grunt1)) 
			{
				console.log(isCollision(player1.ammoArr[i],grunt1));
				player1.ammoArr[i].xPos = player1.ammoArr[i].xPos - (player1.ammoArr[i].dx * player1.ammoArr[i].speed);
				grunt1.xPos = grunt1.xPos - (grunt1.dx * grunt1.speed);
			}
		}
		if (isCollision(player1,grunt1)) 
		{
			console.log(isCollision(player1,grunt1));
			player1.xPos = player1.xPos - (player1.dx * player1.speed);
			grunt1.xPos = grunt1.xPos - (grunt1.dx * grunt1.speed);
		}
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
