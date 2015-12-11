var $ajax = (function() {
	var _ajax = {
		defaluts: {
			method: 'POST'
		}

	};

	function fetch(url, options) {
		options = options || {};
		$object.extend(_ajax.defaluts, options);
		return new Promise(function(resolve, reject) {


			var request = new XMLHttpRequest();
			console.log(_ajax.defaluts.method);
			request.open(_ajax.defaluts.method, url, true);
			request.onload = onload;
			request.onerror = onerror;
			//request.onprogress = onprogress;
			var data = _ajax.defaluts.data || '';
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

			// function onprogress(event) {
			// 	notify(event.loaded / event.total);
			// }
		});
	}

	function html(url) {
		return fetch(url, {
			method: 'GET'
		})
	}

	_ajax.fetch = fetch;
	_ajax.html = html;
	return _ajax;
}());