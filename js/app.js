// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomStart("x");
    this.y = getRandomStart("y");
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // TODO Level for speed : 100 easy, 150 medium, 300 hard
    var enemiesSpeed = 100;
    this.x = this.x + (enemiesSpeed * dt);

    // if out of screen, get a new random position
    if (this.x > 500) {
        this.x = getRandomStart("x");
        this.y = getRandomStart("y");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;
};

Player.prototype.update = function(direction) {
    // console.log("Player Update");
    if (this.y == -10) {
        var winnerText = "You made it!";
        //this.y = 405;
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "20px Impact";
        ctx.fillText(winnerText, 200, 20);
        console.log("winner");
    };
};


Player.prototype.render = function() {
    //console.log("Player Render");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.collision = function(direction) {
    //console.log("Player collision");
};

Player.prototype.handleInput = function(key) {
    //
    // possible positions on gameboard
    // x: 0, 101, 202, 303, 404
    // y: 405, 322, 239, 156, 73, -10
    //
    if (key == "up" && this.y > -10) {
        this.y = this.y - 83;
    } else if (key == "down" && this.y < 405) {
        this.y = this.y + 83;
    } else if (key == "left" && this.x > 0) {
        this.x = this.x - 101;
    } else if (key == "right" && this.x < 400) {
        this.x = this.x + 101;
    }

   // console.log("X:" + this.x + " Y:" + this.y)
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var enemy6 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
allEnemies.push;

// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Get random start position for enemies
function getRandomStart(axis) {
    // Y position 1 of 3 possible
    var startPositionY = [60, 143, 226];
    // X position 1 out 7 possible
    var startPositionX = [-700, -600, -500, -400, -300, -200, -100];
    if (axis == "x") {
        var randomValueX = Math.floor(Math.random() * 7);
        var position = startPositionX[randomValueX];
        //console.log(startPositionX);
    } else {
        var position = startPositionY[Math.floor(Math.random() * 3)];
        //console.log(position);
    }
    return position;
};
