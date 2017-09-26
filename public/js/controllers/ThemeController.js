app.controller('ThemeController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, teamsService, $rootScope, $timeout, $http, $state) {
  
  $http.get('http://localhost:8080/api/teams').then(function(res) {
      var data = res.data;
      $scope.themeData = data[$stateParams.id];
      $scope.theme = data[$stateParams.id].theme[0];
      setUpTheme();
    }, function(res){
      console.log('There was an error');
    });

  /*
  teamsService.then(function(data) {
    $scope.themeData = data[$stateParams.id];
  	$scope.theme = data[$stateParams.id].theme;
  	setUpTheme();
  }, function(error) {
    console.log("Seems to be an error in the Tickets Controller");
  });
  */
  function setUpTheme(){
  	$scope.supplies = $scope.theme.supplies;
  	$scope.suppItem = new Object();

	 $scope.selected = undefined;

  	$timeout(function() {

      var h = $(".theme-row").height();
      $(".theme-desc").height(h);
      $scope.titleWidth = $(".theme-title").width();

      var item_ID = $scope.themeData._id;
      var urlT = "/api/theme/supplies/update/"+item_ID;

      $scope.newItem = new Object();
      $scope.selected = undefined;

  		$scope.addSupplies = function(){
        var dataT = $scope.suppItem;
        console.log(item_ID);
          
        $http.put(urlT, dataT).then(function(res) {
          $scope.suppItem = new Object();
          $state.reload();
        }, function(error) {
          console.log(error);
        });
  		};

  		$scope.dumpItem = function(sup){
  			$http.delete('/api/theme/delete/'+item_ID+'/'+sup._id)
          .then(function(res){
            console.log("Item Removed!");
            $state.reload();
          }, function (error){
            console.log("~~ERROR~~"+error);
          });
  		};
  	}, 200);
  }

}]);