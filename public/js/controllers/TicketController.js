app.controller('TicketController', ['$scope', '$stateParams', 'teamsService', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, teamsService, $rootScope, $timeout, $http, $state) {
  
  $http.get('http://localhost:8080/api/teams').then(function(res) {
      var data = res.data;
      $scope.tix = data[$stateParams.id];
      $scope.tickets = $scope.tix.tickets;
      setUpTickets();
    }, function(res){
      console.log('There was an error');
    });

  /*
  teamsService.then(function(data) {
    $scope.tix = data[$stateParams.id];
  	$scope.tickets = $scope.tix.tickets;
  	setUpTickets();
  }, function(error) {
    console.log("Seems to be an error in the Tickets Controller");
  });
*/
  function setUpTickets(){
    var item_ID = $scope.tix._id;
    var urlAv = "/api/tickets/available/update/"+item_ID;
    var urlAtt = "/api/tickets/attending/update/"+item_ID;

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

      }

      function removeAttending(){
        $http.delete('/api/tickets/attending/delete/'+item_ID+'/'+vgo._id)
          .then(function(res){
            console.log("Item Removed!");
            isDone = true;
            $scope.govisible = false;
            vgo = "";
            vgoin = "";
          }, function (error){
            console.log("~~ERROR~~"+error);
          });
      }

      function addAvailable(attName, attPhone){
        $scope.newAvailable = new Object();
        $scope.newAvailable.name = attName;
        $scope.newAvailable.phone = attPhone;
        var dataAv = $scope.newAvailable;

        $http.put(urlAv, dataAv).then(function(res) {
          $scope.newAvailable = new Object();
          $state.reload();
        }, function(error) {
          console.log(error);
        });
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
      }

      function removeAvailable(){
        $http.delete('/api/tickets/available/delete/'+item_ID+'/'+vnogo._id)
          .then(function(res){
            console.log("Item Removed!");
            isDone = true;
            $scope.nogovisible = false;
            vgo = "";
            vgoin = "";
          }, function (error){
            console.log("~~ERROR~~"+error);
          });
      }

      function addAttending(avName, avPhone){
        $scope.newAttending = new Object();
        $scope.newAttending.name = avName;
        $scope.newAttending.phone = avPhone;
        var dataAtt = $scope.newAttending;

        $http.put(urlAtt, dataAtt).then(function(res) {
          $scope.newAttending = new Object();
          $state.reload();
        }, function(error) {
          console.log(error);
        });
      }
    }, 200);
  }

}]);