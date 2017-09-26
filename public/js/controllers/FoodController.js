app.controller('FoodController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  teamsService.then(function(data) {
  	$scope.gameInfo = data[$stateParams.id];
  	$scope.food = $scope.food;
  	setUpFood();
  }, function(error) {
    console.log("Seems to be an error in the gameNav.js files");
  });

  function setUpFood(){
  	$scope.foodTypes = [
  		{name: 'Main Dishes'},
  		{name: 'Sides'},
  		{name: 'Snacks'},
  		{name: 'Desserts'},
  		{name: 'Breakfast'},
  		{name: 'ENFI/Other'},
  	];
  }

}]);
