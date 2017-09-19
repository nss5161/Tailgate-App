app.controller('TicketController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', function($scope, $stateParams, teamsService, $rootScope, $timeout) {
  teamsService.then(function(data) {
    $scope.tix = data[$stateParams.id];
  	$scope.tickets = $scope.tix.tickets;
  	setUpTickets();
  }, function(error) {
    console.log("Seems to be an error in the Tickets Controller");
  });

  function setUpTickets(){
    var id = $scope.tix._id;
    var section = 1;
    var sub_section = "";
    var rnum = 0;

    $scope.attending = $scope.tickets[0].attending;
    $scope.available = $scope.tickets[0].available;
    $scope.newAttending = new Object();
    $scope.newAvailable = new Object();
    var vgo = "";
    var vgoin = "";
    var vnogo = "";
    var vnogoin = "";

    $scope.newAtt = new Object();

    $timeout(function() {

      // TOGGLE CONFIRMATION MODALS
      $scope.notGoingModal = function(go, index){
        vgo = go;
        vgoin = index;
        $scope.govisible = true;
      }

      $scope.iCanGoModal = function(nogo, index){
        vnogo = nogo;
        vnogoin = index;
        $scope.nogovisible = true;
      }

      $scope.closeModal = function(){
        $scope.govisible = false;
        $scope.nogovisible = false;
      }

      // I CANNOT GO TO THE GAME (MAKE TICKET AVAILABLE);

      $scope.notGoing = function(){
        var isDone = true;
        var attName = $scope.attending[vgoin].name;
        var attPhone = $scope.attending[vgoin].phone;

        sub_section = "attending";
        rnum = vgoin;

        removeAttending();

        if(isDone){
          addAvailable(attName, attPhone);
        }

        console.log("localhost:8080/update/"+id+"/"+section+"/"+sub_section+"/"+rnum);
      }

      function removeAttending(){
        $scope.attending.splice($scope.attending.indexOf(vgo),1);
        isDone = true;
        $scope.govisible = false;
        vgo = "";
        vgoin = "";

        return isDone;
      }

      function addAvailable(attName, attPhone){
        $scope.newAvailable = new Object();
        $scope.newAvailable.name = attName;
        $scope.newAvailable.phone = attPhone;
        $scope.available.push($scope.newAvailable);
        $scope.newAvailable = new Object();
      }

      // I CAN GO TO THE GAME (TICKET CLAIM)

      $scope.iCanGo = function(){
        var isDone = true;
        var avName = $scope.newAtt.name;
        var avPhone = $scope.newAtt.phone;

        sub_section = "available";
        rnum = vnogoin;

        removeAvailable();

        if(isDone){
          addAttending(avName, avPhone);
        }

        console.log("localhost:8080/update/"+id+"/"+section+"/"+sub_section+"/"+rnum);
      }

      function removeAvailable(){
        $scope.available.splice($scope.available.indexOf(vnogo),1);
        isDone = true;
        $scope.nogovisible = false;
        vgo = "";
        vgoin = "";

        return isDone;
      }

      function addAttending(avName, avPhone){
        $scope.newAttending = new Object();
        $scope.newAttending.name = avName;
        $scope.newAttending.phone = avPhone;
        $scope.attending.push($scope.newAttending);
        $scope.newAttending = new Object();
        $scope.newAtt = new Object();
      }
    }, 200);
  }

}]);