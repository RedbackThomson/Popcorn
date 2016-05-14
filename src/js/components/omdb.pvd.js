function $OmdbProvider () {
  this.$get = $OmdbFactory;

  var defaults = this.defaults = {
    url: 'http://www.omdbapi.com',
    method: 'JSONP',
    params: {}
  };

  function $OmdbFactory ($http) {
    function request (params) {
      var config = angular.extend({}, defaults, config);
      config.params = params;

      return $http(config).then(function (res) {
        return res.data;
      });
    }

    return angular.extend(function (params) {
      return request(params);
    }, {
      get: function (id, type) {
        var params = {
          v: 1,
          callback: 'JSON_CALLBACK',
          r: 'json', // or 'xml',
          tomatoes: 'true',
          i: id
        };

        if(angular.isDefined(type)) {
          params.type = type;
        }

        return request(params);
      },
      find: function (movieTitle, type) {
        var params = {
          v: 1,
          callback: 'JSON_CALLBACK',
          r: 'json' // or 'xml'
        };

        if(angular.isObject(movieTitle)) {
          _.extend(params, movieTitle);
          movieTitle = undefined;
        }

        if(angular.isString(movieTitle)) {
          params.s = movieTitle;
        }

        // If it's a number, then
        // you are searching for
        // the year of the release
        if(angular.isNumber(type)) {
          params.y = type;
        }

        // Movie, series or episode
        if(angular.isDefined(type)) {
          params.type = type;
        }

        return request(params).then(function (data) {
          if(angular.isDefined(data.Search)) {
            data = data.Search;
          }

          return data;
        });
      }
    });
  }
}

angular.module('MovieSpotify.services')
  .provider('$omdb', $OmdbProvider);