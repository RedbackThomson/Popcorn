'use strict';

MovieSpotify.controllers.controller('LoginCtrl', 
function($scope, $rootScope, $state, $firebase, $q) { 
  var firebaseRef = new Firebase("https://moviespotify.firebaseio.com/");
  $scope.user = firebaseRef.getAuth();

  if($scope.user.uid)
  {
    $state.go("tab.dash");
  }

  firebaseRef.onAuth(function(authData) {
    if (authData) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      firebaseRef
      .child("users")
      .child(authData.uid)
      .set({
        provider: authData.provider,
        name: getName(authData)
      });
    }
  });

  firebaseRef.offAuth(function() {
    $scope.user = null;
  });

  // find a suitable name based on the meta info given by each provider
  function getName(authData) {
    switch(authData.provider) {
       case 'password':
         return authData.password.email.replace(/@.*/, '');
       case 'twitter':
         return authData.twitter.displayName;
       case 'facebook':
         return authData.facebook.displayName;
    }
  }

  var thirdPartyLogin = function(provider) {
    var deferred = $q.defer();
    // prefer pop-ups, so we don't navigate away from the page
    firebaseRef.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          firebaseRef.authWithOAuthRedirect("facebook", function(error, authData) 
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
      $state.go("tab.dash");
    }, function(error) {
      console.err("Couldn't log in");
    });
  };

  $scope.logout = function() {
    firebaseRef.unauth();
    $scope.user = null;
  };
});