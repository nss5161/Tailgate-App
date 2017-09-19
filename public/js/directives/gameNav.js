app.directive('gameNav', ['$timeout', 'teamsService', function($timeout, teamsService) {
  return {
    restrict: "E",
    link: function(scope, element, attrs) {

      teamsService.then(function(data) {
        scope.opp = data;
        setUpNavigation();
      }, function(error) {
        console.log("Seems to be an error in the gameNav.js files");
      });

      function setUpNavigation() {
        $timeout(function() {
          var navWidth = $('.nav').width();
          var tw = 0;

          $('.nav-slider').append("<div class='underline'></div>");

          $('.nav-item').each(function(index) {
            tw += parseInt($(this).width() + ($(this).innerWidth() - $(this).width()), 10);
          });
          tw = tw + ($('.nav-item').innerWidth() - $('.nav-item').width());

          $('.nav').css("minWidth", (tw) + "px");
          $('.nav-slider').css("minWidth", (tw) + "px");

          $('.nav-item').on('mouseenter mouseleave', function(e) {
            var tis = $(this);
            var x = tis.index();
            var name = tis.find('a').text();
            var pad = tis.innerWidth() - tis.width();
            var width = tis.width() + pad;
            var left = tis.position().left;
            setUnderline(width, left, name, x, tis);
            tis.find('.cf_icon').toggleClass('moveUp');
            tis.find('.cf_date').toggleClass('moveDown');
          });

          function setUnderline(w, l, n, x, t) {

            $('.underline').css({"width" : w+"px", "left" : l+"px", "background" : scope.opp[x].color});
            t.find('.cf_date').css("color", scope.opp[x].color);
          }
        }, 200);
      };
    },
    templateUrl: 'js/directives/gameNav.html'
  }
}]);
