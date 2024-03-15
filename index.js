const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardsWrapper = document.getElementById('cards_wrapper');
const headerWrapper = document.getElementById('header');
const textWrapper = document.getElementById('remaining');
let deckId;

const handleNewDeckClick = () => {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((response) => response.json())
		.then((data) => {
			deckId = data.deck_id;
			textWrapper.textContent = `Available cards: ${data.remaining}`;
		});
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
		return 'Card 1 wins!';
	} else if (card1ValueIndex < card2ValueIndex) {
		return 'Card 2 wins!';
	} else if (card1ValueIndex === card2ValueIndex) {
		return 'War!';
	}
};

const handleDrawClick = () => {
	fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			cardsWrapper.children[0].innerHTML = `
				<img src=${data.cards[0].image} class="card" />
			`;
			cardsWrapper.children[1].innerHTML = `
				<img src=${data.cards[1].image} class="card" />
			`;

			const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
			headerWrapper.textContent = winnerText;
			textWrapper.textContent = `Remaining cards: ${data.remaining}`;
		});
};

newDeckBtn.addEventListener('click', handleNewDeckClick);
drawBtn.addEventListener('click', handleDrawClick);
