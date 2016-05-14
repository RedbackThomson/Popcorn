'use strict';

MovieSpotify.controllers.controller('MainCtrl', 
function($scope,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});