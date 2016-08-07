/*
 *	Main game handling
 */

// Game objects
var bird = {
	speed: 150, 	// movement in pixels per second
	angle: 0,		// current angle
	rotateMod: 1,	// scale used to modify downwards rotation
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener('touchstart', function(e){
	keysDown[32] = true;
}, false);

addEventListener("touchend", function (e) {
	delete keysDown[32];
}, false);

var reset = function () 
{
	if(paused)
	{
		try
		{
			sounds[3].pause();
			sounds[3].currentTime = 0;
			sounds[3].play();
		}catch(error){} // TODO: Add error handling
	}	
	
	started = false;
	paused = false;
	birdZeroOnce = false;
	endpause = false;
	hideScore = false;
	tubesPassed = 0;
	bird_zero = 0;
	slowdown = 0;
	upperVelocity = 0;
	tubeNum = 0;
	flotModifier = 1;
	birdFloat = 0;
	bird.angle = 0;
	bird.x = parseInt( canvas.width / 4 );
	bird.y = canvas.height / 2;
};

// Update game objects
var update = function () {
	if (32 in keysDown)
	{	
		if(!lastWasPressed)
		{
			lastWasPressed = true;
			
			//if(!started)
			//{
			//	tubesPassed = 0;
			//}
			
			if(paused)
			{
				if(endpause)
					reset();
			}
			else
			{
				started = true;
				upperVelocity += 10; // Actually 10, but rechyyy wanted it like that :P
			
				if (sounds[4].duration > 0 && !sounds[4].paused)
				{
					sounds[4].pause();
					sounds[4].currentTime = 0;
				}
			
				sounds[4].play();
			}
		}
	}
	else
	{
		lastWasPressed = false;
	}
	
	
	if( bird.y < -30 )
		bird.y = -30;
	
	bird.y = parseInt( bird.y );
};

// The main game loop
var main = function ()
{
	var now = Date.now();
	var delta = now - then;
	var animDelta = now - birdUpdated;
	var floatDelta = now - floatUpdated;
	var terrainDelta = now - terrainMoved;
	var fallDelta = now - birdFell;
	var veloDiff = now - velocityLast;
	var rotateDelta = now - lastRotate;
	
	if( animDelta / 100 >= 1 && !paused)
	{
		currentBirdAnim++;
		birdUpdated = now;
	}
	
	if( terrainDelta / 9 >= 1 && !paused)
	{
		if( started && tubeInterval == 0)
		{
			addTube();
		}
		tubeInterval++;
		terrainShift+=2;
		shiftTubes();
		terrainMoved = now;
	}
	
	tubeInterval %= 90;
	terrainShift %= 14;
	currentBirdAnim %= 4;
	
	if( paused )
	{
	
	}
	else if( started )
	{
		birdFloat = 0;
	}
	else if( floatDelta / 35 >= 1)
	{
		updateBirdFloat();
		floatUpdated = now;
	}
	
	if(upperVelocity > 0 && !paused)
	{
		if( veloDiff > 10) // TODO: use veloDiff quotient with single-frame time as constant decrement scale
		{
			upperVelocity--;
			
			if( upperVelocity < 0 )
				upperVelocity = 0;
				
			velocityLast = now;
		}
		bird.y -= bird.speed * (1000 / (60 * 400)) * (upperVelocity / 5 );
	}
	else if(started)
	{
		bird.y += bird.speed * (delta / 1000);
		
		birdFloat = 0;
		
		if(bird.y >= canvas.height - 112 - 8)
		{
			bird.y = canvas.height - 112 - 8;
			
			if(!birdZeroOnce)
			{
				birdZeroOnce = true;
				bird_zero = now;
			}
		}
	}
	
	update();
	
	if(!paused)
		checkCollision();	
		
	render();

	then = now;
	
	requestAnimFrame(main);
};

var flotModifier = 1;

function updateBirdFloat()
{
	var maxFloat = 8;
	
	birdFloat += flotModifier;
	
	if( birdFloat >= maxFloat || birdFloat <= 0)
		flotModifier *= -1;
}

function addTube()
{
	tubes[tubeNum] = new Tube();
	tubes[tubeNum].y -= Math.RandomInteger( 225 );
	
	tubeNum++;
}

function shiftTubes()
{
	var toShift = 0;
	for(i = 0;i<tubeNum;i++)
	{
		tubes[i].x-=2;
		
		if( bird.x > tubes[i].x + 26 && !tubes[i].rewarded && started)
		{
			tubes[i].rewarded = true;
			tubesPassed++;
			setHighscore( tubesPassed );
			sounds[0].play();
		}
	
		if( tubes[i].x < -52 )
			toShift++;
	}
	
	if(toShift > 0)
	{
		for(i = toShift;i<tubeNum;i++)
		{
			tubes[i - toShift] = tubes[i];
		}
		
		tubeNum -= toShift;
	}
}

function Tube()
{
	this.rewarded = false;
	this.x = canvas.width;
	this.y = -70;
}

function setHighscore(score)
{
	if(	score < getHighscore() )
		return;
		
	//document.getElementById("score").innerHTML = "Highscore: " + score;
	setCookie("flappy_score", score + "", 30);
}

function getHighscore()
{
	var score = getCookie("flappy_score");
	
	if( score == "" )
		return 0;
	else
		return parseInt(score); // Probably need to check for score being an integer
}

pause = function()
{
	pauseTime = Date.now();		
	paused = true;
};

reset();
var then = Date.now();
