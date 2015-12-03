var app = angular.module('app', []);




app.controller('MainController', ['$scope', function($scope) {
	$scope.content="";
	$scope.$watch($scope.content,function(){
		console.log(arguments);
	})
	$scope.show = function() {
	}
}])



app.directive('aceHolder', ['$animate', '$document', function($animate, $document) {
	return {
		restrict: 'A',
		link: function(scope, e, attrs) {
			scope.editor = ace.edit(e[0]);
			scope.editor.on('change', function() {
				scope.$apply(function() {
					scope.$parent.content = scope.editor.getValue();
					console.log(scope.$parent);
				})
			})
		}
	}
}])


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


app.directive('focusEffect', function($animate, $document) {
	return {
		restrict: 'A',
		link: function(scope, e, attrs) {
			e.on('focus', function() {
				e.parent().addClass('shadow-inner ')
			})
			e.on('blur',function(){
				e.parent().removeClass('shadow-inner ')
			})
		}
	}
})


app.directive('markdown', ['$animate', '$document', function($animate, $document) {
	return {
		restrict: 'A',
		scope: {
			markdown: "=markdown"
		},
		link: function(s, e, attrs) {
			console.log(s.content);
			s.$watch(s.content, function() {
				console.log(s.markdown);
			})
		}
	}
}])


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


