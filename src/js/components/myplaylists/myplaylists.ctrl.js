'use strict';

MovieSpotify.controllers.controller('ProfilePlaylistsCtrl', 
function($scope, $stateParams, Playlist) {
  $scope.$stateParams = $stateParams;
  $scope.buckets = Playlist.all($stateParams.userId);
});