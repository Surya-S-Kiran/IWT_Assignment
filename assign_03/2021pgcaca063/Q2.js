const boxes = document.querySelectorAll('.box');
const WINNING_COMBINATIONS = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
	[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
	[0, 4, 8], [2, 4, 6] // diagonals
];
let currentPlayer = 'X';   
let gameEnded = false;      

function handleBoxClick(e) {
	if (gameEnded) return;
	if (e.target.textContent !== '') return;
	e.target.textContent = currentPlayer;
	if (checkWin(currentPlayer)) {
		alert(currentPlayer + ' Won!');
		gameEnded = true;
		return;
	}
	if (checkDraw()) {
		alert('Draw!');
		gameEnded = true;
		return;
	}
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	computerMove();
	if (checkWin('O')) {
		alert('Computer Won!');
		gameEnded = true;
		return;
	}
	if (checkDraw()) {
		alert('Draw!');
		gameEnded = true;
		return;
	}
	currentPlayer = 'X';
}

function checkWin(player) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return boxes[index].textContent === player;
		});
	});
}

function checkDraw() {
	return [...boxes].every(box => {
		return box.textContent !== '';
	});
}

function computerMove() {
	if (gameEnded) return;
	const emptyBoxes = [...boxes].filter(box => {
		return box.textContent === '';
	});
	if (emptyBoxes.length === 0) return;
	const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
	emptyBoxes[randomIndex].textContent = 'O';
}

boxes.forEach(box => {
	box.addEventListener('click', handleBoxClick);
});