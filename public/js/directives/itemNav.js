app.directive('itemNav', ['$timeout', 'teamsService', '$stateParams', function($timeout, teamsService, $stateParams) {
  return {
    restrict: "E",
    link: function(scope, element, attrs) {

      teamsService.then(function(data) {
        console.log($stateParams.id);
        scope.opp = data[$stateParams.id].team[0];
        scope.id = $stateParams.id;
        console.log(scope.id);
        setUpNavigation();
      }, function(error) {
        console.log("Seems to be an error in the gameNav.js files");
      });

      function setUpNavigation() {
        
        scope.cats = scope.opp.gameInfo;
        scope.x = [];

        for (var key in scope.cats) {
          if (scope.cats.hasOwnProperty(key)) {
            var o = new Object();
            var p = scope.cats[key];
            p = JSON.stringify(p);
            p = p.substring(p.indexOf('"') + 1, p.indexOf(':') - 1);
            o.name = p;
            o.state = p+"State";
            o.url = "/"+p;
            o.temp = "../views/"+p+"Section.html";
            scope.x.push(o);
          }
        }

        //console.log(scope.x);
        //console.log("still running");

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
