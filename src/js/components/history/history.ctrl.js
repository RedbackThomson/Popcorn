'use strict';

MovieSpotify.controllers.controller('HistoryCtrl', 
function($scope, $stateParams, Movie, History) {
  History.get($stateParams.userId).$loaded(function(history) {
    $scope.movies = [];
    angular.forEach(history, function(imdbId) {
      Movie.get(imdbId.$value).then(function(movie) {
        //Wrap the movie in order to sort by history order
        var newMovie = {
          movie: movie,
          key: imdbId.$id
        };
        $scope.movies.push(newMovie);
      });
    });
  });
});