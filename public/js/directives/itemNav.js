app.directive('itemNav', ['$timeout', 'teamsService', '$stateParams', function($timeout, teamsService, $stateParams) {
  return {
    restrict: "E",
    link: function(scope, element, attrs) {

      teamsService.then(function(data) {
        scope.opp = data[$stateParams.id];
        scope.id = $stateParams.id;
        setUpNavigation();
      }, function(error) {
        console.log("Seems to be an error in the gameNav.js files");
      });

      function setUpNavigation() {
        
        scope.items = [
          {name: "food"},
          {name: "tickets"},
          {name: "theme"}
        ]

        $timeout(function() {

          var navWidth = $('.cat-nav').width();
          var tw = 0;

          $('.cat-nav-slider').append("<div class='cat-underline'></div>");

          $('.cat-nav-item').each(function(index) {
            tw += parseInt($(this).width() + ($(this).innerWidth() - $(this).width()), 10);
          });
          tw = tw + ($('.cat-nav-item').innerWidth() - $('.cat-nav-item').width());

          $('.cat-nav').css("minWidth", (tw) + "px");
          $('.cat-nav-slider').css("minWidth", (tw) + "px");

          $('.cat-nav-item').on('mouseenter mouseleave', function(e) {
            var pad = $(this).innerWidth() - $(this).width();
            var width = $(this).width() + pad;
            var left = $(this).position().left;
            setUnderline(width, left);
            //$(this).find('.cf_icon').toggleClass('moveUp');
            //$(this).find('.cf_date').toggleClass('moveDown');
          });

          function setUnderline(w, l) {
            $('.cat-nav-slider').find('.cat-underline').css({"width" : w+"px", "left" : l+"px", "background" : scope.opp.color});
            //x.find('.cf_date').css("color", color[0].color);
          }
        }, 200);
      };
    },
    templateUrl: 'js/directives/itemNav.html'
  }
}]);
