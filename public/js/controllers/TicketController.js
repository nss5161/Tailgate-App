app.controller('TicketController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  teamsService.then(function(data) {
  	$scope.tickets = data[$stateParams.id].team[0].gameInfo[1].tickets;
  	setUpTickets();
  }, function(error) {
    console.log("Seems to be an error in the Tickets Controller");
  });

  function setUpTickets(){
    $scope.attending = $scope.tickets.attending;
    $scope.available = $scope.tickets.available;
    $scope.newAttending = new Object();
    $scope.newAvailable = new Object();
    var vgo = "";
    var vgoin = "";
    $scope.govisible = false;

    $timeout(function() {

      // TOGGLE CONFIRMATION MODALS
      $scope.notGoingModal = function(go, index){
        vgo = go;
        vgoin = index;
        $scope.govisible = true;
      }

      $scope.iCanGoModal = function(nogo, index){
        console.log(nogo);
        console.log(index);
      }

      $scope.closeModal = function(){
        $scope.govisible = false;
      }

      // I CANNOT GO TO THE GAME (MAKE TICKET AVAILABLE);

      $scope.notGoing = function(go, index){
        var isDone = true;
        var attName = $scope.attending[vgoin].name;
        var attPhone = $scope.attending[vgoin].phone;

        removeAttending(isDone, vgoin);

        if(isDone){
          addAvailable(index, attName, attPhone);
        }
      }

      function removeAttending(isDone, go){
        $scope.attending.splice($scope.attending.indexOf(go),1);
        isDone = true;
        $scope.govisible = false;

        return isDone;
      }

      function addAvailable(index, attName, attPhone){
        $scope.newAvailable = new Object();
        $scope.newAvailable.name = attName;
        $scope.newAvailable.phone = attPhone;
        $scope.available.push($scope.newAvailable);
        $scope.newAvailable = new Object();
      }

      // I CAN GO TO THE GAME (TICKET CLAIM)

      $scope.iCanGo = function(nogo, index){
        var isDone = true;
        var avName = $scope.available[index].name;
        var avPhone = $scope.available[index].phone;

        removeAvailable(isDone, nogo);

        if(isDone){
          addAttending(index, avName, avPhone);
        }
      }

      function removeAvailable(isDone, nogo){
        $scope.available.splice($scope.available.indexOf(nogo),1);
        isDone = true;

        return isDone;
      }

      function addAttending(index, avName, avPhone){
        $scope.newAttending = new Object();
        $scope.newAttending.name = avName;
        $scope.newAttending.phone = avPhone;
        $scope.attending.push($scope.newAttending);
        $scope.newAttending = new Object();
      }
    }, 200);
  }

}]);