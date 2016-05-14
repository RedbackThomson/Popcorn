'use strict';

MovieSpotify.controllers.controller('HomeCtrl', 
function($scope, lubTmdbApi, TMDB_POSTER_PATH) {
  $scope.TMDB_POSTER_PATH = TMDB_POSTER_PATH;
  
  var loadTop = function(genreId) {
    lubTmdbApi["movie"]["nowPlaying"]().then(
    function(result) {
      $scope.movies = result.data.results;

      angular.forEach($scope.movies, function(movie, index, movieArray) {
        lubTmdbApi["movie"]["movie"]({
          query: movie.id
        }).then(function(movieInfo) {
          movieArray[index].imdbId = movieInfo.data.imdb_id;
        });
      });
      console.log($scope.movies);
    }, function(result) {
      console.error(result);
    });
  };

  loadTop();
})
