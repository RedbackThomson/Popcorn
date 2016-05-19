'use strict';

MovieSpotify.services.factory('History', 
function(FIREBASE_URL, HISTORY_LENGTH, $q, $firebaseArray) {
  var ref = new Firebase(FIREBASE_URL);

  return {
    get: function(userId) {    
      return $firebaseArray(ref.child("history/" + userId));
    },
    add: function(userId, movieId) {
      var history = this.get(userId);
      history.$loaded().then(function() {
        //Check for movie in array already
        for(var i = 0; i < history.length; i++)
        {
          if(history[i].$value == movieId)
            history.$remove(i);
        }

        history.$add(movieId);

        if(history.length > HISTORY_LENGTH)
          //Remove the top of the list
          history.$remove(0);
      });
    }
  }
});