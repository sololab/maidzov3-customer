(function(){
  'use strict';

  angular
    .module('app.maidzo')
    .config(routeConfig);

  function routeConfig ($stateProvider) {
    $stateProvider
    .state('maidzo', {
      abstract: true,
      templateUrl: 'app/triangular/layouts/default/default.tmpl.html',
      controller: 'DefaultLayoutController',
      controllerAs: 'layoutController'
    })
    .state('maidzo.admin-default', {
      abstract: true,
      views: {
        sidebarLeft: {
          templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
          controller: 'MenuController',
          controllerAs: 'vm'
        },
        sidebarRight: {
          templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
          controller: 'NotificationsPanelController',
          controllerAs: 'vm'
        },
        toolbar: {
          templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
          controller: 'DefaultToolbarController',
          controllerAs: 'vm'
        },
        content: {
          template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
        },
        belowContent: {
          template: '<div ui-view="belowContent"></div>'
        }
      }
    });
  }
})();
