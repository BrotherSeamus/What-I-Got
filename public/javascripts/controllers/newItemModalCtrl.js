app.controller('NewItemModalCtrl', function ($scope) {

	$scope.showNewItem = false;
	$scope.toggleNewItem = function(){
		$scope.showNewItem = !$scope.showNewItem;
	};
});