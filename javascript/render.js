/*
 *	Render game content
 */
 
var render = function () 
{
	for(i = 0;i< ( canvas.width / 276 );i++)
	{
		ctx.drawImage(background[current_bg], 276*i, 0);
	}

	for(i = 0;i < tubeNum; i++)
	{
		ctx.drawImage(tubeTop, tubes[i].x, tubes[i].y);
	
		ctx.drawImage(tubeBottom, tubes[i].x, tubes[i].y + 320 + 120);
	}
	
	drawRotatedImage(ctx, birds[current_bird][currentBirdAnim], bird.x, bird.y + ( birdFloat - 4), bird.angle);

	for(i = 0;i< ( canvas.width / 308 )+1;i++)
	{
		ctx.drawImage(terrain, 308*i - terrainShift, canvas.height - 112);
	}
	
	if(!started)
	{
		ctx.drawImage(logo, parseInt(canvas.width / 2 - 96), parseInt(canvas.height / 2 - 130)/* + ( birdFloat - 4)*/); // Probably add bounce on logo
		ctx.drawImage(hint, parseInt(canvas.width / 2 - 75), parseInt(canvas.height / 2 - 44));
	}
	
	var numScale = 0;

	//if( tubesPassed >= 1000)
	//	numScale = 1;

	var numString = tubesPassed + "";
	
	if( !hideScore )
	{
		var widthArr = new Array();
		var imgArr = new Array();
		var total_width = 0;
		
		for( i = 0;i<numString.length;i++)
		{
			var c_num = parseInt(numString[i]);
			imgArr[i] = numbers[numScale][c_num];
			
			if( i > 0 )
				widthArr[i] = widthArr[i-1] + imgArr[i-1].width;
			else
				widthArr[i] = 0;
			
			total_width += imgArr[i].width;
		}
		
		for( i = 0;i<imgArr.length;i++)
		{
			ctx.drawImage(imgArr[i], parseInt(canvas.width / 2 - total_width / 2) + widthArr[i], 32);
		}
	}
	
	ctx.drawImage(gameOver, parseInt(canvas.width / 2 - gameOver.width / 2), gameOver_Y);
	ctx.drawImage(scoreBox, parseInt(canvas.width / 2 - scoreBox.width / 2), scoreBox_Y);
	
	if(tubesPassed >= 10)
		ctx.drawImage(medals[medal], parseInt(canvas.width / 2 - scoreBox.width / 2) + 32, scoreBox_Y + 43);
		
	// Draw scoreboard numbers
	numScale = 1;
	var width = 0;
	for( i = numString.length-1;i>=0;i--)
	{
		var c_num = parseInt(numString[i]);
		image = numbers[numScale][c_num];
		width += image.width;
		ctx.drawImage(image, parseInt(canvas.width / 2 - scoreBox.width / 2) + 210 - width, scoreBox_Y + 36);
	}
	
	// Draw highscore
	numString = getHighscore() + "";
	width = 0;
	
	for( i = numString.length-1;i>=0;i--)
	{
		var c_num = parseInt(numString[i]);
		image = numbers[numScale][c_num];
		width += image.width;
		ctx.drawImage(image, parseInt(canvas.width / 2 - scoreBox.width / 2) + 210 - width, scoreBox_Y + 76);
	}
};