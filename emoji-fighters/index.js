const fighters = [
    { animal: "🦁", strength: 95, defence: 80 },
    { animal: "🐯", strength: 92, defence: 75 },
    { animal: "🐻", strength: 98, defence: 90 },
    { animal: "🦍", strength: 94, defence: 85 },
    { animal: "🐺", strength: 78, defence: 65 },
    { animal: "🐗", strength: 88, defence: 85 },
    { animal: "🦬", strength: 96, defence: 95 },
    { animal: "🐘", strength: 100, defence: 100 },
    { animal: "🦏", strength: 99, defence: 98 },
    { animal: "🐊", strength: 90, defence: 88 },
    { animal: "🦅", strength: 70, defence: 55 },
    { animal: "🦈", strength: 97, defence: 70 },
    { animal: "🐆", strength: 82, defence: 60 },
    { animal: "🦓", strength: 60, defence: 58 },
    { animal: "🐂", strength: 91, defence: 89 },
    { animal: "🐃", strength: 89, defence: 92 },
    { animal: "🦘", strength: 75, defence: 62 },
    { animal: "🐍", strength: 85, defence: 50 },
    { animal: "🦡", strength: 72, defence: 78 },
    { animal: "🐕", strength: 65, defence: 60 },
    { animal: "🦌", strength: 68, defence: 63 },
    { animal: "🐅", strength: 93, defence: 76 },
    { animal: "🦛", strength: 97, defence: 97 },
    { animal: "🦣", strength: 105, defence: 105 },
    { animal: "🐉", strength: 120, defence: 110 },
    // 🔥 NEW 10
    { animal: "🦅‍🔥", strength: 110, defence: 80 }, // phoenix
    { animal: "🦦", strength: 65, defence: 70 },   // otter (agile)
    { animal: "🦝", strength: 67, defence: 66 },   // raccoon
    { animal: "🐆‍⬛", strength: 88, defence: 70 }, // black panther
    { animal: "🐃‍❄️", strength: 100, defence: 102 }, // musk ox tank
    { animal: "🦢", strength: 60, defence: 75 },   // swan (defensive)
    { animal: "🦜", strength: 55, defence: 50 },   // parrot (weak/fast)
    { animal: "🦇", strength: 76, defence: 58 },   // bat (crit type)
    { animal: "🐺‍❄️", strength: 84, defence: 72 }, // arctic wolf
    { animal: "🦁‍👑", strength: 130, defence: 120 } // king lion (elite)
];

// Game state
let selectedFighter = {};
let computerFighter = {};
let playerHealth = 1000;
let computerHealth = 1000;
let mode = "hard"; // easy, medium, hard
let isGameOver = false;

// DOM elements
const pickBtn = document.getElementById("pick-btn");
const resetBtn = document.getElementById("reset-btn");
const modeSelect = document.getElementById("mode-select");
const playerInfo = document.getElementById("player-info");
const computerInfo = document.getElementById("computer-info");
const playerEmoji = document.getElementById("player-emoji");
const computerEmoji = document.getElementById("computer-emoji");
const playerHealthBar = document.getElementById("player-health");
const computerHealthBar = document.getElementById("computer-health");

// Event listeners
pickBtn.addEventListener("click", fight);
resetBtn.addEventListener("click", resetGame);
modeSelect.addEventListener("change", function(event) {
    changeMode(event.target.value);
});

// Utility function: random number generator
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Weighted fighter selection based on difficulty
function weighted(mode) {
    const roll = Math.random();
    const totalFighters = fighters.length;
    const thirtyPercent = Math.ceil(totalFighters * 0.3);
    const seventyPercent = totalFighters - thirtyPercent;
    
    if (mode === "easy") {
        // 70% small, 30% big
        return roll < 0.7
            ? rand(1, seventyPercent)
            : rand(seventyPercent, totalFighters - 1);
    }

    if (mode === "medium") {
        // fully random
        return rand(1, totalFighters - 1);
    }

    if (mode === "hard") {
        // 70% big, 30% small
        return roll < 0.7
            ? rand(seventyPercent, totalFighters - 1)
            : rand(1, seventyPercent);
    }
}

// Pick a fighter based on difficulty mode
function pickFighter(mode1 = mode) {
    const index = weighted(mode1);
    return fighters[index];
}

// Main fight function
function fight() {
    selectedFighter = pickFighter("medium");
    computerFighter = pickFighter(mode === "hard" ? "easy" : mode === "easy" ? "hard" : "medium");
    attack(selectedFighter, computerFighter);
}

// Reset game to initial state
function resetGame() {
    selectedFighter = {};
    computerFighter = {};
    isGameOver = false;
    playerHealth = 1000;
    computerHealth = 1000;
    
    playerInfo.textContent = "You";
    computerInfo.textContent = "Computer";
    playerEmoji.textContent = "❓";
    computerEmoji.textContent = "❓";
    playerHealthBar.textContent = `${playerHealth}`;
    computerHealthBar.textContent = `${computerHealth}`;
    
    pickBtn.disabled = false;
    pickBtn.textContent = "Pick Fighters!";
}

// Change difficulty mode
function changeMode(newMode) {
    if (["easy", "medium", "hard"].includes(newMode)) {
        mode = newMode;
        resetGame();
    }
}

// Update UI with fighter information
function updateUIFighter() {
    playerHealthBar.textContent = `${playerHealth}`;
    computerHealthBar.textContent = `${computerHealth}`;
    playerInfo.textContent = `Player Str: ${selectedFighter.strength}, Def: ${selectedFighter.defence}`;
    computerInfo.textContent = `Computer Str: ${computerFighter.strength}, Def: ${computerFighter.defence}`;
    playerEmoji.textContent = selectedFighter.animal;
    computerEmoji.textContent = computerFighter.animal;

    if (isGameOver) {
        if (playerHealth > computerHealth) {
            playerInfo.textContent = "You Win!";
            computerInfo.textContent = "Computer Loses!";
            pickBtn.disabled = true;
            pickBtn.textContent = "Game Over";
        } else if (playerHealth < computerHealth) {
            playerInfo.textContent = "You Lose!";
            computerInfo.textContent = "Computer Wins!";
            pickBtn.disabled = true;
            pickBtn.textContent = "Game Over";
        } else {
            playerInfo.textContent = "It's a Tie!";
            computerInfo.textContent = "It's a Tie!";
        }
    }
}

// Attack logic
function attack(fighterA, fighterB) {
    if (isGameOver) return;
    
    if (fighterA.animal === fighterB.animal) {
        return;
    }
    
    if (fighterA.strength > fighterB.defence) {
        const damage = (fighterA.strength - fighterB.defence) * 10;
        computerHealth -= damage;
        if (computerHealth <= 0) {
            computerHealth = 0;
            isGameOver = true;
        }
    } else if (fighterA.strength < fighterB.defence) {
        const damage = (fighterB.defence - fighterA.strength) * 8;
        playerHealth -= damage;
        if (playerHealth <= 0) {
            playerHealth = 0;
            isGameOver = true;
        }
    }
    
    updateUIFighter();
}