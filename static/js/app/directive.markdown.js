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