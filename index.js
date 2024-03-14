const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardsWrapper = document.getElementById('cards_wrapper');
let deckId;

const handleNewDeckClick = () => {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((response) => response.json())
		.then((data) => {
			deckId = data.deck_id;
		});
};

const handleDrawClick = () => {
	fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			const cardsArr = data.cards;

			for (let card of cardsArr) {
				const imgUrl = card.image;
				cardsWrapper.innerHTML += `<img src="${imgUrl}"/>`;
			}
		});
	cardsWrapper.innerHTML = '';
};

newDeckBtn.addEventListener('click', handleNewDeckClick);
drawBtn.addEventListener('click', handleDrawClick);
