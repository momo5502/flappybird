/* Create physics thread */
thread(physics);

/* Create menu handler thread */
//thread(menu); // Temporarily placed in physics to save resources

/* Create main thread */
thread(main);

/* Update current highscore */
setHighscore( getHighscore() );

/* Hide Ad container if AdBlocker is enabled */
if(adblock) document.getElementById("ads").style.display = "none";
else (adsbygoogle = window.adsbygoogle || []).push({});

/* Remove ads on button click */
$("#slideright").click( function(){ $("#ads").fadeOut(); } );