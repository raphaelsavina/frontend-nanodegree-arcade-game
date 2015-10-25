// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // the helper provided by Udacity to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomStart("x");
    this.y = getRandomStart("y");
    // TODO: Choose level with speed : 2 easy, 4 medium, 6 hard
    this.speed = 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // move enemy to the right
    this.x += this.speed * dt;
    // Once enemy out of screen, get a new random position
    if (this.x > 5) {
        this.x = getRandomStart("x");
        this.y = getRandomStart("y");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // convert matrix positioning to pixels
    // convert x to integer, correction for dt
    var posX = Math.round(this.x * 101);
    var posY = (this.y * 83) - 20;
    ctx.drawImage(Resources.get(this.sprite), posX, posY);
};

// create a player with image and initial matrix-based position
function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
};

Player.prototype.update = function(postion) {
    // If the player is on water (matrix.y = 0) : won
    if (this.y == 0) {
        alert("Congratulations, you won!");
        this.reposition();
    };
    // Check for collision
    this.collision();
};

Player.prototype.reposition = function() {
    // reposition player if won or lost to initial position
    this.x = 2;
    this.y = 5;
};

Player.prototype.render = function() {
    // convert matrix positioning to pixels
    var posX = this.x * 101;
    var posY = (this.y * 83) - 20;
    ctx.drawImage(Resources.get(this.sprite), posX, posY);
};

Player.prototype.collision = function() {
    // collision detection using the 5 x 4 matrix.
    // if player is in same square as one bug: Lost
    var allEnemiesLength = allEnemies.length;
    for (var e = 0; e < allEnemiesLength; e++) {
        if (Math.round(allEnemies[e].x) == this.x && allEnemies[e].y == this.y) {
            console.log("collision");
            alert("Sorry, you lost!");
            this.reposition();
        }
    };
};

// limit player movement to board matrix
Player.prototype.handleInput = function(key, dt) {
    if (key == "up" && this.y > 0) {
        this.y = this.y - 1;
    } else if (key == "down" && this.y < 5) {
        this.y = this.y + 1;
    } else if (key == "left" && this.x > 0) {
        this.x = this.x - 1;
    } else if (key == "right" && this.x < 4) {
        this.x = this.x + 1;
    }
};

// All 6 enemies objects in an array called allEnemies
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
// Passing axis to have just one function
function getRandomStart(axis) {
    if (axis == "x") {
        // X position 1 of 7 possible, start out of canvas (* -1)
        // TODO: detection on other enemies to avoid surimpression
        var position = (Math.floor(Math.random() * 7) + 1) * -1;
    } else {
        // Y position 1 of 3 possible
        var position = Math.floor(Math.random() * 3) + 1;
    }
    return position;
};
