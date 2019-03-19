		var move            = 150;
		var wrapper_brcolor = 'black';
		var wrapper_color		= "white";
		var snake_color 		= 'gray';
		var snake_brcolor 	= 'dark';

		var snake = [
		{x: 10, y: 250},
		{x: 10, y: 260},
		{x: 10, y: 270},
		{x: 10, y: 280},
		{x: 10, y: 290}
		];

		var dx = 0;
		var dy = -10;

		var foodX;
    var foodY;

		var score = 0;

		var gameCanvas = document.getElementById("gameCanvas");
		gameCanvas.width = 300;
		gameCanvas.height = 300;
		var ctx = gameCanvas.getContext("2d");

		createFood();
		main();
		document.addEventListener("keydown", changeDirection);

		function main() {
			if (didGameEnd()) return;
			setTimeout(function onTick() {
				clearCanvas();
				drawFood();
				advanceSnake();
				drawSnake();
				main();
			}, move)
		}

		function clearCanvas() {
			ctx.fillStyle = wrapper_color;
			ctx.strokestyle = wrapper_brcolor;
			ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
			ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
		}


		function advanceSnake() {
			var head = {x: snake[0].x + dx, y: snake[0].y + dy};
			snake.unshift(head);

			var didEatFood = snake[0].x === foodX && snake[0].y === foodY;
			if (didEatFood) {
				score += 10;
				document.getElementById('score').innerHTML = score;
				createFood();

			} else {
				snake.pop();
			}
		}

		function didGameEnd() {
			for (let i = 4; i < snake.length; i++) {
				if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
			}
		var hitLeftWall = snake[0].x < 0;
		var hitRightWall = snake[0].x > gameCanvas.width - 10;
		var hitToptWall = snake[0].y < 0;
		var hitBottomWall = snake[0].y > gameCanvas.height - 10;
		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
	}



	function drawSnake() {
		snake.forEach(drawSnakePart)
	}

	function drawSnakePart(snakePart) {
		ctx.fillStyle = snake_color;
		ctx.strokestyle = snake_brcolor;

		ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
		ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
	}

	function changeDirection(event) {
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;
		var UP_KEY = 38;
		var DOWN_KEY = 40;



		var keyPressed = event.keyCode;
		var goingUp = dy === -10;
		var goingDown = dy === 10;
		var goingRight = dx === 10;
		var goingLeft = dx === -10;

		if (keyPressed === LEFT_KEY && !goingRight) {
			dx = -10;
			dy = 0;
		}

		if (keyPressed === UP_KEY && !goingDown) {
			dx = 0;
			dy = -10;
		}

		if (keyPressed === RIGHT_KEY && !goingLeft) {
			dx = 10;
			dy = 0;
		}

		if (keyPressed === DOWN_KEY && !goingUp) {
			dx = 0;
			dy = 10;
		}
	}



	function randomTen(min, max) {
		return Math.round((Math.random() * (max-min) + min) / 10) * 10;
	}

	function createFood() {
		foodX = randomTen(0, gameCanvas.width - 10);
		foodY = randomTen(0, gameCanvas.height - 10);

		snake.forEach(function isFoodOnSnake(part) {
			const foodIsOnSnake = part.x == foodX && part.y == foodY
			if (foodIsOnSnake)
				createFood();
		});
	}

	function drawFood() {
		ctx.fillStyle = 'red';
		ctx.strokestyle = 'darkred';
		ctx.fillRect(foodX, foodY, 10, 10);
		ctx.strokeRect(foodX, foodY, 10, 10);
	}