angular.module('sandwichApp', ['ngRoute','ngTagsInput'])
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider
			.when('/',{
				templateUrl: '/source/views/login.html',
				controller: 'loginController'
			})
			.when('/signup',{
				templateUrl: '/source/views/signup.html',
				controller: 'signupController'
			})
			.when('/forgot',{
				templateUrl: '/source/views/forgot.html',
				controller: 'forgotController'
			})
			.when('/reset',{
				templateUrl: '/source/views/reset.html',
				controller: 'resetController'
			})
			.when('/home',{
				templateUrl: '/source/views/home.html'
			})
			.when('/about',{
				templateUrl: '/source/views/about.html'
			})
			.when('/create',{
				templateUrl: '/source/views/create.html'
			})
			.when('/record',{
				templateUrl: '/source/views/record.html',
				controller: 'recordController'
			})
			.when('/upload',{
				templateUrl: '/source/views/upload.html',
				controller: 'uploadController'
			})
			.when('/mynotes',{
				templateUrl: '/source/views/mynotes.html',
				controller: 'mynotesController'
			})
			.when('/note',{
				templateUrl: '/source/views/note.html',
				controller: 'noteController'
			})
			.otherwise({
				redirectTo: '/'
			})
	$locationProvider.html5Mode(true);
}]);