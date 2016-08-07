/*
 *	Menu handling stuff
 */
 
var menu = function()
{
	handleGameOverPopup();
	//setInterval( handleGameOverPopup, 10 );
};

function handleGameOverPopup()
{
	if(!paused || bird_zero == 0)
	{
		// Hide elements
		gameOver_Y = -(gameOver.width);
		scoreBox_Y = -(scoreBox.width);
		
		if( tubesPassed >= 40 )
		{
			medal = 3;
		}
		else if( tubesPassed >= 30 )
		{
			medal = 2;
		}
		else if( tubesPassed >= 20 )
		{
			medal = 1;
		}
		else if( tubesPassed >= 10 )
		{
			medal = 0;
		}
	}
	else
	{
		// Game over label
		var diff = Date.now() - bird_zero;
		var defY = parseInt(canvas.height / 2 - 130);
		if( diff <= 400 && diff >= 385 )
		{
			if( !hideScore )
				hideScore = true;
				
			gameOver_Y = defY;
			
			if(isValidSound(sounds[3]))
			{
				try
				{
					sounds[3].pause();
					sounds[3].currentTime = 0;
					sounds[3].play();
				}catch(error){} // TODO: Add error handling
			}
		}
		else if( diff >= 600 )
		{
			gameOver_Y = defY;
		}
		else if( diff <= 500 && diff > 400)
		{
			var scale = diff - 400;
			scale /= 20;
			gameOver_Y = defY - scale;
		}
		else if( diff > 500 )
		{
			var scale = diff - 500;
			scale /= 20;
			gameOver_Y = defY + scale - 5;
		}
		
		// Score box
		
		var finY = parseInt(canvas.height / 2) - 50;
		if(diff >= 1100 && diff < 1500)
		{
			if( diff < 1115 && isValidSound(sounds[3]))
			{
				try
				{
					sounds[3].pause();
					sounds[3].currentTime = 0;
					sounds[3].play();
				}catch(error){} // TODO: Add error handling
			}
			
			scoreBox_Y = finY / ((diff - 1100) / 400);
		}
		else if( diff >= 1500)
		{
			scoreBox_Y = finY;
		}
		
		// Medals
		if( diff >= 1650 && !endpause )
		{
			endpause = true;
		}
		
		scoreBox_Y = parseInt(scoreBox_Y);
		gameOver_Y = parseInt(gameOver_Y);
	}
}