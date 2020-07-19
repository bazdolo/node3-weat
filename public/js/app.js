const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const mesageOne = document.querySelector('#message-1');
const mesageTwo = document.querySelector('#message-2');
// mesageOne.textContent = 'From javascript';

weatherform.addEventListener('submit', (e) => {
	mesageOne.textContent = '';
	mesageTwo.textContent = 'Loading...';

	e.preventDefault();
	const location = search.value;
	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log('there was an error, please try a different address');
				mesageTwo.textContent = '';
				mesageTwo.textContent = 'there was an error, please try a different address';
			} else {
				console.log(data.location);
				console.log(data.forecast);
				mesageOne.textContent = data.location;
				mesageTwo.textContent = data.forecast;
			}
		});
	});
});
