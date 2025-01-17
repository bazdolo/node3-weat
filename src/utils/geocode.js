const request = require('postman-request')

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoiYmF6emVyaW5vMTIzIiwiYSI6ImNrYWpzcTE2YjBkd2IyenRkNGZ1bDJiM3AifQ.zfdId-py7SIfMzlBlKF5oA&limit=1'

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to locations services')
		} else if (body.features.length === 0) {
			callback('unable to find location try another search', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode
