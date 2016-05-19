'use strict';

MovieSpotify.controllers.controller('PlaylistCtrl', 
function($scope, $stateParams, $firebaseArray, Movie, Playlist) {
  $scope.movies = [];
  $scope.name = "";

  var playlist = Playlist.get($stateParams.userId, $stateParams.playlistId);
  playlist.on('value', function (snapshot){
    $scope.name = snapshot.val().name;
    angular.forEach(snapshot.val().movies, function(movie) {
      Movie.get(movie).then(function(movieInfo) {
        $scope.movies.push(movieInfo);
      });
    });
  });
});