const gameBoard = document.querySelector('#game-board');
const easyMaps = [
	[
		['empty', 'mountain-90', 'empty', 'empty', 'oasis'],
		['empty', 'empty', 'empty', 'bridge', 'oasis'],
		['bridge', 'empty', 'mountain-180', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'oasis', 'empty'],
		['empty', 'empty', 'mountain-270', 'empty', 'empty']
	],
	[
		['oasis', 'empty', 'bridge-90', 'empty', 'empty'],
		['empty', 'mountain-180', 'empty', 'empty', 'mountain-180'],
		['bridge', 'oasis', 'mountain-270', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'oasis', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty']
	],
	[
		['empty', 'empty', 'bridge-90', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bridge'],
		['empty', 'mountain-180', 'bridge', 'empty', 'empty'],
		['empty', 'oasis', 'empty', 'empty', 'empty'],
		['empty', 'bridge-90', 'empty', 'empty', 'mountain-180']
	],
	[
		['empty', 'empty', 'empty', 'bridge-90', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty'],
		['bridge', 'empty', 'mountain-90', 'empty', 'mountain-90'],
		['empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'oasis', 'mountain-270', 'empty']
	],
	[
		['empty', 'empty', 'bridge-90', 'empty', 'empty'],
		['empty', 'mountain', 'empty', 'empty', 'empty'],
		['bridge', 'empty', 'empty', 'mountain-270', 'empty'],
		['empty', 'empty', 'bridge', 'oasis', 'empty'],
		['empty', 'mountain-180', 'empty', 'empty', 'empty']
	],
];
const hardMaps = [
	[
		['empty', 'mountain-90', 'oasis', 'oasis', 'empty', 'bridge-90', 'empty'],
		['bridge', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'bridge', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'mountain-270', 'empty', 'empty', 'empty'],
		['mountain-270', 'empty', 'mountain-90', 'empty', 'bridge-90', 'empty', 'oasis'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'bridge-90', 'empty', 'empty', 'empty']
	],
	[
		['empty', 'empty', 'oasis', 'empty', 'empty', 'empty', 'empty'],
		['bridge', 'empty', 'bridge-90', 'empty', 'empty', 'mountain-180', 'empty'],
		['empty', 'empty', 'bridge-90', 'empty', 'empty', 'empty', 'bridge'],
		['mountain', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'oasis', 'empty', 'mountain-90', 'empty', 'empty', 'empty'],
		['empty', 'mountain', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'oasis', 'empty', 'empty', 'empty', 'empty']
	],
	[
		['empty', 'empty', 'bridge-90', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'bridge'],
		['oasis', 'empty', 'mountain-270', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'oasis', 'mountain-270', 'empty', 'bridge-90', 'empty', 'empty'],
		['bridge', 'empty', 'empty', 'empty', 'empty', 'mountain-90', 'empty'],
		['empty', 'empty', 'oasis', 'mountain-270', 'empty', 'empty', 'empty']
	],
	[
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'bridge', 'empty', 'mountain-180', 'empty'],
		['empty', 'empty', 'mountain-270', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'bridge-90', 'empty', 'oasis', 'empty', 'bridge-90', 'empty'],
		['empty', 'empty', 'mountain-180', 'empty', 'mountain-90', 'empty', 'empty'],
		['bridge', 'empty', 'empty', 'empty', 'empty', 'mountain-270', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
	],
	[
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'mountain', 'empty'],
		['empty', 'bridge-90', 'bridge-90', 'empty', 'mountain-90', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'mountain', 'empty', 'oasis', 'empty', 'empty'],
		['empty', 'mountain-180', 'empty', 'bridge', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
	],
];

function getRandomMap(difficulty) {
	if(difficulty === 'easy') {
		const randomIndex = Math.floor(Math.random() * easyMaps.length);
		return easyMaps[randomIndex];
	} else if(difficulty === 'hard') {
		const randomIndex = Math.floor(Math.random() * hardMaps.length);
		return hardMaps[randomIndex];
	}
}

function renderMap(map) {
	gameBoard.innerHTML = '';
	const gridSize = map.length;
	gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
	map.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			const cellElement = document.createElement('div');
			cellElement.classList.add('cell');
			cellElement.dataset.row = rowIndex;
			cellElement.dataset.col = colIndex;
			cellElement.dataset.rotation = 0;
			cellElement.dataset.type = cell.split('-')[0];
			const tileData = getTileImage(cell);
			const tileImg = document.createElement('img');
			tileImg.src = tileData.imageUrl;
			tileImg.classList.add('tile-image');
			tileImg.style.transform = `rotate(${tileData.rotation}deg)`;
			cellElement.appendChild(tileImg);
			cellElement.addEventListener('mousedown', (event) => handleTileClick(event, cellElement));
			gameBoard.appendChild(cellElement);
		});
	});
}

