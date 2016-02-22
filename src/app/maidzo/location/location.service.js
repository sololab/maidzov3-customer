(function () {
  'use strict';

  angular
    .module('app.maidzo.location')
    .factory('LocationService', LocationService);

  function LocationService ($http, $q, ENV) {
    return {
      loadProvinces: function() {
        return $http.get(ENV.API_CONFIG.url + 'map/provinces')
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
      loadDistricts: function(provinceId) {
        return $http.get(ENV.API_CONFIG.url + 'map/provinces/' + provinceId + '?include=districts')
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
      loadWards: function(districtId) {
        return $http.get(ENV.API_CONFIG.url + 'map/districts/' + districtId + '?include=wards')
          .then(function(response) {
            if (angular.isObject(response.data)) {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
            return $q.reject(response.data);
          });
      }
    };
  }
})();