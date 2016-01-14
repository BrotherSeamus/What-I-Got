app.controller('ViewItemModalCtrl', function ($scope, $http) {

	$scope.viewItem = {};

	$scope.showItem = false;
	$scope.toggleItem = function(item){
		angular.copy(item, $scope.viewItem);
		$scope.showItem = !$scope.showItem;
	};
	$scope.closeItem = function(){
		$scope.showItem = !$scope.showItem;
	};

	// Update Item
	$scope.updateItem = function() {

		$http({
			url: '/inventory/item/',
			method: 'put',
			data: $scope.viewItem
		}).then(function(){
			$scope.getItems($scope.currentCategory);
		})
	};

});