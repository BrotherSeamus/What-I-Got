var app = angular.module('gotApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function ($routeProvider, $locationProvider, $httpProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'registerCtrl'
		}).
		when('/inventory', {
			templateUrl: 'private/views/inventory.html'
		}).
		otherwise({
			redirectTo: '/login'
		});

		$httpProvider.interceptors.push('authInterceptor');
	}]);


