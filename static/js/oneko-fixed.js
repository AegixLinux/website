// oneko.js - Fixed version with proper initialization
// Based on original working script from zenshinsuru.com

// Wait for the oneko element to be available
function initOneko() {
    const oneko = document.getElementById('oneko');
    
    if (!oneko) {
        console.error('🚫 Oneko element not found!');
        return;
    }
    
    console.log('🐱 Initializing oneko cat with original script...');

    let onekoX = window.innerWidth / 2;
    let onekoY = window.innerHeight / 2;
    let targetX = onekoX;
    let targetY = onekoY;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let lastMouseMoveTime = Date.now(); // Track the last mouse movement time
    let isIdle = false;
    let lickCount = 0; // Track how many times the cat has licked
    let isYawning = false; // Track if the cat is yawning

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
            { x: -224, y: -32 }
        ],
        idle: [
            { x: -96, y: -96 }
        ],
        sleep: [
            { x: -128, y: -32 },
            { x: -160, y: -64 }
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

        return 'down'; // Default direction
    }

    function updatePosition(currentTime) {
        // Throttle the update to 60 FPS (16.67ms)
        if (currentTime - lastFrameTime < 16) {
            requestAnimationFrame(updatePosition);
            return;
        }
        lastFrameTime = currentTime;

        const dx = targetX - onekoX;
        const dy = targetY - onekoY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the cat should be idle (mouse hasn't moved for 3 seconds)
        if (Date.now() - lastMouseMoveTime > 3000) {
            if (!isIdle) {
                isIdle = true;
                lickCount = 0;
                isYawning = false;
            }

            // If close enough to target and idle, do idle animations
            if (distance < 32) {
                if (Math.random() < 0.02) { // 2% chance per frame to do an action
                    if (Math.random() < 0.5 && lickCount < 3) { // 50% chance to lick (max 3 times)
                        const frame = frameSets.lick[animationFrame % frameSets.lick.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                        lickCount++;
                    } else if (!isYawning) {
                        isYawning = true;
                        const frame = frameSets.yawn[animationFrame % frameSets.yawn.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    } else {
                        // Sleep animation
                        const frame = frameSets.sleep[animationFrame % frameSets.sleep.length];
                        oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    }
                } else {
                    // Default idle pose
                    const frame = frameSets.idle[0];
                    oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                }
            }
        } else {
            // Mouse is moving, so the cat should follow
            isIdle = false;
            if (distance > 10) { // Only move if far enough from target
                const speed = 3; // Adjust speed as needed
                onekoX += (dx / distance) * speed;
                onekoY += (dy / distance) * speed;

                // Update position
                oneko.style.left = `${onekoX - 16}px`;
                oneko.style.top = `${onekoY - 16}px`;

                // Update animation based on direction
                const direction = getDirection(dx, dy);
                const frames = frameSets[direction];
                if (frames) {
                    const frame = frames[animationFrame % frames.length];
                    oneko.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
                    animationFrame++;
                }
            }
        }

        // Ensure the position is always updated if not idle or if far from target
        if (!isIdle || distance >= 32) {
            oneko.style.left = `${onekoX - 16}px`;
            oneko.style.top = `${onekoY - 16}px`;
        }

        // Set the animation to the sitting frame if idle and close
        if (isIdle && distance < 32 && Math.random() > 0.02) {
            oneko.style.backgroundPosition = `-96px -96px`;
        }

        // Request the next animation frame
        requestAnimationFrame(updatePosition);
    }

    // Update the target position whenever the mouse moves
    document.addEventListener('mousemove', (event) => {
        targetX = event.pageX;
        targetY = event.pageY;
        lastMouseMoveTime = Date.now(); // Reset the idle timer
        isIdle = false; // Reset idle status when the mouse moves
    });

    // Initialize position
    oneko.style.left = `${onekoX - 16}px`;
    oneko.style.top = `${onekoY - 16}px`;

    // Start the animation loop
    console.log('🐱 Starting oneko animation loop...');
    requestAnimationFrame(updatePosition);
}

// Initialize immediately when script loads
initOneko();
