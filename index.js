const newDeckBtn = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw');
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
		.then((data) => console.log(data.cards));
};

newDeckBtn.addEventListener('click', handleNewDeckClick);
drawBtn.addEventListener('click', handleDrawClick);
