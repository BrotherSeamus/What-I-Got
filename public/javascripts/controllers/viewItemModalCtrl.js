app.controller('ViewItemModalCtrl', function ($scope, $http) {

	$scope.viewItem = {};

	$scope.showItem = false;
	$scope.toggleItem = function(item){
		angular.copy(item, $scope.viewItem);
		$scope.showItem = !$scope.showItem;
	};

	// Update Item
	$scope.updateItem = function() {

		console.log($scope.viewItem);

		$http({
			url: '/inventory/item/',
			method: 'put',
			data: $scope.viewItem
		})
	};

});