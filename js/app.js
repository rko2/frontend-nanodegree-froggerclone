// Enemies our player must avoid
var EnemyStartColumn = -56;

var Enemy = function(EnemyRow, EnemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = EnemySpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = EnemyStartColumn;
    this.y = EnemyRow;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = EnemyStartColumn;
        this.speed = this.speed * (Math.floor(Math.random() * 2)) + 101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var playerStartX = 200;
var playerStartY = 400;

// Our player, with a randomly selected player sprite.

var player = function() {
    var SpriteSelector = Math.floor(Math.random() * 5);
    if (SpriteSelector < 1) {
        this.sprite = 'images/char-boy.png';
    } else if (SpriteSelector < 2) {
        this.sprite = 'images/char-horn-girl.png';
    } else if (SpriteSelector < 3) {
        this.sprite = 'images/char-cat-girl.png';
    } else if (SpriteSelector < 4) {
        this.sprite = 'images/char-pink-girl.png';
    } else {
        this.sprite = 'images/char-princess-girl.png';
    }
    this.x = playerStartX;
    this.y = playerStartY;
};

var winTally = 0;
var deathTally = 0;

// Determine if win or lose when player jumps into the water based on collectibles, and then reset game.

player.prototype.update = function() {
    if (this.y < 60 && AllHearts === false) {
        this.y = playerStartY;
        this.x = playerStartX;
        deathTally += 1;
        window.alert("You drowned. " + "Wins: " + winTally + " Deaths: " + deathTally);
        allCollectibles = [];
        for (var i = 0; i < 3; i++) {
            allCollectibles.push(new Collectible(i * 83 + 60));
        }
    } else if (this.y < 60 && AllHearts === true) {
        this.y = playerStartY;
        this.x = playerStartX;
        winTally += 1;
        window.alert("You win! " + "Wins: " + winTally + " Deaths: " + deathTally);
        allCollectibles = [];
        for (var j = 0; j < 3; j++) {
            allCollectibles.push(new Collectible(j * 83 + 60));
        }
    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var HorizontalRightWall = 500;
var HorizontalLeftWall = -50;
var VerticalBottomWall = 483;

player.prototype.handleInput = function(keypress) {
    var HorizontalStep = 101;
    var VerticalStep = 83;

    if (keypress === 'left') {
        if (this.x - HorizontalStep > HorizontalLeftWall) {
            this.x -= HorizontalStep;
        } else {
            return null;
        }
    }
    if (keypress === 'right') {
        if (this.x + HorizontalStep < HorizontalRightWall) {
            this.x += HorizontalStep;
        } else {
            return null;
        }
    }
    if (keypress === 'up') {
        this.y -= VerticalStep;
    }
    if (keypress === 'down') {
        if (this.y + VerticalStep < VerticalBottomWall) {
            this.y += VerticalStep;
        } else {
            return null;
        }
    }
};
// Collectible hearts player must collect to win.
var Collectible = function(CollectibleY) {
    this.y = CollectibleY;
    this.sprite = 'images/Heart.png';
    var HeartLocation = Math.floor(Math.random() * 5);
    if (HeartLocation < 1) {
        this.x = 0;
    } else if (HeartLocation < 2) {
        this.x = 100;
    } else if (HeartLocation < 3) {
        this.x = 200;
    } else if (HeartLocation < 4) {
        this.x = 300;
    } else if (HeartLocation < 5) {
        this.x = 400;
    }
    var Collected;
};

Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var enemyspeed = Math.floor(Math.random() * 101) + 101;
    allEnemies.push(new Enemy(i * 83 + 60, enemyspeed));
}

var player = new player();
// Check to see if player has collided with enemies, and alert player if they were eaten by a bug.
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x > allEnemies[i].x - 50 && player.x < allEnemies[i].x + 50 && player.y < allEnemies[i].y + 50 && player.y > allEnemies[i].y - 50) {
            player.x = playerStartX;
            player.y = playerStartY;
            deathTally += 1;
            window.alert("Eaten by Bugs. " + "Wins: " + winTally + " Deaths: " + deathTally);
        }
    }
}

// Heart collectible array, in which heart objects will be created by loop.
var allCollectibles = [];

for (var i = 0; i < 3; i++) {
    allCollectibles.push(new Collectible(i * 83 + 60));
}

// Check to see if each individual heart has been collected, and move collected hearts.
var checkCollection = function() {
    for (var i = 0; i < allCollectibles.length; i++) {
        if (player.x > allCollectibles[i].x - 50 && player.x < allCollectibles[i].x + 50 && player.y < allCollectibles[i].y + 50 && player.y > allCollectibles[i].y - 50) {
            allCollectibles[i].x = 200;
            allCollectibles[i].y = 400;
        }
        if (allCollectibles[i].x == 200 && allCollectibles[i].y == 400) {
            allCollectibles[i].Collected = true;
        }
    }
};

// By default, all-heart collection is flagged as false.
var AllHearts = false;
// Check if all hearts are collected and flag AllHearts accordingly.
var HeartDetermine = function() {
    if (allCollectibles[0].Collected === true && allCollectibles[1].Collected === true && allCollectibles[2].Collected === true) {
        AllHearts = true;
    } else {
        AllHearts = false;
    }
};

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
