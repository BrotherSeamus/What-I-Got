app.controller('inventoryCtrl', ['authService', '$scope', '$location',
	function (authService, $scope, $location) {

		$scope.user = authService.getUser();

		this.collections = [
			{
				name: "Camping Gear",
				id: 1770
			},
			{
				name: "Photography",
				id: 1771
			}
		];

		this.categories = [
			{
				name: "Tents",
				id: 2770
			},
			{
				name: "Bags",
				id: 2771
			}
		];

		this.items = [
			{
				name: "Mtn Hardware",
				qty: 1,
				consumable: false,
				briefDesc: "2 man, 3 season tent",
				compDesc: "This is a pretty great tent"
			},
			{
				name: "Wigwam",
				qty: 1,
				consumable: true,
				briefDesc: "5 man, 3 season tent",
				compDesc: "This is a pretty great tent"
			}
		];

	}]);