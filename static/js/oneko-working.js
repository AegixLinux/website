// oneko.js - Working cat animation
(function() {
    let onekoX = 32;
    let onekoY = 32;
    let targetX = onekoX;
    let targetY = onekoY;
    let onekoEl;
    let animationFrameIndex = 0;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const frameSets = {
        idle: [{ x: -96, y: -96 }],
        alert: [{ x: -64, y: 0 }],
        scratch: [
            { x: -96, y: 0 },
            { x: -128, y: 0 }
        ],
        tired: [{ x: -128, y: -32 }],
        sleeping: [
            { x: -64, y: -32 },
            { x: -96, y: -32 }
        ],
        north: [
            { x: -32, y: -64 },
            { x: -32, y: -96 }
        ],
        northeast: [
            { x: 0, y: -64 },
            { x: 0, y: -96 }
        ],
        east: [
            { x: -96, y: 0 },
            { x: -96, y: -32 }
        ],
        southeast: [
            { x: -160, y: -32 },
            { x: -96, y: -32 }
        ],
        south: [
            { x: -224, y: -64 },
            { x: -192, y: -96 }
        ],
        southwest: [
            { x: -160, y: -96 },
            { x: -192, y: -32 }
        ],
        west: [
            { x: -192, y: -32 },
            { x: -128, y: -64 }
        ],
        northwest: [
            { x: -32, y: 0 },
            { x: -32, y: -32 }
        ]
    };

    function getDirection(deltaX, deltaY) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX === 0 && absY === 0) return "idle";

        const angle = Math.atan2(deltaY, deltaX);
        const degrees = (angle * 180) / Math.PI;

        if (degrees >= -22.5 && degrees < 22.5) return "east";
        if (degrees >= 22.5 && degrees < 67.5) return "southeast";
        if (degrees >= 67.5 && degrees < 112.5) return "south";
        if (degrees >= 112.5 && degrees < 157.5) return "southwest";
        if (degrees >= 157.5 || degrees < -157.5) return "west";
        if (degrees >= -157.5 && degrees < -112.5) return "northwest";
        if (degrees >= -112.5 && degrees < -67.5) return "north";
        if (degrees >= -67.5 && degrees < -22.5) return "northeast";

        return "idle";
    }

    function setBackground(frameSet) {
        const frame = frameSet[animationFrameIndex % frameSet.length];
        onekoEl.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
    }

    function updatePosition() {
        if (!onekoEl) return;

        const deltaX = targetX - onekoX;
        const deltaY = targetY - onekoY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 32) {
            // Cat is moving
            const speed = 0.5;
            onekoX += (deltaX / distance) * speed * Math.min(distance, 10);
            onekoY += (deltaY / distance) * speed * Math.min(distance, 10);

            const direction = getDirection(deltaX, deltaY);
            const frameSet = frameSets[direction] || frameSets.idle;
            setBackground(frameSet);

            animationFrameIndex++;
        } else {
            // Cat is idle
            setBackground(frameSets.idle);
        }

        onekoEl.style.transform = `translate(${onekoX - 16}px, ${onekoY - 16}px)`;
        requestAnimationFrame(updatePosition);
    }

    function init() {
        onekoEl = document.getElementById("oneko");
        if (!onekoEl) {
            console.error("oneko element not found");
            return;
        }

        console.log("🐱 Oneko initialized");

        // Set initial position and background
        onekoEl.style.transform = `translate(${onekoX - 16}px, ${onekoY - 16}px)`;
        setBackground(frameSets.idle);

        document.addEventListener("mousemove", function(event) {
            targetX = event.pageX;
            targetY = event.pageY;
        });

        updatePosition();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();