'use strict';

MovieSpotify.services.factory('Users', 
function(FIREBASE_URL, $q) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function(userId) {      
      return $q(function(resolve, reject) {ref.child("users").child(userId).on('value', 
        function(snapshot) {
          resolve(snapshot.val());
        });
      });
    }
  }
});