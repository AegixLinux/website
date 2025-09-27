// oneko.js - Safe version with proper initialization

function initOneko() {
    // Get the oneko element
    const oneko = document.getElementById('oneko');
    
    if (!oneko) {
        console.error('🚫 Oneko element not found!');
        return;
    }
    
    console.log('🐱 Initializing oneko cat...');

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
            { x: -64, y: 0 },
            { x: -64, y: -32 }
        ],
        downLeft: [
            { x: -192, y: 0 },
            { x: -192, y: -64 }
        ],
        downRight: [
            { x: -160, y: 0 },
            { x: -160, y: -32 }
        ],
        idle: [
            { x: -96, y: -96 }
        ],
        sleep: [
            { x: -128, y: -32 },
            { x: -160, y: -96 }
        ],
        lick: [
            { x: -224, y: 0 },
            { x: -224, y: -32 }
        ],
        yawn: [
            { x: 0, y: -96 },
            { x: -64, y: -96 }
        ]
    };

    function getDirection(dx, dy) {
        const angle = Math.atan2(dy, dx);
        const degrees = (angle * 180) / Math.PI;

        if (degrees >= -22.5 && degrees < 22.5) return 'right';
        if (degrees >= 22.5 && degrees < 67.5) return 'downRight';
        if (degrees >= 67.5 && degrees < 112.5) return 'down';
        if (degrees >= 112.5 && degrees < 157.5) return 'downLeft';
        if (degrees >= 157.5 || degrees < -157.5) return 'left';
        if (degrees >= -157.5 && degrees < -112.5) return 'upLeft';
        if (degrees >= -112.5 && degrees < -67.5) return 'up';
        if (degrees >= -67.5 && degrees < -22.5) return 'upRight';

        return 'down';
    }

    function updatePosition(currentTime) {
        if (currentTime - lastFrameTime < 100) {
            requestAnimationFrame(updatePosition);
            return;
        }
        lastFrameTime = currentTime;

        const dx = targetX - onekoX;
        const dy = targetY - onekoY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the cat should be idle
        if (Date.now() - lastMouseMoveTime > 3000) {
            if (!isIdle) {
                isIdle = true;
                lickCount = 0;
                isYawning = false;
            }

            if (distance < 32) {
                if (Math.random() < 0.02) {
                    if (Math.random() < 0.5 && lickCount < 3) {
                        const frame = frameSets.lick[animationFrame % frameSets.lick.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                        lickCount++;
                    } else if (!isYawning) {
                        isYawning = true;
                        const frame = frameSets.yawn[animationFrame % frameSets.yawn.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    } else {
                        const frame = frameSets.sleep[animationFrame % frameSets.sleep.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    }
                } else {
                    const frame = frameSets.idle[0];
                    oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                }
            }
        } else {
            isIdle = false;
            if (distance > 10) {
                const speed = 5;
                onekoX += (dx / distance) * speed;
                onekoY += (dy / distance) * speed;

                oneko.style.left = `${onekoX - 16}px`;
                oneko.style.top = `${onekoY - 16}px`;

                const direction = getDirection(dx, dy);
                const frames = frameSets[direction];
                if (frames) {
                    const frame = frames[animationFrame % frames.length];
                    oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    animationFrame++;
                }
            }
        }

        if (!isIdle || distance >= 32) {
            oneko.style.left = `${onekoX - 16}px`;
            oneko.style.top = `${onekoY - 16}px`;
        }

        requestAnimationFrame(updatePosition);
    }

    // Update the target position whenever the mouse moves
    document.addEventListener('mousemove', (event) => {
        targetX = event.pageX;
        targetY = event.pageY;
        lastMouseMoveTime = Date.now();
        isIdle = false;
    });

    // Initialize oneko position
    oneko.style.left = `${onekoX - 16}px`;
    oneko.style.top = `${onekoY - 16}px`;

    // Start the animation loop
    console.log('🐱 Starting oneko animation loop...');
    requestAnimationFrame(updatePosition);
}

// Initialize oneko when called
initOneko();
