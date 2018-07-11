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

	checkCollision(objA, objB) {
		// Size of bugs = W: 98px H: 68px
		// Size of princess = W: 73px H: 78px
		// Determine the exact location of objA and objB.
		// The x coordinates are based on the grid.

		let objASides = {
			left: (objA.x * this.colSize),
			right: ((objA.x * this.colSize) + 73)
		};
		// Magic Number Alert!  73 and 98 are magic numbers based on the
		// sizes of the images for the Princess and the bugs.
		let objBSides = {
			left: (objB.x * this.colSize),
			right: ((objB.x * this.colSize) + 98)
		};

		// Huge if statement, it basically asks:
		// If objA and objB are in the same row (y)
		// And either side of objA lands between the two sides of objB
		// Then record a collision (return true)
		if ((objA.y === objB.y) &&
			(((objASides.left >= objBSides.left) &&
					(objASides.left <= objBSides.right)) ||
				((objASides.right >= objBSides.left) &&
					(objASides.right <= objBSides.right)))) {
			return true;
		}
		return false;
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
	constructor(imgFile = 'images/char-pink-girl.png', x = 2, y = 5) {
		super();
		this.sprite = imgFile;
		this.x = x;
		this.y = y;
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
		gameWon = true;
		winDialog.style.display = "block";
	}


	update() {
		let hit = false;

		// If the player makes it to the water, display winning modal
		if ((this.y === 0) && (!gameWon)) {
			this.winGame();
			for (let i = 0; i < allEnemies.length; i++) {
				allEnemies[i].speed = 0;
				allEnemies[i].x = -1;
			}
			return;
		}
		// Check for collisions with the allEnemies
		for (let i = 0; i < allEnemies.length; ++i) {
			hit = this.checkCollision(this, allEnemies[i]);
			if (hit) {
				collide.play();
				this.x = 2;
				this.y = 5;
				return;
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
let gameWon = false;

const music = document.getElementById('background-music');

let collide = new Audio;

collide.src = "sounds/hit.wav";



closeModal.addEventListener('click', function() {
	winDialog.style.display = 'none';
});

startGame.addEventListener('click', function() {
	winDialog.style.display = 'none';
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