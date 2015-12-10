var $math = (function() {

	var _math = {};

	function isEven(n) {
		return !(n & 1)
	}

	function isEqual(n, m) {
		return !(n ^ m)
	}

	function round(n) {
		return n + .5 | 0;
	}

	function truncate(n) {
		return ~~n;
	}

	return _math;
}());