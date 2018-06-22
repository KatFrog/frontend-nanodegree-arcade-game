// Enemies our player must avoid
class Sprite {
	constructor(imgFile) {

		this.sprite = imgFile;

	}

	// Draw the sprite on the screen, required method for game
	render() {
		const colSize = 101;
		const rowSize = 83;
		ctx.drawImage(Resources.get(this.sprite), this.x * colSize, this.y * rowSize);
	}
};

class Enemy extends Sprite {
	constructor(imgFile = 'images/enemy-bug.png', speed = 1, x = -1, y = 2,
		colSize, rowSize) {
		super(colSize, rowSize);
		this.sprite = imgFile;
		this.speed = speed;
		this.x = x;
		this.y = y;
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {

	}
}

class Player extends Sprite {
	constructor(imgFile = 'images/char-boy.png', lives = 5, x = 2, y = 5, colSize,
		rowSize) {
		super(colSize, rowSize);
		this.sprite = imgFile;
		this.lives = lives;
		this.x = x;
		this.y = y;
	}

	handleInput(direction) {
		switch (direction) {
			case 'left':
				this.x -= 1;
				break;
			case 'right':
				this.x += 1;
				break;
			case 'up':
				this.y += 1;
				break;
			case 'down':
				this.y -= 1;
				break;
		}
	}

	update(keyStroke) {

	}

}

let allEnemies = [];
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

	Player.handleInput(allowedKeys[e.keyCode]);
});