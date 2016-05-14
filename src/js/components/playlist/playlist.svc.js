'use strict';

MovieSpotify.services.factory('Playlist', 
function(FIREBASE_URL, $q, $firebaseArray) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    all: function(userId) {    
      return $firebaseArray(ref.child("playlists/" + userId));
    },
    get: function(userId, playlistId) {
      return ref.child("playlists").child(userId).child(playlistId);
    },
    add: function(userId, playlistId, movieId) {
      var playlist = this.get(userId, playlistId);
      var movies = playlist.child("movies").push(movieId);
    },
    new: function(userId, name) {
      ref.child("playlists").child(userId).push({
        name: name
      });
    }
  }
});