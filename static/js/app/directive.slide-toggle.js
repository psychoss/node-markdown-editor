app.directive('slideToggle', ['$animate', '$document', function($animate, $document) {
	return {
		restrict: 'A',
		link: function(scope, e, attrs) {
			if (attrs.slideToggle) {

				e.slide = angular.element(document.querySelector(attrs.slideToggle));
				var rts = document.querySelector('.header-fixed').getBoundingClientRect();
				var top= rts.height + rts.top;
	  
				e.slide.css('max-height',( $document[0].body.clientHeight-top-10)+'px')
				e.slide.css('top',top+ 'px');
				e.on('click', function(ev) {
					ev.stopImmediatePropagation();
					e.slide.toggleClass('is-active');
				})
				$document.on('click', function() {
					e.slide.removeClass('is-active');
					})
					// attrs.$observe('active', function(v) {
					// 	v ? $animate.addClass(e, 'on') : $animate.removeClass(e, 'on');
					// })
			}
		}
	}
}])