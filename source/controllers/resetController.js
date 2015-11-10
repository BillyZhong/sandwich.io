angular.module('sandwichApp').controller('resetController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/reset' ){
			$scope.setStatus = $window.setStatus;
			$scope.resetConfirm = $window.resetConfirm;
			$scope.resetEmpty = $window.resetEmpty;
		}
	});
}]);