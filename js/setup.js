export function createEnemies(maxEnemies = 6) {
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