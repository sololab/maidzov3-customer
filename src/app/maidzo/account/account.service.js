(function () {
  'use strict';

  angular
    .module('app.maidzo.account')
    .factory('UserService', UserService);

  function UserService ($http, $q, ENV) {
    return {
      getAccount: function() {
        return $http.get(ENV.API_CONFIG.url + 'auth/me')
          .then(function(response) {
            if (angular.isObject(response.data)) {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
            return $q.reject(response.data);
          });
      },
      updateAccount: function(data) {
        return $http.put(ENV.API_CONFIG.url + 'auth/me', data);
      },
      getProfile: function() {
        return $http.get(ENV.API_CONFIG.url + 'shop/customer/profile')
          .then(function(response) {
            if (angular.isObject(response.data)) {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
            return $q.reject(response.data);
          });
      },
      updateProfile: function(data) {
        return $http.put(ENV.API_CONFIG.url + 'shop/customer/profile', data);
      },
      getLocation: function() {
        return $http.get(ENV.API_CONFIG.url + 'shop/customer/address')
          .then(function(response) {
            if (angular.isObject(response.data)) {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
            return $q.reject(response.data);
          });
      },
      updateLocation: function(data) {
        return $http.put(ENV.API_CONFIG.url + 'shop/customer/address', data);
      }
    };
  }
})();