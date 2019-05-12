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
		//console.log('[Class Avatar]\n','sheetWidth : ',this.sheetWidth,'sheetHeight : ',this.sheetHeight);
		
		this.sheetWinXPos = 0;
		this.sheetWinYPos = 0;
		//console.log('[Class Avatar]\n','sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
		
		this.sheetWinWidth = (this.sheetWidth / this.noOfCols);
		this.sheetWinHeight = (this.sheetHeight / this.noOfRows);
		//console.log('[Class Avatar]\n','sheetWinWidth : ',this.sheetWinWidth,'sheetWinHeight : ',this.sheetWinHeight);
		
		this.width = this.sheetWidth / this.noOfCols;
		this.height = this.sheetHeight / this.noOfRows;
		//console.log('[Class Avatar]\n','width : ',this.width,'height : ',this.height);
		
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
									//console.log('[Class Avatar]\n','Avatar Input');
									
									//console.log('event.keyCode : ',event.keyCode);
									
									if (event.keyCode === this.upKey) 
									{
										//console.log('up pressed.');
										this.dy = -1;
									}
									else if (event.keyCode === this.downKey) 
									{
										//console.log('down pressed.');
										this.dy = 1;	
									}
									
									if (event.keyCode === this.leftKey) 
									{
										//console.log('left pressed.');
										this.dx = -1;
										this.isFacingLeft = true;
									}
									else if (event.keyCode === this.rightKey) 
									{
										//console.log('right pressed.');
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
									//console.log('[Class Avatar]\n','Clear Avatar Input');
									
									//console.log('event.keyCode : ',event.keyCode);
									if (event.keyCode === this.upKey) 
									{
										//console.log('up cleared.');
										this.dy = 0;
									}
									if (event.keyCode === this.downKey) 
									{
										//console.log('down cleared.');
										this.dy = 0;
									}
									if (event.keyCode === this.leftKey) 
									{
										//console.log('left cleared.');
										this.dx = 0;
									}
									if (event.keyCode === this.rightKey) 
									{
										//console.log('right cleared.');
										this.dx = 0;
									}	
									this.move(this.dx,this.dy);

								}
								);

		var AvatarObject = this;
		var can = document.getElementById('canvas-1')
		
		if (this.hp > 0) 
		{
			can.onclick = function (event) 
			{
				
				//console.log('clicked at ',event.clientX,event.clientY);
				AvatarObject.targetXPos = event.clientX;
				AvatarObject.targetYPos = event.clientY;
				AvatarObject.fire(AvatarObject.targetXPos,AvatarObject.targetYPos);	
			}
		}
	}

	animate(sheetCurrentRow,sheetCurrentCol) 
	{
		//console.log('[Class Avatar]\n','Function : animate()');
		
		this.sheetWinXPos = sheetCurrentCol * this.sheetWinWidth;
		this.sheetWinYPos = sheetCurrentRow * this.sheetWinHeight;

		//console.log('sheetWinXPos : ',this.sheetWinXPos,'sheetWinYPos : ',this.sheetWinYPos);
	}

	move(dx,dy) 
	{
		//console.log('[Class Avatar]\n','Function : move()');
		
		this.xPos = this.xPos + (this.speed * dx);
		this.yPos = this.yPos + (this.speed * dy);

		//console.log('XPos : ',this.xPos,'YPos : ',this.yPos);
	}

	display() 
	{
		//console.log('[Class Avatar]\n','Function : display()');

		ctx.drawImage(this.sheet,this.sheetWinXPos,this.sheetWinYPos,this.sheetWinWidth,this.sheetWinHeight,this.xPos,this.yPos,this.width,this.height);
		/*
		//console.log('sheet : ',this.sheet,'\nsheetWinXPos : ',this.sheetWinXPos,'\nsheetWinYPos : ',this.sheetWinYPos
					,'\nsheetWinWidth : ',this.sheetWinWidth,'\nsheetWinHeight : ',this.sheetWinHeight
					,'\nXPos : ',this.xPos,'\nYPos : ',this.yPos,'\nwidth : ',this.width,'\nheight : ',this.height);
		*/
	}

	nextSpriteCol()
	{
		//console.log('[Class Avatar]\n','Function : nextSpriteCol()');

		this.nextSpriteCounter = (this.nextSpriteCounter + 1) % (this.noOfCols - 3);
		this.sheetCurrentCol = this.nextSpriteCounter + 3;			//	Since we only need sprites (0,3) to (0,7)

		//console.log('nextSpriteCounter : ',this.nextSpriteCounter);
		//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
	}

	isDirChange()			//	return XOR of (this.previousIsFacingLeft,this.isFacingLeft)
	{
		//console.log('[Class Avatar]\n','Function : isDirChange()');

		return ((this.previousIsFacingLeft || this.isFacingLeft) && (!(this.previousIsFacingLeft && this.isFacingLeft)))
	}

	updateAnimation()
	{
		//console.log('[Class Avatar]\n','Function : updateAnimation()');

		this.nextSpriteCol();

		if (this.isDirChange()) 
		{
			//console.log('[Class Avatar]\n','DirChange : ',this.isDirChange());
			this.sheetCurrentCol = 0;
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}

		if (this.isFacingLeft) 
		{
			//console.log('[Class Avatar]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 3;			//	Row 0 Mirror (i.e. Right to Left)
			this.sheetCurrentCol = this.noOfCols - 1 - this.sheetCurrentCol;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
			//console.log('sheetCurrentCol : ',this.sheetCurrentCol);
		}
		else
		{
			//console.log('[Class Avatar]\n','FacingLeft : ',this.isFacingLeft);
			this.sheetCurrentRow = 0;
			//console.log('sheetCurrentRow : ',this.sheetCurrentRow);
		}

		this.previousIsFacingLeft = this.isFacingLeft;

		this.animate(this.sheetCurrentRow,this.sheetCurrentCol); 
	}

	fire(tXPos,tYPos) 
	{
		//console.log('Function : fire()');
		
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
				console.log(targetXPos,this.xPos + this.width,this.xPos,this.width)
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
		//console.log('ammoArr[',this.bulletNo,'] : ',this.ammoArr[this.bulletNo]);
	}

	start()
	{
		this.display();
		if (this.hp <= 0) 
		{
			this.xPos = 2000;
			this.yPos = 300;
			this.sheetCurrentRow = -1;
			this.dx = 0;
			this.dy = 0;
			this.hp = 0;
		}
	}

}

