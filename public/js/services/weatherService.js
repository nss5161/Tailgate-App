app.factory('weatherService', ['$http', function($http) {
  var sc = "statecollege";
  var p = "philadelphia";
  return $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + sc + '%2C%20pa%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys%22')
    .then(function(res) {
      var data = res.data;
      return data;
    }, function(res) {
      console.log('There was an error');
    });
}]);
