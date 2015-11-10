angular.module('sandwichApp').controller('forgotController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/forgot'){
			$scope.showSent = $window.emailSent;
			$scope.showError = $window.emailError;
		}
	});
}]);