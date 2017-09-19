app.controller('FoodListController', ['$scope', '$stateParams', 'teamsService', '$timeout', function($scope, $stateParams, teamsService, $timeout) {
	teamsService.then(function(data) {
		$scope.foodStuff = data[$stateParams.id].food;
		$scope.foodCat = $stateParams.type;\
		
		setUpFoodList();
	}, function(error) {
		console.log("Seems to be an error in the gameNav.js files");
	});

	function setUpFoodList() {
	    $timeout(function() {
	      $scope.newItem = new Object();

	      $scope.selected = undefined;

	      $scope.addFoodItem = function() {
	        if ($scope.newItem != undefined) {
	          $scope.newItem.type = $scope.foodCat;
	          $scope.foodStuff.push($scope.newItem);
	          $scope.newItem = new Object();
	        }
	      }
	      $scope.deleteFoodItem = function(key) {
	        /*
	        if (JSON.stringify($scope.foodStuff[index]) === JSON.stringify($scope.selected)) {
	          $scope.selected = undefined;
	        }*/
	        $scope.foodStuff.splice($scope.foodStuff.indexOf(key),1);
	      }
	    }, 200);
  };
}]);