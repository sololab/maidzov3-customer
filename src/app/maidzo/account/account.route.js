(function () {
  'use strict';

  angular
    .module('app.maidzo.account')
    .config(routeConfig);

  function routeConfig ($stateProvider, triMenuProvider) {
    $stateProvider
    .state('maidzo.admin-default.account', {
      url: '/account',
      templateUrl: 'app/maidzo/account/account.tmpl.html',
      controller: 'AccountController as vm',
      resolve: {
        account: function(UserService) {
          return UserService.getAccount();
        },
        profile: function(UserService) {
          return UserService.getProfile();
        },
        location: function(UserService) {
          return UserService.getLocation();
        }
      },
      data: {
        authentication: true
      }
    });

    triMenuProvider.addMenu({
      name: 'Tài khoản',
      icon: 'zmdi zmdi-lock',
      type: 'link',
      priority: 2.1,
      state: 'maidzo.admin-default.account'
    });
  }
})();