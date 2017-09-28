app.controller('OlympicsGameController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  $scope.matchups = [];
  $scope.teams = [
    {
      country: "Slovakia",
      mem1: "Nick",
      mem2: "Kels"
    },
    {
      country: "Germany",
      mem1: "Chris",
      mem2: "Jackson"
    },
    {
      country: "Italy",
      mem1: "Anthony",
      mem2: "Bill"
    },
    {
      country: "Norway",
      mem1: "Brian",
      mem2: "Gina"
    },
    {
      country: "Austria",
      mem1: "Ty",
      mem2: "Connor"
    },
    {
      country: "Canada",
      mem1: "Josh",
      mem2: "Pitner"
    }
  ];
  
  var count = $scope.teams.length;
  var dus = 1;
  $scope.contents = [];
  $scope.i_width = 0;
  var m_count = [];
  
  setBracketColumnsAmt();
  console.log(m_count);
  setRoundsInMatch();
  setBracketColumnsWidth();
  setMatchupGrouping();
  console.log($scope.matchups);
  setInitialRandomMatchups();
  
  function setBracketColumnsAmt(){
    while(Math.round(count/2) > 0){
      count = count/2;
      var m = count;
      m = Math.ceil(m);
      m_count.push(m);
      dus++;
    }
    m_count.push(1);
  }
  
  function setRoundsInMatch(){
    for(var i=0; i<dus; i++){
      var x = new Object();
      x.round = [];
      $scope.matchups.push(x);    
    }
  }
  
  function setBracketColumnsWidth(){
    $scope.contents = [];
    $scope.i_width = 0;
    for(var i=0; i<dus; i++){
      var x = new Object();
      x.name = "";
      $scope.contents.push(x);
    }
    $scope.i_width = (100/$scope.contents.length);
  }
  
  function setMatchupGrouping(){
    var count = 0;
    for (var key in $scope.matchups) {
      if ($scope.matchups.hasOwnProperty(key)) {
        for(var i=0; i<m_count[count]; i++){
          var g = new Object();
          g.match = [];
          $scope.matchups[key].round.push(g);
        }
        count++;
      }
    }
  }
  
  function setInitialRandomMatchups(){
    var start = m_count[0];
    var subArray = $scope.teams;
  
    for(var i=0; i<start; i++){
      var r = Math.floor(Math.random() * (subArray.length)) + 0;
      getTeamOne(r, subArray, i);
      subArray.splice(r, 1);
      r = Math.floor(Math.random() * (subArray.length)) + 0;
      getTeamTwo(r, subArray, i);
      subArray.splice(r, 1);
    }
    fillStartingBracketColumn(0);
  }
  function getTeamOne(r, sub, i){ 
    $scope.matchups[0].round[i].match.push(sub[r]);
  }
  function getTeamTwo(r, sub, i){
    $scope.matchups[0].round[i].match.push(sub[r]);
  }
  
  function fillStartingBracketColumn(n){
    var arr = $scope.matchups[n].round;
    var target = "#sect"+n;
    $timeout(function() {
      for (var key in arr) {
        if (arr.hasOwnProperty(key)) {
          $(target).append("<div class='matchup'><p class='team'>"+arr[key].match[0].country+"</p><p class='team'>"+arr[key].match[1].country+"</p></div>");
        }
      }
    }, 200);
  }
  
  $timeout(function() {
    $(".team").on("click", function(){
      var pid = $(this).parent().parent().index();
      var cid = $(this).parent().index();
      var ccid = $(this).index();
      var ncid = 0;
      //console.log($scope.matchups[pid].round[cid].match[ccid]);
      
      //recognize it is the lasts
      if(pid == m_count.length){
        console.log("Finished!");
      }else{ //if anywhere else in the array
        var inv = getInverse();
        var winner = $scope.matchups[pid].round[cid].match[ccid];
        var loser = $scope.matchups[pid].round[cid].match[inv];
        //console.log("Winner: "+winner.country);
        //console.log("Loser: "+loser.country);
        if(cid%2 == 0){
          ncid = (cid/2);
        }else{
          ncid = (cid-1)/2;
        }
        advanceWinner();
        console.log($scope.matchups)

        function getInverse(){
          if(ccid == 0){
            return 1;
          }else{
            return 0;
          }
        }
        function advanceWinner(){
          $scope.matchups[(pid+1)].round[ncid].match.push(winner);
          fillStartingBracketColumn((pid+1));
        }
      }
    });
  }, 250);
}]);