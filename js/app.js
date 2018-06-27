//import * as Setup from './setup.js';
//import * as Answers from 'js/answers.js';

// Base class for the Player and Enemy subclasses
class Sprite {

	// Draw the sprite on the screen, required method for game
	render() {
		const colSize = 101;
		const rowSize = 83;
		ctx.drawImage(Resources.get(this.sprite), this.x * colSize, this.y * rowSize -
			60);
	}
};

class Enemy extends Sprite {
	constructor(imgFile = 'images/enemy-bug.png', speed = 1, x = -1, y = 2) {
		super();
		this.sprite = imgFile;
		this.speed = speed;
		this.x = x;
		this.y = y;
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		this.x = this.x + (this.speed * dt);
		if (this.x > 5) { // After going off the right side of the board,
			this.x = -1; // Move the enemy back to the left side of the board
			this.speed = Math.floor(Math.random() * 4) + 1;
		}

	}
}

class Player extends Sprite {
	constructor(imgFile = 'images/char-princess-girl.png', lives = 5, x = 2, y = 5) {
		super();
		this.sprite = imgFile;
		this.lives = lives;
		this.x = x;
		this.y = y;
	}

	handleInput(direction) {
		switch (direction) {
			case 'left':
				if (this.x > 0) {
					this.x -= 1;
				}
				break;
			case 'right':
				if (this.x < 4) {
					this.x += 1;
				}
				break;
			case 'up':
				if (this.y > 0) {
					this.y -= 1;
				}
				break;
			case 'down':
				if (this.y < 6) {
					this.y += 1;
				}
				break;
		}
	}

	update() {

	}

}

function createEnemies(maxEnemies = 6) {
	let speed, x, y;
	let enemies = [];
	for (let i = 0; i < maxEnemies; i++) {
		speed = Math.floor(Math.random() * 4) + 1;
		x = -1;
		switch (i) {
			case 0:
			case 1:
				y = 1;
				break;
			case 2:
			case 3:
				y = 2;
				break;
			case 4:
			case 5:
				y = 3;
		}
		enemies[i] = new Enemy('images/enemy-bug.png', speed, x, y);
	}
	return enemies;
}

const maxEnemies = 6;
let allEnemies = createEnemies(maxEnemies);
let player = new Player();




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	let allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		65: 'left',
		68: 'right',
		83: 'down',
		87: 'up'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});