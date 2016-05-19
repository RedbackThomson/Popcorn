'use strict';

MovieSpotify.controllers.controller('MovieCtrl', 
function($scope, $rootScope, $state, $stateParams, $ionicModal, Users, Reviews, Playlist, History, Movie) {
  $scope.reviewText = "";
  $scope.added = false;

  Movie.get($stateParams.movieId).then(function(movie) {
    $scope.selection = movie;
    History.add($rootScope.user.id, $stateParams.movieId);
  });

  $scope.reviews = Reviews.get($stateParams.movieId);

  $ionicModal.fromTemplateUrl('templates/movie/rating.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.reviewModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/movie/add_bucket.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.bucketModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/movie/new_bucket.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newBucketModal = modal;
  });

  $scope.createReview = function() {
    if($scope.reviewText.length > 5)
      $scope.reviewModal.show();
  };

  $scope.submitReview = function(recommend) {
    var content = $scope.reviewText;

    var review = {
      author: $rootScope.user.name,
      content: content,
      recommend: recommend,
      date: (new Date()).getTime()
    }

    Reviews.submit($stateParams.movieId, review);
    $scope.reviewText = "";
    $scope.reviewModal.hide();
  };

  $scope.createBucket = function(bucketName) {
    Playlist.new($rootScope.user.id, bucketName);
    $scope.newBucketModal.hide();
  };

  $scope.add = function() {
    $scope.buckets = Playlist.all($rootScope.user.id);
    $scope.bucketModal.show();
  };

  $scope.addToBucket = function(bucketId) {
    var bucket = Playlist.add($rootScope.user.id, bucketId, $stateParams.movieId);
    $scope.added = true;
    $scope.bucketModal.hide();
  };
});