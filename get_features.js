const https = require('https');

modules.exports = function(options) {
	return function(req, res, next) {
		//the passed object should define a start point.
		//if not, use a default
		if(!options.song) {
			options.song = "7rSERmjAT38lC5QhJ8hnQc";
			//this is the song id for "Shipping Up to Boston" <3
		} 
		
		if(!options.key) {
			throw "You must pass the API key to the function";	
		}
		
		url = {
			host: "api.spotify.com",
			path: "/v1/audio-features",
			method: "GET",
			headers: {
				"Authorization" : `Bearer #{options.key}`
			},
		}

		const request = https.request(url, function(response) {
			var body = "";

			response.on('data', function(chunk) {
				output += chunk
			});

			response.on('end', function() {
				var obj = JSON.parse(body);
				console.dir(obj);
			});
		});
		
		request.end();
		
		next();
	}
}
