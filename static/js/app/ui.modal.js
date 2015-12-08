var $Modal = (function() {

	function Modal(ele) {
		if (!ele) return;
		this.ele = ele;

		this.init()
	}
	Modal.prototype.CONST = {
		DURATION: 500,
		status: 0
	}
	Modal.prototype.init = function() {
		this.close = this.ele.querySelector('.btn-close');

		this.close.addEventListener('click', this.hide.bind(this))

	}
	Modal.prototype.hide = function() {
		var this_ = this;
		this.CONST.status = 0;
		this.animate({
			easing: TWEEN.Easing.Quadratic.Out,
			duration: 450,
			mapFrom: {
				top: 50
			},
			mapTo: {
				top: -this_.ele.clientHeight * 1.2
			},
			onupdate: function() {
				this_.ele.style.top = this.top + "px"
			}
		})
	}
	Modal.prototype.show = function() {

		var this_ = this;
		if (this.CONST.status) {
			return;
		}
		this.CONST.status = 1;
		this.animate({
			easing: TWEEN.Easing.Quadratic.In,
			duration: 450,
			mapFrom: {
				top: -this_.ele.clientHeight * 1.2
			},
			mapTo: {
				top: 50
			},
			onupdate: function() {
				this_.ele.style.top = this.top + "px"
			}
		})
	}
	Modal.prototype.animate = function(animateDatas) {

		var duration = animateDatas.duration || this.CONST.DURATION;
		var easing = animateDatas.easing || TWEEN.Easing.Linear.None;

		var onComplete = animateDatas.oncomplete || function() {
			TWEEN.removeAll();
		}
		var tween = new TWEEN.Tween(animateDatas.mapFrom)
			.to(animateDatas.mapTo, duration)
			.onUpdate(animateDatas.onupdate)
			.onComplete(onComplete)
			.easing(easing)
			.start();

		requestAnimationFrame(animate);

		function animate(time) {
			requestAnimationFrame(animate);
			TWEEN.update(time);
		}
	}
	Modal.prototype.find = function(selector) {
		return this.ele.querySelector(selector);
	}
	return Modal;
}());