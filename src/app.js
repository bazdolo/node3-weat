const path = require('path');
const express = require('express');
hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'barry'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'about me',
		name: 'barry'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'help',
		message: 'this is some helpful text',
		name: 'barry'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
	// res.send({
	// 	location: 'England',
	// 	forecast: '25 degress outside',
	// 	address: req.query.address
	// });
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'cannot find help page'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'error page not found'
	});
});

app.listen(3000, () => {
	console.log('server is up on port 3000');
});
