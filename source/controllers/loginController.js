angular.module('sandwichApp').controller('loginController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if(($window.verified == null || $window.verified == 0)&&($window.loggedIn == 1)){
			$scope.show = true;
		}
	});
}]);