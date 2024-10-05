const canvas = document.getElementById('mc');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;
const radius = 20;
const speed = 1;

const keysPressed = {};

const walls = [
    { x: 50, y: 50, width: 500, height: 10 },
    { x: 200, y: 150, width: 10, height: 100 },
    { x: 100, y: 300, width: 10, height: 200 },
];

// Draw the walls
function drawWalls() {
    ctx.fillStyle = 'red';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

// Draw the circle
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawWalls(); // Draw the walls first
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function checkCollision(newX, newY) {
    // Loop through each wall and check if the circle would overlap with it
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (
            newX + radius > wall.x &&         // Circle's right edge > wall's left edge
            newX - radius < wall.x + wall.width && // Circle's left edge < wall's right edge
            newY + radius > wall.y &&         // Circle's bottom edge > wall's top edge
            newY - radius < wall.y + wall.height  // Circle's top edge < wall's bottom edge
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

// Handle device orientation changes
// function handleOrientation(event) {
//     // Gamma (left-to-right tilt) and Beta (front-to-back tilt)
//     const tiltX = event.gamma;  // left-right tilt (-90 to 90)
//     const tiltY = event.beta;   // forward-backward tilt (-180 to 180)

//     // Update the circle's position based on the tilt
//     let newX = x + tiltX * speed;
//     let newY = y + tiltY * speed;

//     // Prevent the circle from going outside the canvas
//     if (x - radius < 0) x = radius;
//     if (x + radius > canvas.width) x = canvas.width - radius;
//     if (y - radius < 0) y = radius;
//     if (y + radius > canvas.height) y = canvas.height - radius;

//     if (!checkCollision(newX, newY)) {
//         x = newX;
//         y = newY;
//     }

//     drawCircle();
// }

// Initial circle draw
// drawCircle();

// Add event listener for device orientation
// window.addEventListener('deviceorientation', handleOrientation);

function updatePosition() {
    let newX = x
    let newY = y
    if (keysPressed['ArrowUp']) {
        newY = y - speed;
    }
    if (keysPressed['ArrowDown']) {
        newY = y + speed;
    }
    if (keysPressed['ArrowLeft']) {
        newX = x - speed;
    }
    if (keysPressed['ArrowRight']) {
        newX = x + speed;
    }
    if (!checkCollision(newX, newY)) {
        x = newX;
        y = newY;
    }
    drawCircle();
}

// Event listeners for key press and release
document.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

// Continuously update the circle's position (60 frames per second)
function gameLoop() {
    updatePosition();
    requestAnimationFrame(gameLoop);
}

// Initial draw and start the loop
drawCircle();
gameLoop();