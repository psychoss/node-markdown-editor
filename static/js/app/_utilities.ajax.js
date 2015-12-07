var ajax = (function() {
	var j = {
		defaluts: {
			method: 'POST'
		}

	};

	function fetch(url, options) {
		options = options || {};
		extend(options, j.defaluts);
		return Q.Promise(function(resolve, reject, notify) {


			var request = new XMLHttpRequest();

			request.open(options.method, url, true);
			request.onload = onload;
			request.onerror = onerror;
			request.onprogress = onprogress;
			var data = options.data || '';
			request.send(data);

			function onload() {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(new Error("Status code was " + request.status));
				}
			}

			function onerror() {
				reject(new Error("Can't XHR " + JSON.stringify(url)));
			}

			function onprogress(event) {
				notify(event.loaded / event.total);
			}
		});
	}
	j.fetch = fetch;
	return j;
}());


;
(function() {

	function Ajax() {

	}
	Ajax.prototype.CONST = {
		method: 'POST',
		headers: new Headers
	}

	Ajax.prototype.request = function(url, options) {
		options = options || {};
		options.method = options.method || this.CONST.method;
		options.body = options.body || "";

		console.log(options.body);
		var r = new Request(url);

		return fetch(r, {
			method: options.method,
			body: options.body
		})

	}

	window.$ajax = new Ajax();
}());