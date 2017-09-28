app.controller('FoodListController', ['$scope', '$stateParams', 'teamsService', '$timeout', '$http', '$state', function($scope, $stateParams, teamsService, $timeout, $http, $state) {
	
	$http.get('http://localhost:8080/api/teams').then(function(res) {
		var data = res.data;
		$scope.foodTeam = data[$stateParams.id];
		$scope.foodStuff = data[$stateParams.id].food;
		$scope.foodCat = $stateParams.type;
		console.log($scope.foodTeam);
		console.log($scope.foodStuff);
		console.log($scope.foodCat);
		setUpFoodList();
    }, function(res){
		console.log('There was an error');
    });

    /*
	teamsService.then(function(data) {
		$scope.foodTeam = data[$stateParams.id];
		$scope.foodStuff = data[$stateParams.id].food;
		$scope.foodCat = $stateParams.type;
		setUpFoodList();
	}, function(error) {
		console.log("Seems to be an error in the gameNav.js files");
	});
	*/

	function setUpFoodList() {
	    $timeout(function() {
	      var item_ID = $scope.foodTeam._id;
	      var urlF = "/api/food/update/"+item_ID;

	      $scope.newItem = new Object();
	      $scope.selected = undefined;

	      $scope.addFoodItem = function() {
	      	$scope.newItem.type = $scope.foodCat;
	      	var dataF = $scope.newItem;

			$http.put(urlF, dataF).then(function(res) {
				$scope.newItem = new Object();
				$state.reload();
			}, function(error) {
				console.log(error);
			});
	      }
	      
	      $scope.deleteFoodItem = function(key) {
	        $http.delete('/api/food/delete/'+item_ID+'/'+key._id)
	        .then(function(res){
	        	console.log("Item Removed!");
	        	$state.reload();
	        }, function (error){
	        	console.log("~~ERROR~~"+error);
	        });
	      }

	    }, 200);
  };
}]);