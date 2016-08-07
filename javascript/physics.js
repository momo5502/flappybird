/*
 *	Basic physics engine
 */ 
 
/* Looped thread object */
var physics = function()
{
	setInterval(handleRotation, 40);
	setInterval(handleGravity, 10);
};

/* Rotation handler */
function handleRotation()
{		
	var rotationUp = -25;
	var rotationDown = 90;
	
	var rotationScale = 150 / 40; // timeTillEnd / interval
	
	if( started )
	{
		if( bird.speed > 200 )
		{
			if( bird.angle < rotationDown )
			{
				//var diff = rotationDown - bird.angle;
				bird.angle += bird.rotateMod;
				if(bird.angle > rotationDown)
					bird.angle = rotationDown;
					
				bird.rotateMod += 3;
			}
			else
				bird.angle = rotationDown;
		}
		else
		{
			if( bird.angle > rotationUp )
			{
				var diff = rotationUp - bird.angle;
				
				if( diff < 0 )
					diff *= -1;
				
				bird.angle -= diff / rotationScale;
				bird.rotateMod = 0;
			}
			else
				bird.angle = rotationUp;
		}
		
		bird.angle = parseInt(bird.angle);
		bird.angle %= 360;
	}
}

/* Gravity handler */
function handleGravity()
{		
	var defaultSpeed = 150;
	
	if( upperVelocity == 0 || paused )
	{
		var timeDiff = Date.now() - velocityLast;
		if(timeDiff <= 600)
			bird.speed = timeDiff;
		else
			bird.speed = 600;
	}
	else
	{
		bird.rotateMod = 1;
		bird.speed = defaultSpeed;
	}
	
	menu(); // Placed here to save resources
}

/* Collision handler */
function checkCollision()
{		
	var totalCollision = false;
	isColliding = (bird.y >= canvas.height - 112 - 8);
	
	for(i=0;i<tubeNum;i++)
	{
		// Top tube
		var collidesTop = (bird.y - 16 <= tubes[i].y + 320 && bird.x + 18 >= tubes[i].x && bird.x <= tubes[i].x + 51);
		
		// Bottom tube
		var collidesBottom = (bird.y + 16 >= tubes[i].y + 320 + 120 && bird.x + 24 >= tubes[i].x && bird.x <= tubes[i].x + 51);
		
		// Total collision
		totalCollision = totalCollision || collidesTop || collidesBottom;
	}
	
	if( totalCollision && !isColliding )
	{
		sounds[1].play();
	}
	
	totalCollision = totalCollision || isColliding;
	
	if(totalCollision)
	{
		sounds[2].play();
		pause();
	}
}