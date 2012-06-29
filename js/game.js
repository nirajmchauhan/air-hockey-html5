/* Global variables */

var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");

var canvas_width = canvasElement.width;
var canvas_height =canvasElement.height;
var botX = 2;
var botY = 2;
var mx = 2;
var my = 4;
var points = 0;

var init = {};
var FPS = {};

FPS.set = 30;

function level(){

	FPS.set = $('#level').val();

}

function start(){
	
	$('#canvas').focus();
	
	init.interval = setInterval(function(){
		update();
		draw();
	}, 1000/FPS.set);
	$('#start').attr('disabled', 'disabled');
	$('#level').attr('disabled', 'disabled');
	

}


var player = {
	color: "#000",
	x: 220,
	y: 310,
	width: 50,
	height: 10,
	draw: function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	}
};

var player2 = {
	color: "#000",
	x: 220,
	y: 0,
	width: 50,
	height: 10,
	draw: function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	}
};

var ball = {
	x : 2,
	y : 2,
	r : 5,
	draw: function() {
		canvas.beginPath();
		canvas.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		canvas.fill();
		}

};

function collides(a, b) {
	if(a.y == b.y || a.y <= b.height){
		if(a.x >= b.x && a.x <= b.x+b.width){
			return true;
		}else{
			return false;
		}
	}
	
}

function update() {
	if (keydown.left) {
		player.x -= 5;
		player2.x -= 5;
	}

	if (keydown.right) {
		player.x += 5;
		player2.x += 5;
	}
	
	player.x = player.x.clamp(0, canvas_width - player.width);
	
	player2.x = player.x.clamp(0, canvas_width - player.width);
	
}


function gameOver(){
	canvas.fillStyle    = '#000';
	canvas.font         = '18px verdana';
	canvas.textBaseline = 'top';
	canvas.fillText('You scored : ' + points, 50, 100);
	canvas.fillText('Game Over, refresh the page to restart game', 50, 150);
	
	clearInterval(init.interval);
	
	$('#level').removeAttr('disabled');
}


function draw() {
	canvas.clearRect(0, 0, canvas_width, canvas_height);
	player.draw();
	player2.draw();
	ball.draw();
	
	
	if (collides(ball, player)) {
		
		my = -my;
		points = points + 1;
		
	}else if (collides(ball, player2)) {
		
		my = +my;
		points = points + 1;
		
	}else
	{
		if (ball.x + mx > canvas_width || ball.x + mx < 0){
			mx = -mx;
		}
		if (ball.y + my > canvas_height || ball.y + my < 0){
			my = -my;
			gameOver();
		}
		
		
	}
	$('#points').html(points);
	ball.x += mx;
	ball.y += my;
	
}