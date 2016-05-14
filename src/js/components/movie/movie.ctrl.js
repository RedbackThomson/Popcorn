'use strict';

MovieSpotify.controllers.controller('MovieCtrl', 
function($scope, $state, $stateParams, $omdb, Reviews) {
  $omdb.get($stateParams.movieId).then(function(movie) {
    $scope.selection = movie;
  });

  
});