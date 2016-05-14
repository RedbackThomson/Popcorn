'use strict';

MovieSpotify.services.factory('Genres', 
function(FIREBASE_URL, $firebaseArray) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function() {    
      return $firebaseArray(ref.child("genres"));
    }
  }
});