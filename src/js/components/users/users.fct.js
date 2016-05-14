'use strict';

MovieSpotify.services.factory('Users', 
function(FIREBASE_URL, $q, $firebaseObject) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function(userId) {      
      return $q(function(resolve, reject) {ref.child("users").child(userId).on('value', 
        function(snapshot) {
          resolve(snapshot.val());
        });
      });
    },
    setHistory: function(userId, movieName) {
      var user = $firebaseObject(ref.child("users").child(userId));
      user.$loaded().then(function() {
        user.history = movieName;
        user.$save();
      });
    }
  }
});