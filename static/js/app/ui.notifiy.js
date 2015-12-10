var Notifier = (function() {

	var notifier = {
		template: [
			"		<div>",
			"_",
			"		</div>",

		],
		defaults: {
			style: 'alert-warning',
			duration: 2000,
			offsetTop: 30
		},
		timeout: null,
		showing: 0,
		animationDuration: 500,
		instance: null

	}

	function init() {
		var n = document.createElement('div');
		n.className = "notify"
		notifier.instance = n;
		document.body.appendChild(n);
	}

	function show(message, options) {
		options = options || {};
		if (notifier.showing) {
			hide()
		}
		notifier.showing = 1;
		$object.extend(notifier.defaults, options);


		var n = notifier.instance;
		n.innerHTML = notifier.template.join("\n").fmt(message);

		// var throttle = notifier.defaults.offsetTop;
		// var offset = window.innerHeight - (throttle * 2);
		// var step = Math.ceil(offset / (notifier.animationDuration / 25));
		// $log.d("offset", offset, throttle, step)
		n.setAttribute('type', notifier.defaults.style);
		//n.style.opacity = 0;
		// var animation = function() {
		// 	// if (offset > throttle) {
		// 	// 	offset -= step;
		// 	// 	window.requestAnimationFrame(animation)
		// 	// }
		// 	// n.style.opacity = 1;
		// 	// n.style.top = offset + 'px'

		// 	n.style.top = '300px'
		// }
		// window.requestAnimationFrame(animation)
		//n.style.top = '30px'
		n.classList.add("show");
		// n.addEventListener("animationstart", function() {
		// 	console.log(arguments);
		// }, false);
		clearTimeout(notifier.timeout);
		notifier.timeout = setTimeout(hide, notifier.defaults.duration);
	}

	function hide() {
		clearTimeout(notifier.timeout);
		notifier.instance.classList.remove('show');
		notifier.showing = 0;
	}


	init();

	notifier.show = show;
	return notifier;
}());