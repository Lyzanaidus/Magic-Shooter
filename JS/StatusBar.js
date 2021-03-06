class Img
{
	constructor(imgSrc,imgXPos,imgYPos)
	{
		this.img = new Image();
		this.img.src = imgSrc;
		this.xPos = imgXPos;
		this.yPos = imgYPos;
		this.width = this.img.width;
		this.height = this.img.height;
		this.display();
	}

	display()
	{
		ctx.drawImage(this.img,this.xPos,this.yPos);
	}

}

class statusBar
{

	constructor(xPos,yPos,points,maxPoints,pointsBarWidth,pointsBarHeight,colour,inactiveColour)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.points = points;
		this.maxPoints = maxPoints;
		this.pointsBarWidth = pointsBarWidth;
		this.pointsBarHeight = pointsBarHeight;
		this.colour = colour;
		this.inactiveColour = inactiveColour;		
	}

	display()
	{
		ctx.beginPath();
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 5;
		ctx.fillStyle = this.inactiveColour;	
		ctx.fillRect(this.xPos,this.yPos,this.pointsBarWidth,this.pointsBarHeight);
		ctx.closePath();

		ctx.beginPath();
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 5;
		ctx.fillStyle = this.colour;	
		ctx.fillRect(this.xPos,this.yPos,this.points * (this.pointsBarWidth / this.maxPoints),this.pointsBarHeight);
		ctx.closePath();
	}
}
