app.controller('ThemeController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  teamsService.then(function(data) {
  	$scope.theme = data[$stateParams.id].team[0].gameInfo[2].theme[0];
  	setUpTheme();
  }, function(error) {
    console.log("Seems to be an error in the Tickets Controller");
  });

  function setUpTheme(){
  	$scope.supplies = $scope.theme.supplies;
  	$scope.suppItem = new Object();

	$scope.selected = undefined;

  	$timeout(function() {

      var h = $(".theme-row").height();
      $(".theme-desc").height(h);

      $scope.titleWidth = $(".theme-title").width();

  		$scope.addSupplies = function(){
  			if ($scope.suppItem != undefined) {
	          $scope.supplies.push($scope.suppItem);
	          $scope.suppItem = new Object();
	        }
  		};

  		$scope.dumpItem = function(sup){
  			$scope.supplies.splice($scope.supplies.indexOf(sup),1);
  		};
  	}, 200);
  }

}]);