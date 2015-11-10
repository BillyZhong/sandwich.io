angular.module('sandwichApp').controller('noteController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/note'){
			if($location.search().id != null){
				$window.getNote();
			}
			$scope.n = $window.n;
			$scope.t = $window.t;
		}
	});
}]);