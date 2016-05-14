'use strict';

MovieSpotify.controllers.controller('PlaylistCtrl', 
function($scope, $stateParams, $firebaseArray, $omdb, Playlist) {
  $scope.movies = [];
  $scope.name = "";

  var playlist = Playlist.get($stateParams.userId, $stateParams.playlistId);
  playlist.on('value', function (snapshot){
    $scope.name = snapshot.val().name;
    angular.forEach(snapshot.val().movies, function(movie) {
      $omdb.get(movie).then(function(movieInfo) {
        $scope.movies.push(movieInfo);
        console.log(movieInfo);
      });
    });
  });
});