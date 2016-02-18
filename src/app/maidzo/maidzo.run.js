(function() {
  'use strict';

  angular
    .module('app.maidzo')
    .run(getAuth)
    .run(getShopConfig);
  
  function getAuth($rootScope, $state, $location, $auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.data) {
        if (toState.data.authenticate && !$auth.isAuthenticated()) {
          $state.go('auth.login');
          event.preventDefault();
        }
      }
    });
  }

  function getShopConfig ($http, ENV, localStorageService) {
    $http.get(ENV.API_CONFIG.url + 'shop/config')
      .then(function(response) {
        localStorageService.set('shop.statuses', response.data.statuses);
      });
  }
})();
