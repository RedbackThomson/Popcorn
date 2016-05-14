'use strict';

var MovieSpotify = {
  constants: angular.module('MovieSpotify.constants', []),
  controllers: angular.module('MovieSpotify.controllers', ['MovieSpotify.constants', 'lub-tmdb-api']),
  services: angular.module('MovieSpotify.services', ['MovieSpotify.constants'])
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
    url: '/profile/:userId',
    views: {
      'menu-content': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('main.myplaylists', {
    url: '/playlists/:userId',
    views: {
      'menu-content': {
        templateUrl: 'templates/myplaylists/myplaylists.html',
        controller: 'ProfilePlaylistsCtrl'
      }
    }
  })

  .state('main.movie', {
    url: '/movie/:movieId',
    views: {
      'menu-content': {
        templateUrl: 'templates/movie/movie.html',
        controller: 'MovieCtrl'
      }
    }
  })

  .state('main.playlist', {
    url: '/playlist/:userId/:playlistId',
    views: {
      'menu-content': {
        templateUrl: 'templates/playlist/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('main.settings', {
    url: '/settings',
    views: {
      'menu-content': {
        templateUrl: 'templates/settings/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('main.history', {
    url: '/history',
    views: {
      'menu-content': {
        templateUrl: 'templates/history/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })

  .state('main.notifications', {
    url: '/notifications',
    views: {
      'menu-content': {
        templateUrl: 'templates/notifications/notifications.html',
        controller: 'NotificationsCtrl'
      }
    }
  })

  .state('main.privacy', {
    url: '/privacy',
    views: {
      'menu-content': {
        templateUrl: 'templates/privacy/privacy.html',
        controller: 'PrivacyCtrl'
      }
    }
  })

  .state('main.theme', {
    url: '/theme',
    views: {
      'menu-content': {
        templateUrl: 'templates/theme/theme.html',
        controller: 'ThemeCtrl'
      }
    }
  })

  .state('main.playlist.followed', {
    url: '/followed',
    views: {
      'menu-content': {
        templateUrl: 'templates/playlist/followed/followed.html',
        controller: 'FollowedCtrl'
      }
    }
  })

  .state('main.playlist.myplaylists', {
    url: '/myplaylists',
    views: {
      'menu-content': {
        templateUrl: 'templates/playlist/myplaylists/myplaylists.html',
        controller: 'MyPlaylistsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
