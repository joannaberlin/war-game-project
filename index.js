let deckId;
let computerScore = 0;
let myScore = 0;
const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardsWrapper = document.getElementById('cards_wrapper');
const headerWrapper = document.getElementById('header');
const textWrapper = document.getElementById('remaining');
const computerScoreEl = document.getElementById('computer-score');
const myScoreEl = document.getElementById('my-score');

const handleNewDeckClick = () => {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((response) => response.json())
		.then((data) => {
			deckId = data.deck_id;
			textWrapper.textContent = `Available cards: ${data.remaining}`;
		});

	drawBtn.disabled = false;
};

const determineCardWinner = (card1, card2) => {
	const values = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'JACK',
		'QUEEN',
		'KING',
		'ACE',
	];
	const card1ValueIndex = values.indexOf(card1.value);
	const card2ValueIndex = values.indexOf(card2.value);

	if (card1ValueIndex > card2ValueIndex) {
		computerScore++;
		computerScoreEl.textContent = `Computer score is: ${computerScore}`;
		return 'Computer wins!';
	} else if (card1ValueIndex < card2ValueIndex) {
		myScore++;
		myScoreEl.textContent = `My score is: ${myScore}`;
		return 'You win!';
	} else if (card1ValueIndex === card2ValueIndex) {
		return 'War!';
	}
};

const determineGameWinner = (scoreYou, scoreComp) => {
	if (scoreYou > scoreComp) {
		return 'You won the game!';
	} else if (scoreYou < scoreComp) {
		return 'Computer won the game!';
	} else {
		return `It's a tie!`;
	}
};

const handleDrawClick = () => {
	fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			cardsWrapper.children[0].innerHTML = `
				<img src=${data.cards[0].image} class="card" />
			`;
			cardsWrapper.children[1].innerHTML = `
				<img src=${data.cards[1].image} class="card" />
			`;

			const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
			headerWrapper.textContent = winnerText;
			textWrapper.textContent = `Remaining cards: ${data.remaining}`;

			if (data.remaining === 0) {
				const finalText = determineGameWinner(myScore, computerScore);
				drawBtn.disabled = true;
				headerWrapper.textContent = finalText;
			}
		});
};

newDeckBtn.addEventListener('click', handleNewDeckClick);
drawBtn.addEventListener('click', handleDrawClick);
