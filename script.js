
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

function resetGame() {
    // Reset character position
    character.style.top = "100px";

    // Reset the block and hole position and animation
    block.style.animation = 'none';
    hole.style.animation = 'none';
    block.style.left = '700px';
    hole.style.left = '700px';

    // Restart the block and hole animation after a slight delay
    setTimeout(function () {
        block.style.animation = 'block 2s infinite linear';
        hole.style.animation = 'block 2s infinite linear';
    }, 50);

    counter = 0;
}

hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 3;
    var top = (random * 130) + 150;
    hole.style.top = -(top) + "px";
    counter++;
});

function mainLoop() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if (jumping == 0) {
        character.style.top = (characterTop + 3.5) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top")) + 775; // Adjusted hole position

    if (characterTop > 755 || (blockLeft < 20 && blockLeft > -50 && (characterTop < holeTop || characterTop > holeTop + 130))) {
        alert("Game over. Score: " + counter);
        resetGame();
    }
}



let mainInterval = setInterval(mainLoop, 10);
let paused = false

// TODO: Listen for keyboard input, for example esc key
// When pressed: 

/* 
if (paused) {
    paused = false
    mainInterval = setInterval(mainLoop, 10);
} else {
    paused = true
    clearInterval(mainInterval)
}

*/

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = (characterTop - 4) + "px";
        }

        jumpCount++;

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
        }
    }, 10);
}