'use strict';

MovieSpotify.services.factory('Reviews', 
function(FIREBASE_URL, $q) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function(imdbId) {      
      return $q(function(resolve, reject) {ref.child("reviews").child(imdbId).on('value', 
        function(snapshot) {
          resolve(snapshot.val());
        });
      });
    }
  }
});