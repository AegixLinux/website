// oneko.js - Debug version with console logging

console.log('🐱 Oneko script loaded');

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

console.log('🐱 Initial position:', onekoX, onekoY);

// Reference to the oneko div
const oneko = document.getElementById('oneko');
console.log('🐱 Oneko element:', oneko);

if (!oneko) {
    console.error('🚫 Oneko element NOT FOUND!');
} else {
    console.log('✅ Oneko element found:', oneko);

    // Force set the background image directly in JavaScript
    oneko.style.backgroundImage = 'url("/images/oneko.gif")';
    oneko.style.backgroundRepeat = 'no-repeat';
    oneko.style.width = '32px';
    oneko.style.height = '32px';
    oneko.style.position = 'fixed';
    oneko.style.pointerEvents = 'none';
    oneko.style.zIndex = '9999';
    oneko.style.imageRendering = 'pixelated';

    console.log('🐱 Element styles after setup:', window.getComputedStyle(oneko));
    console.log('🖼️ Background image:', oneko.style.backgroundImage);

    // Check element visibility and positioning
    const rect = oneko.getBoundingClientRect();
    console.log('📐 Element bounding rect:', rect);
    console.log('👁️ Element visibility:', {
        display: window.getComputedStyle(oneko).display,
        visibility: window.getComputedStyle(oneko).visibility,
        opacity: window.getComputedStyle(oneko).opacity,
        zIndex: window.getComputedStyle(oneko).zIndex
    });

    // Test if image is loading
    const testImg = new Image();
    testImg.onload = () => console.log('✅ oneko.gif loaded successfully');
    testImg.onerror = () => console.error('❌ oneko.gif failed to load');
    testImg.src = '/images/oneko.gif';

    // Remove any background color that might hide the sprite
    oneko.style.backgroundColor = 'transparent';
    oneko.style.border = 'none';

    // Force the background image properties
    oneko.style.backgroundSize = 'auto';
    oneko.style.backgroundAttachment = 'scroll';

    console.log('🎨 Removed debug styling, set transparent background');
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

let frameCount = 0;

// Function to update the position and animation frame of the oneko
function updatePosition(timestamp) {
    if (!oneko) {
        console.error('🚫 Oneko element lost!');
        return;
    }

    frameCount++;
    if (frameCount % 60 === 0) { // Log every 60 frames
        console.log('🐱 Frame #' + frameCount, 'Position:', onekoX, onekoY, 'Target:', targetX, targetY);
    }

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

            console.log('🎬 Animation frame:', direction, frame, 'Frame #:', animationFrame);

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
                console.log('😸 Licking animation:', frame);
                oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
                lastFrameTime = timestamp;
                if (animationFrame === 0) lickCount++;
            }
        } else if (!isYawning) {
            if (timestamp - lastFrameTime > 1000) {
                const frame = frameSets.yawn[0];
                console.log('😴 Yawning animation:', frame);
                oneko.style.setProperty('background-position', `${frame.x}px ${frame.y}px`, 'important');
                lastFrameTime = timestamp;
                isYawning = true;
            }
        } else {
            if (timestamp - lastFrameTime > 700) {
                const frames = frameSets.sleep;
                animationFrame = (animationFrame + 1) % frames.length;
                const frame = frames[animationFrame];
                console.log('💤 Sleeping animation:', frame);
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
    targetX = event.pageX;
    targetY = event.pageY;
    lastMouseMoveTime = Date.now();
    isIdle = false;

    if (frameCount % 30 === 0) { // Log occasionally
        console.log('🖱️ Mouse move:', targetX, targetY);
    }
});

console.log('🚀 Starting animation loop...');
requestAnimationFrame(updatePosition);