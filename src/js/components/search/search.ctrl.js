'use strict';

MovieSpotify.controllers.controller('SearchCtrl', 
function($scope, $timeout, $omdb) {
  $scope.search = {
    term: ""
  };

  var search = function(searchTerm) {
    $omdb.find(searchTerm, 'movie').then(function (results) {
      $scope.results = results;
      console.log(results);
    });
  };

  $scope.$watch('search.term', function (val) {
    if(val !== "" && val.length > 2)
      search(val);
  });

  $scope.cancel = function() {
    $scope.search.term = "";
  };
});