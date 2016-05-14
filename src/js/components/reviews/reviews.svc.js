'use strict';

MovieSpotify.services.factory('Reviews', 
function(FIREBASE_URL, $q, $firebaseArray) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function(imdbId) {    
      return $firebaseArray(ref.child("reviews" + "/" + imdbId));
    },
    submit: function(imdbId, review) {
      ref.child("reviews").child(imdbId).push(review);
    }
  }
});