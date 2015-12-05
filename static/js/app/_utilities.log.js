var $log = (function() {
	var l = {}

	function d() {
		console.log("Debug: ", arguments);
	}
	function e(){
		console.error("Error:",arguments);
	}
	l.d = d;
	return l;
}());