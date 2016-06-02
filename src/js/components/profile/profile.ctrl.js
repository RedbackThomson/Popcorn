'use strict';

MovieSpotify.controllers.controller('ProfileCtrl', 
function($scope, $stateParams, Users, History, Movie) {
  $scope.$stateParams = $stateParams;
  $scope.latestHistory = null;
  History.get($stateParams.userId).$loaded().then(function (movies){
    if(movies.length === 0)
      return;

    var lastMovie = movies[movies.length - 1].$value;
    Movie.get(lastMovie).then(function(first) {
      $scope.latestHistory = first;
    });
  });
  
  Users.get($stateParams.userId).then(function(user) {
    $scope.profileUser = user;
  });
});