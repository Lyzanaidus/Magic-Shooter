//	Boss Class
class Boss
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,hp,target)
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
		this.speed = 1;
		
		this.isFacingLeft = true;
		this.previousIsFacingLeft = true;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;

		this.target = target;
		this.targetXPos = this.target.xPos;
		this.targetYPos = this.target.yPos;

		this.ammoArr = [];
		this.damage = 1;

		this.animationDelayCounter = 0;
		this.fireDelayCounter = 0;
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;
	}

	move() 
	{	
		this.xPos = this.xPos + (this.speed * this.dx);
		this.yPos = this.yPos + (this.speed * this.dy);
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

	checkDir()
	{
		if (this.target.xPos + this.target.width / 2 < this.xPos)			//	this.width should be playe.width but it works
		{
			this.isFacingLeft = true;
		}
		else if (this.target.xPos > this.xPos + this.width / 2)
		{
			this.isFacingLeft = false;
		}
	}

	updateAnimation()
	{
		if(this.animationDelayCounter === 0)
		{
			this.nextSpriteCol();

			this.checkDir();
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

		this.animationDelayCounter = (this.animationDelayCounter + 1) % 3;  
	}

	updatePos()
	{
	
		if (true) 
		{
			this.xMovement = (this.target.xPos - this.xPos);
			this.yMovement = (this.target.yPos - this.yPos);
			this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
			this.dx = (this.xMovement / this.totalMovement) * this.speed;
			this.dy = (this.yMovement / this.totalMovement) * this.speed;	
		}
		else
		{
			this.dx = 0;
			this.dy = 0;
		}
	}

	fire(tXPos,tYPos) 
	{
		if(this.fireDelayCounter === 0)
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
		this.fireDelayCounter = (this.fireDelayCounter + 1) % 60;
		
		//console.log('ammoArr[',this.bulletNo,'] : ',this.ammoArr[this.bulletNo]);
	}

	start()
	{
		
		if (this.hp <= 0) 
		{
			this.dx = 0;
			this.dy = 0;
		}
		else
		{
			if (this.target.hp > 0) 
			{
				if((this.target.xPos != this.xPos) && (this.target.yPos != this.yPos))
				{
					this.updateAnimation();	
				}
				
				this.updatePos();
				this.move();
			}
			this.display();
			  
		}
	}

}

