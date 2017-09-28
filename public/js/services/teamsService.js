
app.factory('teamsService', ['$http', function($http) {
  return $http.get('http://localhost:8080/api/teams')
    .then(function(res) {
      var data = res.data;
      console.log(data);
      return data;
    }, function(res){
      console.log('There was an error');
    });
}]);