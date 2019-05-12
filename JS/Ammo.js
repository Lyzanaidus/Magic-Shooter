//	Ammo Class
class Ammo
{
	constructor(xPos,yPos,imgSrc,imgWidth,imgHeight,rows,cols,targetXPos,targetYPos,isFacingLeft)
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
		
		this.targetXPos = targetXPos;
		this.targetYPos = targetYPos - (this.sheetWinHeight / 2);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		
		this.speed = 3;
		this.xMovement = (this.targetXPos - this.xPos);
		this.yMovement = (this.targetYPos - this.yPos);
		this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
		this.dx = (this.xMovement / this.totalMovement) * this.speed;
		this.dy = (this.yMovement / this.totalMovement) * this.speed;
		this.angle = Math.atan(this.yMovement / this.xMovement);
		
		
		this.isFacingLeft = isFacingLeft;
		
		this.damage = 30;
		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;
		this.animationDelayCounter = 0;
		this.explode = false;
		this.explodeCount = 0;

		this.dotXArr = [];
		this.dotYArr = [];
		this.asd = 0;

	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;
	}

	move() 
	{
		
		this.xPos = this.xPos + (this.dx * this.speed); 
		this.yPos = this.yPos + (this.dy * this.speed); 

	}

	display(x=this.xPos, y=this.yPos) 
	{
		this.dotXArr.push(x);
		this.dotYArr.push(y);
		if (this.isFacingLeft) 
		{
			ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,-(this.width),0,this.width,this.height)	
		}
		else 
		{
			ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,(this.width/2),0,this.width,this.height)	
		}
	}

	rotate(degrees)
	{
		ctx.save();
		ctx.translate(this.xPos,this.yPos)
		ctx.rotate(degrees);
		this.display();
		ctx.restore();
	}

	nextSpriteCol()
	{
		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 4);			//	Since we only need sprites (0,3) to (0,7)
		this.sheetCurrentCol = this.nextSpriteCounter;			
	}

	updateAnimation()
	{
		if(this.animationDelayCounter === 0)
		{
			this.nextSpriteCol();	

			if (this.isFacingLeft) 
			{
				this.sheetCurrentRow = 2;			//	Row 0 Mirror (i.e. Right to Left)
				this.sheetCurrentCol = this.sheetCurrentCol + 4;
			}
			else
			{
				this.sheetCurrentRow = 0;
			}

			if(this.explode)
			{
				if (this.explodeCount < 4) 
				{
					this.dx = 0;
					this.dy = 0;
					this.xPos = this.xPos + (this.dx / 2);	
					this.sheetCurrentRow = (this.sheetCurrentRow + 3) % 4;
					this.sheetCurrentCol = (this.noOfCols - this.nextSpriteCounter);
				}
				else
				{
					this.xPos = -500;
					this.yPos = -500;
					this.sheetCurrentRow = -1;
					this.dx = 0;
					this.dy = 0;
				}

				this.explodeCount++;
			}		

			this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
		}

		this.animationDelayCounter = (this.animationDelayCounter + 1) % 4; 
		
	}

	

	start()
	{
		
		this.rotate(this.angle);
		this.move();
		this.updateAnimation();
	}
}
