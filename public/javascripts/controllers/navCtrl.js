app.controller('navCtrl', ['authService', '$scope', '$location',
	function (authService, $scope, $location) {

		$scope.user = authService.getUser();

		authService.observeUser().then(null, null, function (user) {
			$scope.user = user;
		});

		$scope.logout = function () {
			authService.logout();
			$location.path('/');
		};
	}]);