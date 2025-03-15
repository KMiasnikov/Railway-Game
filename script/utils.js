let timer;
let elapsedTime = 0;

function startTimer(timeLimit, onTimeUp) {
	clearInterval(timer);
	elapsedTime = 0;
	const restartButton = document.querySelector('#restart-game');
	restartButton.style.display = 'none';
	timer = setInterval(() => {
		elapsedTime++;
		const remainingTime = timeLimit - elapsedTime;
		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;
		document.querySelector('#timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		if(remainingTime <= 0) {
			clearInterval(timer);
			onTimeUp();
			restartButton.style.display = 'block';
		}
	}, 1000);
}

function showOasisAlert(message) {
	const alertElement = document.createElement('div');
	alertElement.classList.add('time-up-alert');
	alertElement.textContent = message;
	document.body.appendChild(alertElement);
	setTimeout(() => {
		alertElement.remove();
	}, 3000);
}

function showTimerAlert(message) {
	const alertElement = document.querySelector('.time-up-alert');
	if(!alertElement) {
		const newAlertElement = document.createElement('div');
		newAlertElement.textContent = message;
		newAlertElement.classList.add('time-up-alert');
		document.body.appendChild(newAlertElement);
		newAlertElement.style.display = 'block';
	}
}

function restartGame() {
	document.querySelector('#game-screen').style.display = 'none';
	document.querySelector('#game-menu').style.display = 'block';
	document.querySelector('#timer-display').textContent = '00:00';
	const alertElement = document.querySelector('.time-up-alert');
	if(alertElement) {
		alertElement.style.display = 'none';
	}
}