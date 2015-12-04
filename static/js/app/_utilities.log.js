var $log = (function() {
	var l = {}

	function d() {
		console.log("Debug: ", arguments);
	}
	l.d = d;
	return l;
}());