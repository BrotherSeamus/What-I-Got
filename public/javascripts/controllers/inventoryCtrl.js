app.controller('inventoryCtrl', ['authService', '$scope', '$location', '$http',
	function (authService, $scope, $location, $http) {

		// Pulls in user info for use in scope
		$scope.user = authService.getUser();

		// Array of collection information
		$scope.collections = [];

		// Array of Category information
		$scope.categories = [];

		// Array of Item information
		$scope.items = [];

		$http({
			url: '/inventory/collection/' + $scope.user.id,
			method: 'get'
		}).then(function(res) {
			$scope.collections = res.data;
		});

/*---------------Collections--------------*/
		// Get call to server for Collections list
		$scope.getCollections = function(){

			console.log($scope.user.id);

			$http({
				url: '/inventory/collection/' + $scope.user.id,
				method: 'get'
			}).then(function(res) {
				$scope.collections = res.data;
			});

		};

		// Post call to server to create New Collection
		this.createCollection = function() {

		};

		// Update Collection
		this.updateCollection = function() {

		};

		// Delete Collection
		this.deleteCollection = function(){

		};

/*---------------Categories---------------*/
		// Get call to server for Category list
		$scope.getCategories = function(collId) {

			console.log('fuck this');

			$http({
				url: 'inventory/category/' + collId,
				method: 'get'
			}).then(function(res) {
				$scope.categories = res.data;
				console.log(res.data);
			})

		};

		// Post call to server to create New Category
		this.createCategory = function() {

		};

		// Update Category
		this.updateCategory= function() {

		};

		// Delete Category
		this.deleteCategory = function(){

		};

/*---------------Items---------------*/
		// Get call to server for Items list
		this.getItems = function() {

		};

		// Post call to server to create New Item
		this.createItem = function() {

		};

		// Update Item
		this.updateItem = function() {

		};

		// Delete Item
		this.deleteItem = function(){

		};
	}]);