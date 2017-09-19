//var app = angular.module('appRoutes', ['ngRoute'])

app.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){

  console.log("routes is running");

  $locationProvider.hashPrefix("");

  $stateProvider
      .state('home', {
        url: '/home',
        controller: 'MainController',
        templateUrl: 'views/homepage.html'
      })
      .state('game', {
        url: '/:id',
        controller: 'GamedayController',
        templateUrl: 'views/gameday.html'
      })
      .state('game.food', {
        url: '/food',
        controller: 'FoodController',
        templateUrl: 'views/foodSection.html'
      })
      .state('game.food.details', {
        url: '/:type',
        reloadOnSearch: false,
        controller: 'FoodListController',
        templateUrl: 'views/foodList.html'
      })
      .state('game.tickets', {
        url: '/tickets',
        controller: 'TicketController',
        templateUrl: 'views/ticketsSection.html'
      })
      .state('game.theme', {
        url: '/theme',
        controller: 'ThemeController',
        templateUrl: 'views/themeSection.html'
      });


  $urlRouterProvider
    .otherwise('/home');

});
