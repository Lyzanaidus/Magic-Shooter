// Initialize canvas and cONtExT variables
var canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

//  Set canvas properties
canvas.style.border = '1px solid black';

const minCanvasWidth = 0;
const minCanvasHeight = 0;
const maxCanvasWidth = window.innerWidth;
const maxCanvasHeight = window.innerHeight;

canvas.width = maxCanvasWidth - 6;
canvas.height = maxCanvasHeight - 6;

//	Canvas related functions
function dot() 
{
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,3,3);

}
//	Function to display Bg
function displayBg() 
{
	var bg = new Image();
	bg.src = "Images/background.jpg";
	ctx.drawImage(bg,minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}

//	Function to clear entire canvas
function clearCanvas() 
{
	ctx.clearRect(minCanvasWidth,minCanvasHeight,maxCanvasWidth,maxCanvasHeight);
}