function getTileImage(tile) {
	let baseTile = tile.split('-')[0];
	let rotation = tile.split('-')[1] || '0';
	let imageUrl;
	switch (baseTile) {
		case 'bridge':
			imageUrl = 'pics/tiles/bridge.png';
			break;
		case 'bridge-90':
			imageUrl = 'pics/tiles/bridge_90.png'
			break;
		case 'mountain':
			imageUrl = 'pics/tiles/mountain.png';
			break;
		case 'mountain-90':
			imageUrl = 'pics/tiles/mountain_90.png';
			break;
		case 'mountain-180':
			imageUrl = 'pics/tiles/mountain_180.png';
			break;
		case 'mountain-270':
			imageUrl = 'pics/tiles/mountain_270.png';
			break;
		case 'oasis':
			imageUrl = 'pics/tiles/oasis.png';
			break;
		default:
			imageUrl = 'pics/tiles/empty.png';
	}
	return {
		imageUrl,
		rotation
	};
}

function handleTileClick(event, cell) {
	event.preventDefault();
	const cellType = cell.dataset.type;
	const rotation = parseInt(cell.dataset.rotation);
	if(cellType === 'oasis') {
		showOasisAlert("You can't place railway onto Oasis!");
		return;
	}
	if(event.button === 0) {
		let trackType = '';
		let trackRotation = rotation;
		if(cellType === 'bridge') {
			trackType = 'bridge_rail';
			trackRotation = rotation;
		} else if(cellType === 'mountain') {
			trackType = 'mountain_rail';
			trackRotation = rotation;
		} else if(cellType === 'empty') {
			trackType = cell.dataset.trackType === 'straight_rail' ? 'curve_rail' : 'straight_rail';
			cell.dataset.trackType = trackType;
		}
		const tileImg = cell.querySelector('.tile-image');
		if(tileImg) {
			tileImg.src = `pics/tiles/${trackType}.png`;
		}
	} else if(event.button === 2 && cellType === 'empty') {
		const track = cell.querySelector('.tile-image');
		if(track) {
			const newRotation = (parseInt(cell.dataset.rotation) + 90) % 360;
			cell.dataset.rotation = newRotation;
			track.style.transform = `rotate(${newRotation}deg)`;
		}
	}
}
gameBoard.addEventListener('contextmenu', (event) => event.preventDefault());

function checkSolution(cells, startTime) {
    for (const cell of cells) {
        const { type } = cell.dataset;
        if (type === 'oasis') continue;
        const img = cell.querySelector('.tile-image');
        if (!img || !img.src.includes('rail')) {
            showOasisAlert('The solution is incorrect. Try again!');
            return false;
        }
    }

    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    clearInterval(timer);
    onGameWin(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    return true;
}


function startGame(difficulty) {
    const selectedMap = getRandomMap(difficulty === "5x5" ? "easy" : "hard");
    renderMap(selectedMap);

    const gameStartTime = Date.now();
    startTimer(difficulty === "7x7" ? 1200 : 600, () => showTimerAlert("Time's up!", "error"));

    const cells = Array.from(document.querySelectorAll(".cell"));

    document.querySelector("#check-solution").addEventListener("click", () => {
        checkSolution(cells, gameStartTime);
    });
}

function onGameWin(timeTaken) {
    const winMessage = document.createElement("div");
    winMessage.classList.add("win-message");
    winMessage.innerHTML = `
        <p>Congratulations! Puzzle solved in <strong>${timeTaken}</strong>.</p>
    `;
    document.querySelector("#game-screen").appendChild(winMessage);
    document.querySelector("#restart-game").style.display = "block";
}