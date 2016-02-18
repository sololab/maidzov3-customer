(function(){
  'use strict';

  angular
    .module('app.maidzo.auth')
    .config(routeConfig);

  function routeConfig ($translatePartialLoaderProvider, $stateProvider) {
    $translatePartialLoaderProvider.addPart('app/maidzo/auth');

    $stateProvider
    .state('auth', {
      abstract: true,
      templateUrl: 'app/maidzo/auth/layouts/auth.tmpl.html'
    })
    .state('auth.login', {
      url: '/login',
      templateUrl: 'app/maidzo/auth/login/login.tmpl.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      data: {
        authentication: false
      }
    });
  }
})();