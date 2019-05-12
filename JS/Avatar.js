//	Avatar Class
class Avatar
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,hp)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.noOfRows = rows;
		this.noOfCols = cols;

		this.sheet = new Image();
		this.sheet.src = imgSrc;
		this.sheetWidth = imgWidth;
		this.sheetHeight = imgHeight;
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		
		this.dx = 0;
		this.dy = 0;
		this.speed = 3;
		
		this.isFacingLeft = false;
		this.previousIsFacingLeft = false;
		
		this.leftKey = 37;
		this.rightKey = 39;
		this.upKey = 38;
		this.downKey = 40;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;
		this.ammoArr = [];
		
		document.addEventListener(
								'keydown',
								event =>
								{
									if (event.keyCode === this.upKey) 
									{
										this.dy = -1;
									}
									else if (event.keyCode === this.downKey) 
									{
										this.dy = 1;	
									}
									
									if (event.keyCode === this.leftKey) 
									{
										this.dx = -1;
										this.isFacingLeft = true;
									}
									else if (event.keyCode === this.rightKey) 
									{
										this.dx = 1;
										this.isFacingLeft = false;
									}

									this.updateAnimation();
									this.move(this.dx,this.dy);
								}

								
								);

		document.addEventListener(
								'keyup',
								event =>
								{
									if (event.keyCode === this.upKey) 
									{
										this.dy = 0;
									}
									if (event.keyCode === this.downKey) 
									{
										this.dy = 0;
									}
									if (event.keyCode === this.leftKey) 
									{
										this.dx = 0;
									}
									if (event.keyCode === this.rightKey) 
									{
										this.dx = 0;
									}	
									this.move(this.dx,this.dy);

								}
								);

		var AvatarObject = this;
		var can = document.getElementById('canvas-1')
		
		
			can.onclick = function (event) 
			{
				
				if (AvatarObject.hp > 1) 
				{
					AvatarObject.targetXPos = event.clientX;
					AvatarObject.targetYPos = event.clientY;
					AvatarObject.fire(AvatarObject.targetXPos,AvatarObject.targetYPos);	
				}
			}
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;
	}

	move(dx,dy) 
	{		
		this.xPos = this.xPos + (this.speed * dx);
		this.yPos = this.yPos + (this.speed * dy);
	}

	display() 
	{
		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
	}

	nextSpriteCol()
	{
		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 3);
		this.sheetCurrentCol = this.nextSpriteCounter + 3;			//	Since we only need sprites (0,3) to (0,7)
	}

	isDirChange()			//	return XOR of (this.previousIsFacingLeft,this.isFacingLeft)
	{
		return ((this.previousIsFacingLeft || this.isFacingLeft) && (!(this.previousIsFacingLeft && this.isFacingLeft)))
	}

	updateAnimation()
	{
		this.nextSpriteCol();

		if (this.isDirChange()) 
		{
			this.sheetCurrentCol = 0;
		}

		if (this.isFacingLeft) 
		{
			this.sheetCurrentRow = 3;			//	Row 0 Mirror (i.e. Right to Left)
			this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
		}
		else
		{
			this.sheetCurrentRow = 0;
		}

		this.previousIsFacingLeft = this.isFacingLeft;

		this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
	}

	fire(tXPos,tYPos) 
	{
		var img = new Image();
		img.src = "Images/Ammo.png";
		img.width = 655;
		img.height = 330;
		var noOfRows = 4;
		var noOfCols = 8;
		var targetXPos = tXPos;
		var targetYPos = tYPos;
	
		if (!this.isFacingLeft) 
		{
			if (targetXPos >= this.xPos + this.width) 
			{
				this.bulletNo++;
				this.ammoArr.push(new Ammo(this.xPos,this.yPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos,this.isFacingLeft));
			}
		}
		else 
		{
			if (targetXPos < this.xPos) 
			{
				this.bulletNo++;
				this.ammoArr.push(new Ammo(this.xPos,this.yPos,img.src,img.width,img.height,noOfRows,noOfCols,targetXPos,targetYPos,this.isFacingLeft));
			}
		}
	}

	start()
	{
		
		if (this.hp <= 0) 
		{
			this.sheetCurrentRow = -1;
			this.dx = 0;
			this.dy = 0;
			this.hp = 0;
		}
		else
		{
			this.display();	
		}

	}

}

