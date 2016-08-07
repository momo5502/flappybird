/*
 *	Initialization and definition of variables
 */

// Get and resize the canvas element */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 512;

// Array used to store sounds used in-game */
var sounds = new Array();

// Multidimensional array to store different bird animations */
var birds = new Array();

/* Array to store tubes and their position */
var tubes = new Array();

/* Array to store different backgrounds */
var background = new Array();

/* Array to store medal images */
var medals = new Array();

/* Array to store different images to display scores in multiple scales */
var numbers = new Array();
numbers[0] = new Array();
numbers[1] = new Array();

/* Imagedefinitions */
var logo;
var hint;
var terrain;
var tubeTop;
var tubeBottom;
var gameOver;
var scoreBox;

/* Defines Y position of elements */
var gameOver_Y = canvas.height;
var scoreBox_Y = canvas.height;

/* Defines what background to use */
var current_bg = Math.RandomInteger( 2 );

/* Defines what bird-colour to use */
var current_bird = Math.RandomInteger( 3 );

/* Score counter */
var tubesPassed = 0;

/* Modular animation counter */
var currentBirdAnim = 0;

/* Float offset during startscreen */
var birdFloat = 0;

/* Indicates whether the game has started or not */
var started = false;

/* Stops terrain movement */
var paused = false;

/* Allow skipping game over menu */
var endpause = false;

/* Checking variable to prevent holding down the space key */
var lastWasPressed = false;

/* Hide score in game over menu */
var hideScore = false;

/* Velocity */
var upperVelocity = 0;

/* Current amount of spawned 'tubes', 'pipes' or whatever */
var tubeNum = 0;

/* Amount of pixels for terrain shifting */
var terrainShift = 0;

/* pause() function */
var pause;

/* Current reached medal */
var medal = 0;

/* Timestamps */
var floatUpdated = 0;
var birdUpdated = 0;
var terrainMoved = 0;
var birdFell = 0;
var velocityLast = 0;
var lastRotate = 0;
var slowdown = 0;
var tubeInterval = 0;
var pauseTime = 0;
var bird_zero = 0;
var birdZeroOnce = false;