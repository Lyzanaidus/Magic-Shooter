var si = true;

var maxGruntNo = 10;
var gruntArr = [];

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

function spawn(initXPos,initYPos) 
{
	//console.log('Function : spawn()');
	let gInitXPos = initXPos;
	let gInitYPos = initYPos;
	let gImg = new Image();
	gImg.src = "Images/Grunt.png";
	gImg.width = 640;
	gImg.height = 480;
	let gNoOfRows = 6;
	let gNoOfCols = 8;
	let gHp = 100;

	this.gruntArr.push(new Grunt(gInitXPos,gInitYPos,gImg.src,gImg.width,gImg.height,gNoOfRows,gNoOfCols,gHp));
}

function initGrunts() 
{
	for (var i = 0; i < maxGruntNo; i++) 
	{
		spawn((Math.random() * 1000),(Math.random() * 600) + 100);
	}
}

function animate() 
{
	//console.log('Function : animate()');
		
	//clearCanvas();
	if (si) 
	{
		displayBg();
		console.log('PLayer1 HP : ',player1.hp);		
		for (var i = 0; i < player1.ammoArr.length; i++) 
		{
			player1.ammoArr[i].start();
		}
		player1.start();
		
		for (let i = 0; i < player1.ammoArr.length; i++) 		
		{
			for (let j = 0; j < gruntArr.length; j++) 
			{
				if (isCollision(player1.ammoArr[i],gruntArr[j])) 
				{
					//console.log(isCollision(player1.ammoArr[i],gruntArr[j]));
					gruntArr[j].xPos = gruntArr[j].xPos - (gruntArr[j].dx * gruntArr[j].speed);
					player1.ammoArr[i].xPos = player1.ammoArr[i].xPos - (player1.ammoArr[i].dx);

					if (!player1.ammoArr[i].explode) 
					{
						gruntArr[j].hp = gruntArr[j].hp - player1.ammoArr[i].damage;
					}

					player1.ammoArr[i].explode = true;
				}
			}
		}
		for (let i = 0; i < gruntArr.length; i++) 		
		{
			for (let j = i; j < gruntArr.length; j++) 
			{
				if (i != j) 
				{
					if (isCollision(gruntArr[i],gruntArr[j])) 
					{
						//console.log(isCollision(gruntArr[i],gruntArr[j]));
						gruntArr[i].xPos = gruntArr[i].xPos - (gruntArr[i].dx * gruntArr[i].speed);
						gruntArr[i].yPos = gruntArr[i].yPos - (gruntArr[i].dy * gruntArr[i].speed);
					}
				}
			}
		}
		for (let i = 0; i < gruntArr.length; i++) 
		{
			if (isCollision(player1,gruntArr[i])) 
			{
				//console.log(isCollision(player1,gruntArr[i]));
				player1.xPos = player1.xPos - (player1.dx * player1.speed);
				player1.hp = player1.hp - gruntArr[i].damage;
				gruntArr[i].xPos = gruntArr[i].xPos - (gruntArr[i].dx * gruntArr[i].speed);
			}
		}
		
			
		for (var i = 0; i < gruntArr.length; i++) 
		{
			gruntArr[i].start();				
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

initGrunts();
start();
