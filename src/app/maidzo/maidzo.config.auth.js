(function() {
  'use strict';

  angular
    .module('app.maidzo')
    .config(moduleConfig);

  function moduleConfig($authProvider, ENV) {
    // API base url
    $authProvider.baseUrl = ENV.API_CONFIG.url;
    $authProvider.loginUrl = '/auth/signin';
    $authProvider.tokenPrefix = 'maidzo';
  }
})();
