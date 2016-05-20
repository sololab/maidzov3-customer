(function () {
  'use strict';

  angular
    .module('app.maidzo.shop')
    .config(routeConfig);

  function routeConfig ($stateProvider, triMenuProvider) {
    $stateProvider
      .state('maidzo.admin-default.shop', {
        url: '/shop',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('maidzo.admin-default.shop.orders', {
        abstract: false,
        template: '<ui-view/>'
      })
      .state('maidzo.admin-default.shop.orders.list', {
        url: '/orders',
        templateUrl: 'app/maidzo/shop/orders/orders.tmpl.html',
        controller: 'ShopOrderListController as vm',
        data: {
          authenticate: true
        }
      })
      .state('maidzo.admin-default.shop.orders.detail', {
        url: '/orders/:id',
        templateUrl: 'app/maidzo/shop/orders/pages/detail.tmpl.html',
        controller: 'ShopOrderDetailController as vm',
        data: {
          authenticate: true
        },
        resolve: {
          order: function($stateParams, ShopService) {
            return ShopService.orders.get({
              id: $stateParams.id, 
              include:'customer,address,items.product,invoices,payments,shipments'}
            ).$promise;
          }
        }
      });

    triMenuProvider.addMenu({
      name: 'Đơn hàng',
      icon: 'zmdi zmdi-store',
      type: 'link',
      state: 'maidzo.admin-default.shop.orders.list',
      priority: 3.1
    });
  }
})();