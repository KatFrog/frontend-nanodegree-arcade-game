//import * as Setup from './setup.js';
//import * as Answers from 'js/answers.js';

// Base class for the Player and Enemy subclasses
class Sprite {

	constructor(colSize = 101, rowSize = 83) {
		this.colSize = colSize;
		this.rowSize = rowSize;
	}

	// Draw the sprite on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * this.colSize + 10, this.y *
			this.rowSize + 10); // The +10 is to get the image more centered.
	}

	findCorners(x, y, height, width) {

		let corners = [];
		x = x * this.colSize + 10;
		y = y * this.rowSize + 10;
		// Top left corner
		corners[0] = {
			x: x,
			y: y
		};
		// Top right corner
		corners[1] = {
			x: x + width,
			y: y
		};
		// Bottom right corner
		corners[2] = {
			x: x,
			y: y + height
		};
		// Bottom right corner
		corners[3] = {
			x: x + width,
			y: y + height
		};
		return corners;
	}

	checkCollision(ax, ay, aHeight, aWidth, bx, by, bHeight, bWidth) {
		// check for a collision between object a and object b
		let aCorners = this.findCorners(ax, ay, aHeight, aWidth);
		bx = bx * this.colSize + 10;
		by = by * this.rowSize + 10;
		// Check each corner for a collision.  Return true if there is a hit.
		for (let i = 0; i < aCorners.length; i++) {
			if ((aCorners[i].x >= bx) && (aCorners[i].x <= (bx + bWidth)) &&
				((aCorners[i].y >= bx) && (aCorners[i].y <= (by + bHeight)))) {
				return true;
			}
		}
		return false;
	}
};

class Enemy extends Sprite {
	constructor(imgFile = 'images/enemy-bug.png', speed = 1, x = -1, y = 2,
		height = 68, width = 98) {
		super();
		this.sprite = imgFile;
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
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
	constructor(imgFile = 'images/char-pink-girl.png', lives = 5, x = 2, y = 5,
		height = 78, width = 73) {
		super();
		this.sprite = imgFile;
		this.lives = lives;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.playing = false;
	}

	handleInput(direction) {
		if (!this.playing) {
			this.playing = true;
			music.play();
		}
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

	winGame() {
		winDialog.showModal();
	}


	update() {
		let hit = false;
		// Check for collisions with the allEnemies
		for (let i = 0; i < allEnemies.length; i++) {
			hit = this.checkCollision(this.x, this.y, this.height, this.width,
				allEnemies[i].x, allEnemies[i].y, allEnemies[i].height, allEnemies[i].width
			);
			if (hit) {
				this.x = 2;
				this.y = 5;
				return;
			}
		}
		// If the player makes it to the water, display winning modal
		if (this.y === 0) {
			this.winGame();
			for (let i = 0; i < allEnemies.length; i++) {
				allEnemies[i].speed = 0;
				allEnemies[i].x = -1;
			}
		}
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

const closeModal = document.getElementById('close');
const startGame = document.getElementById('newGame');
const winDialog = document.getElementById('wonGame');

const music = document.getElementById('background-music');



closeModal.addEventListener('click', function() {
	winDialog.close();
});

startGame.addEventListener('click', function() {
	winDialog.close();
	window.location.reload(true);
});

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