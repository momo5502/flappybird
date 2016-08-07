/*
 *	Assets used in-game
 */

/* Load sounds */
sounds[0] = new Audio("sound/sfx_point.mp3");
sounds[1] = new Audio("sound/sfx_die.mp3");
sounds[2] = new Audio("sound/sfx_hit.mp3");
sounds[3] = new Audio("sound/sfx_swooshing.mp3");
sounds[4] = new Audio("sound/sfx_wing.mp3");
 
/* Load score numbers into defined array */
for(i = 0;i<10;i++)
{
	numbers[0][i] = Sprite("images/numbers/big/" + i + ".png");
	numbers[1][i] = Sprite("images/numbers/medium/" + i + ".png");
}

/* Load background images */
background[0] = Sprite("images/background_0.png");
background[1] = Sprite("images/background_1.png");

/* Load other images */
logo = Sprite("images/logo.png");
hint = Sprite("images/hint.png");
terrain = Sprite("images/terrain.png");
tubeTop = Sprite("images/tube_top.png");
tubeBottom = Sprite("images/tube_bottom.png");
gameOver = Sprite("images/gameover.png");
scoreBox = Sprite("images/scoreBox.png");

/* Load bird animations */
for(i = 0;i<3;i++)
{
	birds[i] = new Array();
	for(j = 0;j<4;j++)
	{
		
		birds[i][j] = Sprite("images/bird/" + i + "/bird_" + ( (j == 3) ? 1 : j ) + ".png");
	}
}

/* Load medals */
for(i = 0;i<4;i++)
{
	medals[i] = Sprite("images/medals/" + i + ".png");
}

/* Create and return images from specified source */
function Sprite( imgSrc)
{
	image = new Image();
	image.src = imgSrc;
	return image;
}