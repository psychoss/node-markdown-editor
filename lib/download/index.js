'use strict';
let links = `https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-animate.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-animate.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-animate.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-aria.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-aria.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-aria.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-cookies.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-cookies.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-cookies.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-csp.css

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-loader.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-loader.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-loader.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-message-format.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-message-format.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-message-format.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-messages.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-messages.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-messages.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-mocks.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-route.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-route.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-route.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-sanitize.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-sanitize.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-sanitize.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-scenario.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-touch.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-touch.min.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-touch.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular.js

https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular.min.js`

var http = require('https');
var fs = require('fs');

links = links.split('\n').filter((v) => {
	if (/\/[a-z\-A-Z0-9]+\.js$/.test(v))
		return v;
})

const download = (url) => {


	let file = fs.createWriteStream(url.substr(url.lastIndexOf('/') + 1));
	http.get(url, function(response) {
		response.pipe(file);
		response.on('end', function() {
			let l = links.pop();
			if (l) {
				download(l)
			}
		})

	}).on('error', function() {
		let l = links.pop();
		if (l) {
			download(l)
		}
	});

}
download(links.pop())