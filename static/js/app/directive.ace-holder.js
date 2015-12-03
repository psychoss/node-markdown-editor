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