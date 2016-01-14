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

		// Array of Shopping list information
		$scope.shoppingList = [];

		// Array of Project list information
		$scope.projectList = [];

		$scope.newItem= {
			name: "",
			qty: 1,
			consumable: false,
			bDesc: "",
			cDesc: ""
		};

/*---------------Collections--------------*/
		// Get call to server for Collections list
		$scope.getCollections = function() {

			$http({
				url: '/inventory/collection/' + $scope.user.id,
				method: 'get'
			}).then(function (res) {
				$scope.collections = res.data;
			}).then(function () {
				$http({
					url: 'inventory/category/' + $scope.collections[0]._id,
					method: 'get'
				}).then(function (res) {
					$scope.categories = res.data;
					$scope.currentCollection = $scope.collections[0]._id
				}).then(function () {
					$http({
						url: 'inventory/item/' + $scope.categories[0]._id,
						method: 'get'
					}).then(function (res) {
						$scope.items = res.data;
						$scope.currentCategory = $scope.categories[0]._id
					})
				})
			});
		};

		// Post call to server to create New Collection
		$scope.createCollection = function() {

			$http({
				url: '/inventory/collection/' + $scope.user.id,
				method: 'post',
				data: {name: $scope.newCollection}
			}).then(function() {
				$scope.getCollections()
			});

			$scope.newCollection="";

		};

		// Update Collection
		$scope.updateCollection = function() {

		};

		// Delete Collection
		$scope.deleteCollection = function(collId) {

			if(confirm('All Categories and Items associated with this Collection will also be deleted. ' +
					'\n\nDo you wish to continue?')) {
				$http({
					url: 'inventory/collection/' + collId,
					method: 'delete'
				}).then(function() {
					$scope.getCollections();
				})
			}
		};

/*---------------Categories---------------*/
		// Get call to server for Category list
		$scope.getCategories = function(collId) {

			$scope.currentCollection= collId;

			$http({
				url: 'inventory/category/' + collId,
				method: 'get'
			}).then(function(res) {
				$scope.categories= res.data;
			}).then(function() {
				if($scope.categories[0] != undefined) {
					$scope.getItems($scope.categories[0]._id);
					$scope.currentCategory = $scope.categories[0]._id;
				}else{
					$scope.items = [];
				}
			})

		};

		// Post call to server to create New Category
		$scope.createCategory = function() {

			$http({
				url: '/inventory/category/' + $scope.currentCollection,
				method: 'post',
				data: {name: $scope.newCategory}
			}).then(function() {
				$scope.getCategories($scope.currentCollection)
			});

			$scope.newCategory="";

		};

		// Update Category
		$scope.updateCategory= function() {

		};

		// Delete Category
		$scope.deleteCategory = function(catId){

			if(confirm('All Items associated with this Category will also be deleted. ' +
					'\n\nDo you wish to continue?')) {
				$http({
					url: 'inventory/category/' + catId,
					method: 'delete'
				}).then(function() {
					$scope.getCategories($scope.currentCollection);
				})
			}

		};

/*---------------Items---------------*/
		// Get call to server for Items list
		$scope.getItems = function(catId) {

			$scope.currentCategory= catId;

			$http({
				url: 'inventory/item/' + catId,
				method: 'get'
			}).then(function(res) {
				$scope.items = res.data;
			})

		};

		// Post call to server to create New Item
		$scope.createItem = function() {

			$http({
				url: '/inventory/item/' + $scope.currentCategory,
				method: 'post',
				data: $scope.newItem
			}).then(function(res) {
				$scope.getItems($scope.currentCategory)
			});

			$scope.newItem= {
				name: "",
				qty: 1,
				consumable: false,
				bDesc: "",
				cDesc: ""
			};
		};

		// Delete Item
		$scope.deleteItem = function(itemId){

			if(confirm('This Item will be deleted' +
							'\n\nDo you wish to continue?')) {
				$http({
					url: 'inventory/item/' + itemId,
					method: 'delete'
				}).then(function() {
					$scope.getItems($scope.currentCategory);
				})
			}

		};

/*---------------Project List---------------*/

// Get call to server for Project list
$scope.getProjectList = function() {

	$http({
		url: 'lists/project/' + $scope.user.id,
		method: 'get'
	}).then(function(res) {
		$scope.projectList = res.data;
	})



};

// Post call to server to create New Project List Item
$scope.addToProjectList = function(name) {

	$http({
		url: '/lists/project/' + $scope.user.id,
		method: 'post',
		data: {name: name}
	}).then(function() {
		$scope.getProjectList();
	});

};

// Delete Project List Item
$scope.deleteFromProjectList = function(itemId){

	if(confirm('This Item will be deleted from the Project List' +
					'\n\nDo you wish to continue?')) {
		$http({
			url: 'lists/project/' + itemId,
			method: 'delete'
		}).then(function() {
			$scope.getProjectList();
		})
	}
};

/*---------------Shopping List---------------*/

// Get call to server for Shopping list
$scope.getShoppingList = function() {

	$http({
		url: 'lists/shopping/' + $scope.user.id,
		method: 'get'
	}).then(function(res) {
		$scope.shoppingList = res.data;
	})

};

// Post call to server to create New Shopping List Item
$scope.addToShoppingList = function(name) {

	$http({
		url: '/lists/shopping/' + $scope.user.id,
		method: 'post',
		data: {name: name}
	}).then(function() {
		$scope.getShoppingList();
	});
};

// Delete Shopping List Item
$scope.deleteFromShoppingList = function(itemId){

	if(confirm('This Item will be deleted from the Shopping List' +
					'\n\nDo you wish to continue?')) {
		$http({
			url: 'lists/shopping/' + itemId,
			method: 'delete'
		}).then(function() {
			$scope.getShoppingList();
		})
	}
};

	// Initial call to populate data on user Inventory view
	$scope.getCollections();

	// Initial call to populate Shopping List
	$scope.getShoppingList();

	// Initial call to populate Project List
	$scope.getProjectList();

}]);