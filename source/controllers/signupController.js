angular.module('sandwichApp').controller('signupController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/signup'){
			$scope.confirmShow = !$window.confirm;
			$scope.nameShow = $window.nameStatus;
			$scope.mailShow = $window.mailStatus;
			$scope.success = $window.success;
			$scope.emptyShow = !$window.emptyStatus;
		}
	});
}]);