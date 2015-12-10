var $array = (function() {

	var _array = {};

	function coalesce(array) {
		if (!array) {
			return array;
		}
		return array.filter(function(e) {
			return !!e
		});
	}

	function fill(length, element) {
		var result = []
		while (length-- > 0) {
			result.push(element);
		}
		return result;
	}

	_array.slice = [].slice;
	return _array;
}());