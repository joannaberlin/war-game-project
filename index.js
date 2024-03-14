const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
const cardsWrapper = document.getElementById('cards_wrapper');
let deckId;
//https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
const handleNewDeckClick = () => {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			deckId = data.deck_id;
			console.log(deckId);
		});
};

const handleDrawClick = () => {
	fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const cardsArr = data.cards;
			console.log(cardsArr);

			for (let card of cardsArr) {
				const imgUrl = card.image;
				console.log(imgUrl);
				cardsWrapper.innerHTML += `<img src="${imgUrl}"/>`;
			}
		});
	cardsWrapper.innerHTML = '';
};

newDeckBtn.addEventListener('click', handleNewDeckClick);
drawBtn.addEventListener('click', handleDrawClick);
