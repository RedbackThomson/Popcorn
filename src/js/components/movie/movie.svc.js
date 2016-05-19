'use strict';

MovieSpotify.services.factory('Movie', 
function($q, $omdb) {
  return {
    get: function(imdbId) {
      return $omdb.get(imdbId);
    }
  }
});