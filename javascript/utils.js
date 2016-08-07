/*
 *	Utilities used for various stuff.
 */

/* Recursive callback function with rendering delay */
var requestAnimFrame = (function()
{
	return	window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
})();

/* Returns random integer form 0 (included) to the specified number (excluded) */
Math.RandomInteger = function(n) {
    var i = Math.random();
    var num = Math.floor(i * n + 1);
	num %= n;
    return num;
};

/* Start asynchronous precession */
function thread( callback )
{
	setTimeout(callback, 1);
}

/* Dynamically load JavaScript files */
function loadScript( script )
{
	var _head    = document.getElementsByTagName('head').item(0);
	var _script  = document.createElement("script");
	
	_script.type = "text/javascript";
	_script.src  = script;

	_head.appendChild( _script );
}

/* Draw rotated images on canvas */
function drawRotatedImage(context, image, x, y, angle)
{ 
	context.save(); 
	context.translate(x, y);
	context.rotate(angle * Math.PI/180);
	context.drawImage(image, -(image.width/2), -(image.height/2));
	context.restore(); 
}

/* Set specified cookie */
function setCookie(name, value, days)
{
	var expires;
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
    }
    else
	{
        expires = "";
    }
	
    document.cookie = name + "=" + value + expires;
}

/* Get specified cookie */
function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=");
		
        if (c_start != -1)
		{
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
			
            if (c_end == -1)
			{
                c_end = document.cookie.length;
            }
			
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/* Check if sound is valid */
function isValidSound( sound )
{
	return (sound != null && sound != undefined && sound.duration != 0);
}