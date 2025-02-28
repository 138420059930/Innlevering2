const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
let jumping = 0;
let counter = 0;
let mainInterval;
let paused = false;

function resetGame() {
    // Clear any existing game loop interval
    stopGameLoop();
    
    character.style.top = "100px";
    block.style.animation = "none";
    hole.style.animation = "none";
    block.style.left = "700px";
    hole.style.left = "700px";

    setTimeout(function () {
        block.style.animation = "block 2s infinite linear";
        hole.style.animation = "block 2s infinite linear";
    }, 50);

    counter = 0;
    if (!paused) startGameLoop();
}

hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 3;
    var top = random * 130 + 150;
    hole.style.top = -top + "px";
    counter++;
});

function mainLoop() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if (jumping == 0) {
        character.style.top = characterTop + 3.5 + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top")) + 775;

    if (characterTop > 755 || (blockLeft < 20 && blockLeft > -50 && (characterTop < holeTop || characterTop > holeTop + 130))) {
        alert("Game over. Score: " + counter);
        resetGame();
    }
}

function startGameLoop() {
    mainInterval = setInterval(mainLoop, 10);
}

function stopGameLoop() {
    clearInterval(mainInterval);
}

// Start the game loop initially
startGameLoop();

// Pause/Resume functionality
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (paused) {
            paused = false;
            startGameLoop();
            block.style.animationPlayState = "running";
            hole.style.animationPlayState = "running";
        } else {
            paused = true;
            stopGameLoop();
            block.style.animationPlayState = "paused";
            hole.style.animationPlayState = "paused";
        }
    }
});

function jump() {
    if (paused) return; // Prevent jumping when paused

    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 4.5 + "px";
        }

        jumpCount++;

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
        }
    }, 10);
}
