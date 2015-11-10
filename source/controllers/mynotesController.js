angular.module('sandwichApp').controller('mynotesController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		if($location.path()=='/mynotes'){
			if($location.search().load=="true"){
				$window.load();
			}
			$scope.lectures = $window.lectures;
			if($scope.lectures.length != 0){
				$scope.showNotes = 0;
			}
			else{
				$scope.showNotes = 1;
			}
		}
	});
}]);