(function(){
  'use strict';

  angular
    .module('app.maidzo.auth')
    .factory('AuthService', AuthService);

  function AuthService ($auth, $http, $q, ENV) {
    return {
      login: function(credentials) {
        return $auth.login(credentials);
      },

      logout: function() {
        return $auth.logout();
      },

      isAuthenticated: function() {
        return $auth.isAuthenticated();
      },

      getAccount: function() {
        return $http.get(ENV.API_CONFIG.url + 'auth/me')
        .then(function (response) {
          if (angular.isObject(response.data)) {
            return response.data;
          } else {
            $q.reject(response.data);
          }
        }, function (response) {
          $q.reject(response.data);
        });
      },

      getUser: function() {
        return $auth.getPayload().user;
      },

      getRole: function() {
        return $auth.getPayload().roles;
      },

      getEmployee: function() {
        return $auth.getPayload().employee;
      }
    };
  }
})();