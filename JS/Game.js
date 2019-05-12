class game
{
	constructor()
	{

		this.si = true;
		this.maxGruntNo = 3;
		this.gruntArr = [];

	}

	isCollisionObj(object1,object2) 
	{
		this.object1 = object1;
		this.object2 = object2;
		//console.log('2y',this.object2.yPos);
		if ((this.object1.yPos < this.object2.yPos + this.object2.height) && (this.object2.yPos < this.object1.yPos + this.object1.height))
		{
			if ((this.object1.xPos < this.object2.xPos + this.object2.width / 2) && (this.object2.xPos < this.object1.xPos + this.object1.width / 2))
			{
				return true;
			}	
		}
		else
		{
			return false;	
		}
	}

	spawnPlayer1()
	{
		let initXPos = 500;
		let initYPos = 300;
		let img = new Image();
		img.src = "Images/John.png";
		img.width = 640;
		img.height = 480;
		let noOfRows = 6;
		let noOfCols = 8;
		let hp = 100;

		this.player1 = new Avatar(initXPos,initYPos,img.src,img.width,img.height,noOfRows,noOfCols,hp);
	}

	spawnGrunt(initXPos,initYPos) 
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

		this.gruntArr.push(new Grunt(gInitXPos,gInitYPos,gImg.src,gImg.width,gImg.height,gNoOfRows,gNoOfCols,gHp,this.player1));
	}

	spawnBoss() 
	{
		//console.log('Function : spawn()');
		let gImg = new Image();
		gImg.src = "Images/John.png";
		gImg.width = 640;
		gImg.height = 480;
		let gNoOfRows = 6;
		let gNoOfCols = 8;
		let gHp = 1000;

		this.Boss = (new Boss(this.wallVRight.xPos - (gImg.width / gNoOfCols) - 100,maxCanvasHeight / 2,gImg.src,gImg.width,gImg.height,gNoOfRows,gNoOfCols,gHp,this.player1));
	}

	spawnGrunts() 
	{
		for (let i = 0; i < this.maxGruntNo; i++) 
		{
			this.spawnGrunt(Math.random() * (maxCanvasWidth - 200) + 200,Math.random() * (maxCanvasHeight - 150) + 150);
		}
	}

	initGrunts()
	{

		for (let i = 0; i < this.gruntArr.length; i++) 
		{
			this.gruntArr[i].start();				
		}
	}

	initAmmo()
	{
		for (let i = 0; i < this.player1.ammoArr.length; i++) 
		{
			this.player1.ammoArr[i].start();
		}
		for (let i = 0; i < this.Boss.ammoArr.length; i++) 
		{
			this.Boss.ammoArr[i].start();
		}

	}

	collisionAmmoGrunt()
	{
		for (let i = 0; i < this.player1.ammoArr.length; i++) 		
		{
			for (let j = 0; j < this.gruntArr.length; j++) 
			{
				if (this.isCollisionObj(this.player1.ammoArr[i],this.gruntArr[j])) 
				{
					//console.log(isCollisionObj(player1.ammoArr[i],gruntArr[j]));
					this.gruntArr[j].xPos = this.gruntArr[j].xPos - (this.gruntArr[j].dx * this.gruntArr[j].speed);
					this.player1.ammoArr[i].xPos = this.player1.ammoArr[i].xPos - (this.player1.ammoArr[i].dx);

					if (!this.player1.ammoArr[i].explode) 
					{
						this.gruntArr[j].hp = this.gruntArr[j].hp - this.player1.ammoArr[i].damage;
					}

					this.player1.ammoArr[i].explode = true;
				}
			}
		}
			
	}

	collisionAmmoBoss()
	{
		for (let i = 0; i < this.player1.ammoArr.length; i++) 		
		{
			if (this.isCollisionObj(this.player1.ammoArr[i],this.Boss)) 
			{
				//console.log(isCollisionObj(player1.ammoArr[i],gruntArr[j]));
				this.Boss.xPos = this.Boss.xPos - (this.Boss.dx * this.Boss.speed);
				this.player1.ammoArr[i].xPos = this.player1.ammoArr[i].xPos - (this.player1.ammoArr[i].dx);

				if (!this.player1.ammoArr[i].explode) 
				{
					this.Boss.hp = this.Boss.hp - this.player1.ammoArr[i].damage;
				}

				this.player1.ammoArr[i].explode = true;
			}
		}
			
	}

	collisionAmmoPlayer()
	{
		for (let i = 0; i < this.Boss.ammoArr.length; i++) 		
		{
			if (this.isCollisionObj(this.Boss.ammoArr[i],this.player1)) 
			{
				//console.log(isCollisionObj(player1.ammoArr[i],gruntArr[j]));
				this.player1.xPos = this.player1.xPos - (this.player1.dx * this.player1.speed);
				this.Boss.ammoArr[i].xPos = this.Boss.ammoArr[i].xPos - (this.Boss.ammoArr[i].dx);

				if (!this.Boss.ammoArr[i].explode) 
				{
					this.player1.hp = this.player1.hp - this.Boss.ammoArr[i].damage;
				}

				this.Boss.ammoArr[i].explode = true;
			}
		}
			
	}

	collisionAmmoAmmo()
	{
		for (let i = 0; i < this.Boss.ammoArr.length; i++) 		
		{
			for (let j = 0; j < this.player1.ammoArr.length; j++) 		
			{
				if (this.isCollisionObj(this.Boss.ammoArr[i],this.player1.ammoArr[j])) 
				{
					//console.log(isCollisionObj(player1.ammoArr[i],gruntArr[j]));
					this.Boss.ammoArr[i].xPos = this.Boss.ammoArr[i].xPos - (this.Boss.ammoArr[i].dx);
					this.player1.ammoArr[j].xPos = this.player1.ammoArr[j].xPos - (this.player1.ammoArr[j].dx);

					this.Boss.ammoArr[i].explode = true;
					this.player1.ammoArr[j].explode = true;
				}
			}
		}			
	}

	collisionAmmoBorder()
	{
		for (let i = 0; i < this.player1.ammoArr.length; i++) 		
		{
			if (this.borderCollisionAmmo(this.player1.ammoArr[i])) 
			{
				this.player1.ammoArr[i].explode = true;
			}
			
		}
			
	}

	collisionPlayerBorder()
	{
		this.borderCollision(this.player1);
	}
	
	collisionBossBorder()
	{
		this.borderCollision(this.Boss);
	}

	collisionGruntBorder()
	{
		for (var i = 0; i < this.gruntArr.length; i++) 
		{
			this.borderCollision(this.gruntArr[i]);
		}
		
	}
	
	borderCollisionAmmo(object)
	{
		this.object = object;

		if (this.object.xPos <= this.wallVLeft.xPos + this.wallVLeft.width + this.object.width) 
		{
			this.object.xPos =  (this.wallVLeft.xPos + this.wallVLeft.width  + this.object.width);

			return true;
		}
		
		else if (this.object.xPos >= this.wallVRight.xPos - this.object.width) 
		{
			this.object.xPos =  (this.wallVRight.xPos - this.object.width);

			return true;
		}

		if (this.object.yPos <= this.wallHTop.yPos + this.object.height) 
		{
			this.object.yPos =  (this.wallHTop.yPos + this.object.height);

			return true;
		}

		else if (this.object.yPos >= this.wallHBottom.yPos - this.object.height) 
		{
			this.object.yPos =  (this.wallHBottom.yPos - this.object.height);

			return true;
		}	
	}

	borderCollision(object)
	{
		this.object = object;

		if (this.object.xPos <= this.wallVLeft.xPos + this.wallVLeft.width) 
		{
			//console.log('left');
			this.object.xPos =  (this.wallVLeft.xPos + this.wallVLeft.width);

			return true;
		}
		
		else if (this.object.xPos >= this.wallVRight.xPos - this.object.width) 
		{
			//console.log('right');
			this.object.xPos =  (this.wallVRight.xPos - this.object.width);

			return true;
		}

		if (this.object.yPos <= this.wallHTop.yPos) 
		{
			//console.log('up');
			this.object.yPos =  (this.wallHTop.yPos);

			return true;
		}

		else if (this.object.yPos >= this.wallHBottom.yPos - this.object.height) 
		{
			//console.log('down');
			
			this.object.yPos =  (this.wallHBottom.yPos - this.object.height);

			return true;
		}	
	}


	collisionGruntGrunt()
	{
		for (let i = 0; i < this.gruntArr.length; i++) 		
		{
			for (let j = i; j < this.gruntArr.length; j++) 
			{
				if (i != j) 
				{
					if (this.isCollisionObj(this.gruntArr[i],this.gruntArr[j])) 
					{
						//console.log(isCollisionObj(gruntArr[i],gruntArr[j]));
						this.gruntArr[i].xPos = this.gruntArr[i].xPos - (this.gruntArr[i].dx * this.gruntArr[i].speed);
						this.gruntArr[i].yPos = this.gruntArr[i].yPos - (this.gruntArr[i].dy * this.gruntArr[i].speed);
					}
				}
			}
		}	
	}

	collisionPlayer1Grunt()
	{
		for (let i = 0; i < this.gruntArr.length; i++) 
			{
				if (this.isCollisionObj(this.player1,this.gruntArr[i])) 
				{
					this.player1.xPos = this.player1.xPos - ((this.player1.dx * this.player1.speed) + (this.player1.dx * 2));
					this.player1.hp = this.player1.hp - this.gruntArr[i].damage;
					this.gruntArr[i].xPos = this.gruntArr[i].xPos - (this.gruntArr[i].dx * this.gruntArr[i].speed);
				}
			}
	}

	collisionPlayer1Boss()
	{
		if (this.isCollisionObj(this.player1,this.Boss)) 
		{
			this.player1.xPos = this.player1.xPos - ((this.player1.dx * this.player1.speed) + (this.player1.dx * 2));
			this.player1.hp = this.player1.hp - this.Boss.damage;
			this.Boss.xPos = this.Boss.xPos - (this.Boss.dx * this.Boss.speed);
		}
	
	}

	displayBg() 		
	{
		ctx.beginPath();
		ctx.fillStyle = '#926653';	
		ctx.fillRect(0,0,maxCanvasWidth,maxCanvasHeight);
		ctx.closePath();

		this.skyImg = new Image();
		this.skyImg.src = "Images/sky.png";
		this.sky = new Img(this.skyImg.src,0,0);

		ctx.save();
		var playerImg = new Img("Images/john_s.png",25,10);
		var hp = this.player1.hp;
		var mp = hp;

		if (hp < 30) 
		{
			var hpBar = new statusBar(80,15,hp,100,150,15,'red','#314c70');
		}
		else if (hp < 60) 
		{
			var hpBar = new statusBar(80,15,hp,100,150,15,'orange','#314c70');
		}
		else 
		{
			var hpBar = new statusBar(80,15,hp,100,150,15,'green','#314c70');
		}
		
		var mpBar = new statusBar(80,35,mp,100,150,15,'blue','#314c70');

		hpBar.display(); 	
		mpBar.display();

		ctx.restore();

		let wallHTop = new Image();
		wallHTop.src = "Images/wallH.png"
		this.wallHTop = new Img(wallHTop.src,0,100);
		
		let wallHBottom = new Image();
		wallHBottom.src = "Images/wallH.png"
		this.wallHBottom = new Img(wallHBottom.src,0,maxCanvasHeight - wallHBottom.height / 2);
		
		let wallVLeft = new Image();
		wallVLeft.src = "Images/wallV.png"
		this.wallVLeft = new Img(wallVLeft.src,-(2/3) * wallVLeft.width,((5/7) * this.sky.height) + wallHTop.height - 5);
		
		let wallVRight = new Image();
		wallVRight.src = "Images/wallV.png"
		this.wallVRight = new Img(wallVRight.src,maxCanvasWidth - wallVRight.width + (2/3) * wallVRight.width,((5/7) * this.sky.height) + wallHTop.height - 5);
	}

	gameLoop() 
	{
		//console.log('Function : gameLoop()');
			
		//clearCanvas();
			this.displayBg();
			
			this.initAmmo();
			this.player1.start();
	
			this.initGrunts();
			this.Boss.start();

			if (this.Boss.hp > 10 && this.player1.hp) 
			{
				this.Boss.fire(this.player1.xPos,this.player1.yPos + this.player1.height / 2);
			}

			this.collisionAmmoAmmo();
			this.collisionAmmoGrunt();
			this.collisionAmmoBoss();
			this.collisionAmmoPlayer();
			this.collisionAmmoBorder();
			this.collisionPlayerBorder();
			this.collisionGruntBorder();
			this.collisionBossBorder();
			this.collisionGruntGrunt();
			this.collisionPlayer1Grunt();
			this.collisionPlayer1Boss();
		
	}

	noOfGrunts()
	{
		for (var i = 0; i < this.gruntArr.length; i++) 
		{
			this.gruntCount = 0;
			if(this.gruntArr[i].hp > 0)
			{
				this.gruntCount ++ ;
			}
			return this.gruntCount;
		}
	}

	start() 
	{

		setInterval(() => {this.gameLoop();
							//console.log('asd',this);
						},1000 / 60);
		let can = document.getElementById('canvas-1')
		/*can.onclick = function (event) 
									{
										si = !si;
									}	*/
	}

}

var level1 = new game;

level1.spawnPlayer1();
level1.displayBg();
level1.spawnGrunts();
level1.spawnBoss();
level1.start();
