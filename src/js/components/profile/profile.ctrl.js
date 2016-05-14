'use strict';

MovieSpotify.controllers.controller('ProfileCtrl', 
function($scope, $stateParams, Users) {
  Users.get($stateParams.userId).then(function(user) {
    $scope.profileUser = user;
  });
});