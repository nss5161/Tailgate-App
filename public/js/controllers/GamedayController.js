app.controller('GamedayController', ['$scope', '$stateParams', 'teamsService', function($scope, $stateParams, teamsService) {
  teamsService.then(function(data) {
  	$scope.detail = data[$stateParams.id].team[0];
    console.log("this controller works on this route");
  }, function(error) {
    console.log("Seems to be an error in the gameNav.js files");
  });
}]);
