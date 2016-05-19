'use strict';

MovieSpotify.controllers.controller('LoginCtrl', 
function(FIREBASE_URL, $scope, $rootScope, $state, $firebase, $q, Users, Playlist) { 
  var firebaseRef = new Firebase(FIREBASE_URL);
  $scope.user = firebaseRef.getAuth();

  if($scope.user)
  {
    $state.go("main.home");
  }

  $scope.createNewUser = function(authData) {
    firebaseRef
    .child("users")
    .child(authData.uid)
    .set({
      id: authData.uid,
      provider: authData.provider,
      name: authData.facebook.displayName,
      picture: authData.facebook.profileImageURL
    });

    firebaseRef.child("users").child(authData.uid).on('value', function(snapshot)
    {
      $rootScope.user = snapshot.val();
    });
  };

  firebaseRef.onAuth(function(authData) {
    if(authData == null || !authData.hasOwnProperty("uid"))
      return;
    var user = Users.get(authData.uid).then(function() {
      if (authData && !user.id) {
        $scope.createNewUser(authData);
      }
      else{
        $rootScope.user = user;
      }
    });
  });

  firebaseRef.offAuth(function() {
    $rootScope.user = null;
  });

  var thirdPartyLogin = function(provider) {
    var deferred = $q.defer();
    // prefer pop-ups, so we don't navigate away from the page
    firebaseRef.authWithOAuthPopup(provider, function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          firebaseRef.authWithOAuthRedirect(provider, function(error, authData) 
          {
            if(error)
              deferred.reject(error);
            else
              deferred.resolve(authData);
          });
        }
      } else {
        deferred.resolve(authData);
      }
    });

    return deferred;
  }

  $scope.login = function(provider) {
    var login = thirdPartyLogin(provider);
    $q.when(login).then(
    function(authData) {
      $state.go("main.home");
    }, function(error) {
      console.err("Couldn't log in");
    });
  };

  $scope.logout = function() {
    firebaseRef.unauth();
    $rootScope.user = null;
  };
});