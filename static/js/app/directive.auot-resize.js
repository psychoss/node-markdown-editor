app.directive('autoResize', ['$document', function($document) {
	return {
		restrict: 'A',
		link: function(scope, e, attrs) {
			var resize = function() {
				var ot = attrs.offsetTop || 0;
				var ob = attrs.offsetBottom || 0;
				var gutter=attrs.gutter||0;
				e.css('margin-top', ot + 'px');
				e.css('height', (window.innerHeight - parseInt(ot, 10) - parseInt(ob, 10)) + 'px');
				if (attrs.half) {
					e.css('width', (window.innerWidth / 2-parseInt(gutter, 10)) + 'px');
				}
			}
			window.addEventListener('resize', resize);
			resize();
		}
	}
}])