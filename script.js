const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const board = document.getElementById('game-board');
board.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{ x: Math.floor(cols / 2) * scale, y: Math.floor(rows / 2) * scale }];
let food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
let dx = scale;
let dy = 0;
let gameInterval;
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Move the snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    } else {
        snake.pop();
    }

    // Check for collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollision(head)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);
    }
}

function isCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function updateDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -scale;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = scale;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -scale;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = scale;
                dy = 0;
            }
            break;
    }
}

document.addEventListener('keydown', updateDirection);

function startGame() {
    gameInterval = setInterval(draw, 100);
}

startGame();
