app.factory('weatherIconService', ['$http', function($http) {

  return $http.get('http://localhost:8080/js/JSON/weatherIcons.json')
    .then(function(res) {
      var data = res.data;
      return data;
    }, function(res) {
      console.log('There was an error');
    });
}]);
