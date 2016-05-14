// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'MovieSpotify' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'MovieSpotify.services' is found in services.js
// 'MovieSpotify.controllers' is found in controllers.js
var MovieSpotify = {
  constants: angular.module('MovieSpotify.constants', []),
  controllers: angular.module('MovieSpotify.controllers', ['MovieSpotify.constants']),
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

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('main', {
    url: "/main",
    abstract: true,
    templateUrl: "templates/main.html",
    controller: 'MainCtrl'
  })
  // Each tab has its own nav history stack:

  .state('main.home', {
    url: '/home',
    views: {
      'main-home': {
        templateUrl: 'templates/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dash/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chatdetail/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
