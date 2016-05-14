'use strict';

MovieSpotify.controllers.controller('MovieCtrl', 
function($scope, $rootScope, $state, $stateParams, $omdb, $ionicModal, Reviews) {
  $scope.reviewText = "";

  $omdb.get($stateParams.movieId).then(function(movie) {
    $scope.selection = movie;
  });

  $scope.reviews = Reviews.get($stateParams.movieId);

  $ionicModal.fromTemplateUrl('templates/movie/rating.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createReview = function() {
    if($scope.reviewText.length > 5)
      $scope.modal.show();
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
    $scope.modal.hide();
  };
});