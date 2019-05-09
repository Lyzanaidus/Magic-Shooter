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
		//console.log('[Class Ammo]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Ammo]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Ammo]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.targetXPos = targetXPos;
		this.targetYPos = targetYPos - (this.sheetWinHeight / 2);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Ammo]\n','width : ',this.width,'height : ',this.height);
		
		/*this.xDir = 0;
		this.yDir = 0;*/
		this.speed = 3;
		this.xMovement = (this.targetXPos - this.xPos);
		this.yMovement = (this.targetYPos - this.yPos);
		this.totalMovement = Math.abs(this.xMovement) + Math.abs(this.yMovement);
		this.dx = (this.xMovement / this.totalMovement) * this.speed;
		this.dy = (this.yMovement / this.totalMovement) * this.speed;
		this.angle = Math.atan(this.yMovement / this.xMovement);
		
		
		this.isFacingLeft = isFacingLeft;
		
		this.damage = 2;
		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;
		this.animationDelayCounter = 0;
		this.explode = false;
		this.explodeCount = 0;
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Ammo]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move() 
	{
		//console.log('[Class Ammo]\n','Function : move()');
		
		this.xPos = this.xPos + (this.dx * this.speed); 
		this.yPos = this.yPos + (this.dy * this.speed); 

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Ammo]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
		//debugger;
	}

	rotate(degrees)
	{
		//console.log('[Class Ammo]\n','Function : rotate(',degrees,')');
		ctx.save();
		//ctx.translate(player1.xPos,player1.yPos);
		ctx.rotate(degrees);
		this.display();
		dot();
		this.dot();
		//debugger
		ctx.restore();
	}
	dot() 
	{	
		ctx.fillStyle = 'pink';
		ctx.fillRect(this.xPos + (this.width),this.yPos + (this.height / 2),3,3);

	}


	nextSpriteCol()
	{
		//console.log('[Class Ammo]\n','Function : nextSpriteCol()');

		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 4);			//	Since we only need sprites (0,3) to (0,7)
		this.sheetCurrentCol = this.nextSpriteCounter;			//	Since we only need sprites (0,3) to (0,7)

		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	updateAnimation()
	{
		//console.log('[Class Ammo]\n','Function : updateAnimation()');

		if(this.animationDelayCounter === 0)
		{
			this.nextSpriteCol();	

			if (this.isFacingLeft) 
			{
				//console.log('[Class Ammo]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 2;			//	Row 0 Mirror (i.e. Right to Left)
				this.sheetCurrentCol = this.sheetCurrentCol + 4;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}
			else
			{
				//console.log('[Class Ammo]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 0;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
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
		//console.log('Function : start()');
		
		//clearCanvas();
		this.move();
		this.updateAnimation();
		//this.rotate(this.angle);
		this.display();
		
		//debugger
	}
}
