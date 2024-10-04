const canvas = document.getElementById('mc');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;
const radius = 20;
const speed = 2;

const keysPressed = {};

// Draw the circle
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Handle device orientation changes
function handleOrientation(event) {
    // Gamma (left-to-right tilt) and Beta (front-to-back tilt)
    const tiltX = event.gamma;  // left-right tilt (-90 to 90)
    const tiltY = event.beta;   // forward-backward tilt (-180 to 180)

    // Update the circle's position based on the tilt
    x += tiltX * speed;
    y += tiltY * speed;

    // Prevent the circle from going outside the canvas
    if (x - radius < 0) x = radius;
    if (x + radius > canvas.width) x = canvas.width - radius;
    if (y - radius < 0) y = radius;
    if (y + radius > canvas.height) y = canvas.height - radius;

    drawCircle();
}

// Initial circle draw
drawCircle();

// Add event listener for device orientation
window.addEventListener('deviceorientation', handleOrientation);