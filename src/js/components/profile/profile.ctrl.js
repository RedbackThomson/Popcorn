'use strict';

MovieSpotify.controllers.controller('ProfileCtrl', 
function($scope, $stateParams, Users) {
  $scope.$stateParams = $stateParams;
  
  Users.get($stateParams.userId).then(function(user) {
    $scope.profileUser = user;
  });
});