//	Grunt Class
class Grunt
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
		//console.log('[Class Grunt]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Grunt]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Grunt]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Grunt]\n','width : ',this.width,'height : ',this.height);
		
		this.dx = 0;
		this.dy = 0;
		this.speed = 1;
		
		this.isFacingLeft = true;
		this.previousIsFacingLeft = true;

		this.hp = hp;

		this.sheetCurrentRow = 0;
		this.sheetCurrentCol = 0;
		this.nextSpriteCounter = 0;

		this.targetXPos = 100;
		this.targetYPos = 100;

		this.animationDelayCounter = 0
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Grunt]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move() 
	{
		//console.log('[Class Grunt]\n','Function : move()');
		
		this.xPos = this.xPos + (this.speed * this.dx);
		this.yPos = this.yPos + (this.speed * this.dy);

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Grunt]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
	}

	nextSpriteCol()
	{
		//console.log('[Class Grunt]\n','Function : nextSpriteCol()');

		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 3);
		this.sheetCurrentCol = this.nextSpriteCounter + 3;			//	Since we only need sprites (0,3) to (0,7)

		//console.log('nextSpriteCounter : ',this.nextSpriteCounter);
		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	isDirChange()			//	return XOR of (this.previousIsFacingLeft,this.isFacingLeft)
	{
		//console.log('[Class Grunt]\n','Function : isDirChange()');

		return ((this.previousIsFacingLeft || this.isFacingLeft) && (!(this.previousIsFacingLeft && this.isFacingLeft)))
	}

	checkDir()
	{
		//console.log('[Class Grunt]\n','Function : isDirChange()');

		if (player1.xPos + player1.width / 2 < this.xPos)			//	this.width should be playe.width but it works
		{
			this.isFacingLeft = true;
		}
		else if (player1.xPos > this.xPos + this.width / 2)
		{
			this.isFacingLeft = false;
		}
	}

	updateAnimation()
	{
		//console.log('[Class Grunt]\n','Function : updateAnimation()');
		if(this.animationDelayCounter === 0)
		{
			this.nextSpriteCol();

			this.checkDir();
			if (this.isDirChange()) 
			{
				//console.log('[Class Grunt]\n','DirChange : ',this.isDirChange());
				this.sheetCurrentCol = 0;
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}

			if (this.isFacingLeft) 
			{
				//console.log('[Class Grunt]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 3;			//	Row 0 Mirror (i.e. Right to Left)
				this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
				//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
			}
			else
			{
				//console.log('[Class Grunt]\n','FacingLeft : ',this.isFacingLeft);
				this.sheetCurrentRow = 0;
				//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			}

			this.previousIsFacingLeft = this.isFacingLeft;

			this.animate(this.sheetCurrentRow,this.sheetCurrentCol);
		}

		this.animationDelayCounter = (this.animationDelayCounter + 1) % 3;  
	}

	updatePos()
	{
		//console.log('[Class Grunt]\n','Function : updatePos()');

		if (true) 
		{
			this.xMovement = (player1.xPos - this.xPos);
			this.yMovement = (player1.yPos - this.yPos);
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

	inArea()
	{
		if (((this.targetXPos >= this.xPos) && (this.targetXPos <= this.xPos + this.width)) && ((this.targetYPos >= this.yPos) && (this.targetYPos <= this.yPos + this.height))) 
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	start()
	{
		if((player1.xPos != this.xPos) && (player1.yPos != this.yPos))
		{
			this.updateAnimation();	
		}
		this.updatePos();
		this.move();
		this.display();
		if (this.hp <= 0) 
		{
			this.xPos = -500;
			this.yPos = -500;
			this.sheetCurrentRow = -1;
			this.dx = 0;
			this.dy = 0;
		}
		
		/*//console.log('Area X : ',this.xPos,this.xPos + this.width);
		//console.log('targetXPos : ',this.targetXPos);
		//console.log('Area Y : ',this.yPos,this.yPos + this.height);
		//console.log('targetYPos : ',this.targetYPos);
		//console.log('inArea : ',this.inArea())*/
	}

}

let gInitXPos = 500;
let gInitYPos = 300;
let gImg = new Image();
gImg.src = "Images/Grunt.png";
gImg.width = 640;
gImg.height = 480;
let gNoOfRows = 6;
let gNoOfCols = 8;
let gHp = 100;

var grunt1 = new Grunt(gInitXPos,gInitYPos,gImg.src,gImg.width,gImg.height,gNoOfRows,gNoOfCols,gHp);