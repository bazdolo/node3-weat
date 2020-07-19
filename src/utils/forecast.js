const request = require('postman-request')

const forecast = (lattitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=cf89bbdc37b10cb7e2d6dcf6c112c7b8&query=' +
		lattitude +
		',' +
		longitude +
		'&units=m'

	request({ url, json: true }, (error, { body }) => {
		// console.log(response.body.current)
		if (error) {
			callback('unable to connect to weather service', undefined)
		} else if (body.error) {
			console.log('unable to find location', undefined)
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is currently ' +
					body.current.temperature +
					' degrees out. It feels like ' +
					body.current.feelslike +
					' degrees out'
			)
		}
	})
}

module.exports = forecast
