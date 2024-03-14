const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((response) => response.json())
		.then((data) => console.log(data));
});
