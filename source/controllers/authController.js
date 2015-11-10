angular.module('sandwichApp').controller('authController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if(!($location.path()=='/signup' || $location.path()=='/forgot' || $location.path()=='/reset')){
			if($window.verified == null || $window.verified == 0){
				$location.url('/');
			}
		}

		if($location.path()=='/' || $location.path()=='/signup' || $location.path()=='/forgot' || $location.path()=='/reset'){
			$window.document.body.style.backgroundColor = "#1ABC9C";
		}

		if($location.path()=='/home' || $location.path()=='/about' || $location.path()=='/create' || $location.path()=='/record' || $location.path()=='/upload' || $location.path()=='/mynotes' || $location.path()=='/note'){
			$window.document.body.style.backgroundColor = "#FFFFFF";
		}

	});
}]);