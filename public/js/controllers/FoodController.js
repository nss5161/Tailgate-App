app.controller('FoodController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  teamsService.then(function(data) {
  	$scope.gameInfo = data[$stateParams.id].team[0];
  	$scope.food = $scope.gameInfo.gameInfo[0].food;
  	setUpFood();
    
    console.log("HOW?!");
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

  	console.log($scope.foodCat);
  }

}]);
