var $log = (function() {
	var l = {}
	l.turnoff = 1;

	function d() {
		if (l.turnoff ^ 0)
			console.trace(" Debug: ", arguments);
	}

	function e() {
		if (l.turnoff ^ 0)
			console.error("Error:", arguments);
	}
	l.d = d;
	return l;
}());