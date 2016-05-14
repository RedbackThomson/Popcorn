'use strict';

var MovieSpotify = {
  constants: angular.module('MovieSpotify.constants', []),
  controllers: angular.module('MovieSpotify.controllers', ['MovieSpotify.constants']),
  services: angular.module('MovieSpotify.services', ['MovieSpotify.constants', 'victorqueiroz.ngOmdb'])
};

MovieSpotify.app = angular.module('MovieSpotify', ['ionic', 'MovieSpotify.controllers', 'MovieSpotify.services', 'ngCordova', 'firebase'])

.run(function($ionicPlatform, $rootScope, APP_NAME) {
  $rootScope.APP_NAME = APP_NAME;
  $rootScope.VERSION = window.VERSION;

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //An individual state for the login
  .state('login', {
    url: "/login",
    templateUrl: "templates/login/login.html",
    controller: 'LoginCtrl'
  })

  .state('main', {
    url: "/main",
    abstract: true,
    templateUrl: "templates/main/main.html",
    controller: 'MainCtrl'
  })

  .state('main.search', {
    url: '/search',
    views: {
      'menu-content': {
        templateUrl: 'templates/search/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('main.home', {
    url: '/home',
    views: {
      'menu-content': {
        templateUrl: 'templates/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('main.browse', {
    url: '/browse',
    views: {
      'menu-content': {
        templateUrl: 'templates/browse/browse.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('main.profile', {
    url: '/profile',
    views: {
      'menu-content': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('main.playlists', {
    url: '/playlists',
    views: {
      'menu-content': {
        templateUrl: 'templates/playlists/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
