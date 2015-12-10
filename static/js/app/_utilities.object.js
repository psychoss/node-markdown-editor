var $object = (function() {

	var _object = {};

	function clone(obj) {
		if (!obj || typeof obj !== 'object') {
			return obj;
		}
		if (obj instanceof RegExp) {
			return obj;
		}
		var result = (Array.isArray(obj)) ? [] : {};
		Object.keys(obj).forEach(function(key) {
			if (obj[key] && typeof obj[key] === 'object') {
				result[key] = clone(obj[key]);
			} else {
				result[key] = obj[key];
			}
		});
		return result;
	}

	function extend(destination, source) {

		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				destination[key] = source[key];
			}
		}
	}

	_object.extend = extend;
	return _object;

}());