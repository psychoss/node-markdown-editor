var $animation = (function() {

	var _ = {

	};

	function animate(ele, keyframe, duration) {
		if ('animate' in ele) {
			ele.animate(keyframe, duration);
		}
	}

	_.animate = animate;
	return _;


}());

