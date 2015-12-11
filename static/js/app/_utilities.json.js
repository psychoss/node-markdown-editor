var $json = (function () {
	var _json = {}
	function parse(jsonstring) {
		return new Function('return ' + jsonstring)();
	}
	return _json;
} ());
