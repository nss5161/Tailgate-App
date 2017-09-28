app.controller('MainController', ['$scope', 'weatherService', function($scope, weatherService) {

  weatherService.then(function(data) {
    $scope.weather = data.query.results.channel.item.forecast;
    setUpWeather();
  }, function(error) {
    console.log("There was an error: "+error);
  });

  function setUpWeather() {

    for (var key in $scope.weather) {
      if ($scope.weather.hasOwnProperty(key)) {
        if($scope.weather[key]['text'].includes('Sun')){
          $scope.weather[key]['img'] = '../img/weather-icons/sunny.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/sunny-circle.svg';
        }else if($scope.weather[key]['text'].includes('Snow')){
          $scope.weather[key]['img'] = '../img/weather-icons/snow.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/snow-circle.svg';
        }else if($scope.weather[key]['text'].includes('Part')){
          $scope.weather[key]['img'] = '../img/weather-icons/partial.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/partial-circle.svg';
        }else if($scope.weather[key]['text'] == "Mostly Cloudy" || $scope.weather[key]['text'].includes('Cloud')){
          $scope.weather[key]['img'] = '../img/weather-icons/cloudy.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/cloudy-circle.svg';
        }else if($scope.weather[key]['text'].includes('Rain') || $scope.weather[key]['text'].includes('Shower')){
          $scope.weather[key]['img'] = '../img/weather-icons/rain.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/rain-circle.svg';
        }else if($scope.weather[key]['text'].includes('Tornado')){
          $scope.weather[key]['img'] = '../img/weather-icons/tornado.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/tornado-circle.svg';
        }else if($scope.weather[key]['text'].includes('Wind')){
          $scope.weather[key]['img'] = '../img/weather-icons/windy.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/windy-circle.svg';
        }else if($scope.weather[key]['text'].includes('Storm') || $scope.weather[key]['text'].includes('storm')){
          $scope.weather[key]['img'] = '../img/weather-icons/storm.svg';
          $scope.weather[key]['alt'] = '../img/weather-icons/storm-circle.svg';
        }else{
          $scope.weather[key]['img'] = '';
          $scope.weather[key]['alt'] = '';
        }
      }
    }
  }
  }]);
