'use strict';

MovieSpotify.controllers.controller('BrowseCtrl', 
function($scope, $ionicScrollDelegate, Genres, lubTmdbApi, TMDB_POSTER_PATH) {
  $scope.genres = Genres.get();
  $scope.selectedGenre = 35;

  $scope.$watch('selectedGenre', function(newVal) {
    if(newVal != 0)
    {
      loadGenre(newVal);
      $ionicScrollDelegate.$getByHandle('genreScroll').scrollTop();
    }
  });

  var loadGenre = function(genreId) {
    lubTmdbApi["genre"]["movies"]({
      query: genreId
    }).then(
    function(result) {
      $scope.genreMovies = result.data.results;
      angular.forEach($scope.genreMovies, function(movie, index, movies) {
        movies[index].posterFullPath = TMDB_POSTER_PATH + '/' + movie.poster_path;
      });
    }, function(result) {
      console.err(result);
    });
  };
});