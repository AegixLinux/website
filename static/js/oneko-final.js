// oneko.js - Final production version

let onekoX = window.innerWidth / 2;
let onekoY = window.innerHeight / 2;
let targetX = onekoX;
let targetY = onekoY;
let animationFrame = 0;
let lastFrameTime = 0;
let lastMouseMoveTime = Date.now();
let isIdle = false;
let lickCount = 0;
let isYawning = false;

// Reference to the oneko div
const oneko = document.getElementById('oneko');

if (oneko) {
    // Force set all styles directly in JavaScript to override CSS
    oneko.style.backgroundImage = 'url("/images/oneko.gif")';
    oneko.style.backgroundRepeat = 'no-repeat';
    oneko.style.width = '32px';
    oneko.style.height = '32px';
    oneko.style.position = 'fixed';
    oneko.style.pointerEvents = 'none';
    oneko.style.zIndex = '9999';
    oneko.style.imageRendering = 'pixelated';
    oneko.style.backgroundColor = 'transparent';
    oneko.style.border = 'none';
    oneko.style.backgroundSize = 'auto';
    oneko.style.backgroundAttachment = 'scroll';
}

// Define frame sets for different directions and idle/sleep animations
const frameSets = {
    up: [
        { x: -32, y: -64 },
        { x: -32, y: -96 }
    ],
    left: [
        { x: -192, y: -32 },
        { x: -128, y: -64 },
        { x: -128, y: -96 }
    ],
    right: [
        { x: -96, y: 0 },
        { x: -96, y: -32 },
        { x: -160, y: -64 }
    ],
    down: [
        { x: -224, y: -64 },
        { x: -192, y: -96 }
    ],
    upLeft: [
        { x: -32, y: 0 },
        { x: -32, y: -32 }
    ],
    upRight: [
        { x: 0, y: -64 },
        { x: 0, y: -96 }
    ],
    downLeft: [
        { x: -160, y: -96 },
        { x: -192, y: -32 }
    ],
    downRight: [
        { x: -160, y: -32 },
        { x: -96, y: -32 }
    ],
    lick: [
        { x: -224, y: 0 },
        { x: -96, y: -96 }
    ],
    yawn: [
        { x: -96, y: -64 }
    ],
    sleep: [
        { x: -64, y: 0 },
        { x: -64, y: -32 }
    ]
};

// Function to determine the direction
function getDirection(deltaX, deltaY) {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > absY) {
        if (deltaX > 0) return "right";
        else return "left";
    } else if (absY > absX) {
        if (deltaY > 0) return "down";
        else return "up";
    } else {
        // Diagonal directions
        if (deltaX < 0 && deltaY < 0) return "upLeft";
        if (deltaX > 0 && deltaY < 0) return "upRight";
        if (deltaX < 0 && deltaY > 0) return "downLeft";
        if (deltaX > 0 && deltaY > 0) return "downRight";
    }
    return "down";
}

// Function to update the position and animation frame of the oneko
function updatePosition(timestamp) {
    if (!oneko) return;

    const speed = 0.01;
    const stoppingDistance = 50;
    const deltaX = targetX - onekoX;
    const deltaY = targetY - onekoY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const currentTime = Date.now();
    if (currentTime - lastMouseMoveTime > 5000) {
        isIdle = true;
    } else {
        isIdle = false;
        lickCount = 0;
        isYawning = false;
    }

    if (!isIdle && distance > stoppingDistance) {
        // Cat is moving
        const moveX = (deltaX / distance) * speed * distance;
        const moveY = (deltaY / distance) * speed * distance;

        onekoX += moveX;
        onekoY += moveY;

        oneko.style.transform = `translate(${onekoX - 16}px, ${onekoY - 16}px)`;

        const direction = getDirection(deltaX, deltaY);

        if (timestamp - lastFrameTime > 150) {
            const frames = frameSets[direction];
            animationFrame = (animationFrame + 1) % frames.length;
            const frame = frames[animationFrame];

            // Use setProperty with important to override CSS !important rules
            oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
            lastFrameTime = timestamp;
        }
    } else if (isIdle) {
        // Cat is idle
        if (lickCount < 3) {
            if (timestamp - lastFrameTime > 500) {
                const frames = frameSets.lick;
                animationFrame = (animationFrame + 1) % frames.length;
                const frame = frames[animationFrame];
                oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
                lastFrameTime = timestamp;
                if (animationFrame === 0) lickCount++;
            }
        } else if (!isYawning) {
            if (timestamp - lastFrameTime > 1000) {
                const frame = frameSets.yawn[0];
                oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
                lastFrameTime = timestamp;
                isYawning = true;
            }
        } else {
            if (timestamp - lastFrameTime > 700) {
                const frames = frameSets.sleep;
                animationFrame = (animationFrame + 1) % frames.length;
                const frame = frames[animationFrame];
                oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
                lastFrameTime = timestamp;
            }
        }
    } else {
        oneko.style.transform = `translate(${onekoX - 16}px, ${onekoY - 16}px)`;
        oneko.style.setProperty('background-position', `-96px -96px`, 'important');
    }

    requestAnimationFrame(updatePosition);
}

// Update the target position whenever the mouse moves
document.addEventListener('mousemove', (event) => {
    // Use clientX/clientY for viewport coordinates (works with fixed positioning)
    targetX = event.clientX;
    targetY = event.clientY;
    lastMouseMoveTime = Date.now();
    isIdle = false;
});

// Start the animation loop
if (oneko) {
    requestAnimationFrame(updatePosition);
}