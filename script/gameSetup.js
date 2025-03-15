let playerName = '';
let selectedDifficulty = null;
const playerNameInput = document.querySelector('#player-name');
const startGameButton = document.querySelector('#start-game');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const rulesButton = document.querySelector('#rules-btn');
const rulesModal = document.querySelector('#rules-modal');
const closeRulesButton = document.querySelector('.close-btn');
const gameMenu = document.querySelector('#game-menu');
const gameScreen = document.querySelector('#game-screen');

function validateStartButton() {
	if(playerName && selectedDifficulty) {
		startGameButton.disabled = false;
	} else {
		startGameButton.disabled = true;
	}
}

playerNameInput.addEventListener('input', (event) => {
	playerName = event.target.value;
	validateStartButton();
});

difficultyButtons.forEach(button => {
	button.addEventListener('click', () => {
		difficultyButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
		selectedDifficulty = button.textContent;
		validateStartButton();
	});
});

startGameButton.addEventListener('click', () => {
	if(playerName && selectedDifficulty) {
		gameMenu.style.display = 'none';
		gameScreen.style.display = 'flex';
		document.querySelector('#player-display').textContent = playerName;
		startGame(selectedDifficulty);
	}
});

rulesButton.addEventListener('click', () => {
	rulesModal.style.display = 'flex';
});

closeRulesButton.addEventListener('click', () => {
	rulesModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
	if(event.target === rulesModal) {
		rulesModal.style.display = 'none';
	}
});

document.querySelector('#restart-game').addEventListener('click', restartGame);
