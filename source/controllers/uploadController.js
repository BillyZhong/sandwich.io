angular.module('sandwichApp').controller('uploadController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/upload' ){
			$scope.uploadExtErrorShow = $window.uploadExtStatus;
		}
	});

	$window.getTags = function(){
        return $scope.tags;
   	}
}]);