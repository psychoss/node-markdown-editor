app.controller('MainController', ['$scope', function($scope) {
	$scope.content="";
	$scope.$watch($scope.content,function(){
		console.log(arguments);
	})
	$scope.show = function() {
	}
}])
