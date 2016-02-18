(function(){
  'use strict';

  angular
    .module('app.maidzo.dashboards')
    .config(routeConfig);

  function routeConfig ($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
    $translatePartialLoaderProvider.addPart('app/maidzo/dashboards');

    $stateProvider
    .state('maidzo.admin-default.dashboard-server', {
      url: '/dashboards/server',
      templateUrl: 'app/maidzo/dashboards/server/dashboard-server.tmpl.html',
      controller: 'DashboardServerController as vm',
      data: {
        authenticate: true
      }
    });

    triMenuProvider.addMenu({
      name: 'MENU.DASHBOARDS.DASHBOARDS',
      icon: 'zmdi zmdi-home',
      type: 'dropdown',
      priority: 1.1,
      children: [{
        name: 'MENU.DASHBOARDS.SERVER',
        state: 'maidzo.admin-default.dashboard-server',
        type: 'link'
      }]
    });
  }
})();
