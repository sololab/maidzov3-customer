(function () {
  'use strict';

  angular
    .module('app.maidzo.shop')
    .controller('ShopOrderListController', ShopOrderListController)
    .controller('ShopOrderDetailController', ShopOrderDetailController);

  function ShopOrderListController ($scope, ShopService) {
    var vm = this;
    
    vm.selected = [];

    vm.query = {
      filter: '',
      filterBy: '',
      orderBy: 'id',
      sortedBy: 'desc',
      include: 'customer',
      limit: 50,
      page: 1
    };

    vm.filter = {
      options: {
        debounce: 500
      },
      fields: [{
        value: 'shop_orders.id',
        name: 'Mã đơn'
      }, {
        value: 'customer.name',
        name: 'Khách hàng'
      }, {
        value: 'sale_agent.name',
        name: 'NV Kinh doanh'
      }, {
        value: 'buy_agent.name',
        name: 'NV Đặt hàng'
      }]
    };

    activate();

    ////////////////

    function activate() {
      var bookmark;

      $scope.$watch('vm.query.filter', function (newValue, oldValue) {
        if(!oldValue) {
          bookmark = vm.query.page;
        }

        if(newValue !== oldValue) {
          vm.query.page = 1;
        }

        if(!newValue) {
          vm.query.page = bookmark;
        }

        getOrders();
      });
    }

    vm.onPaginate = function (page, limit) {
      getOrders(angular.extend({}, vm.query, {page: page, limit: limit}));
    };

    vm.onReorder = function (order) {
      var direction = 'asc';

      if(order.charAt(0) === '-') {
        direction = 'desc';
        order = order.slice(1);
      }

      getOrders(angular.extend({}, vm.query, {orderBy: order, sortedBy: direction}));
    };

    vm.removeFilter = function () {
      vm.filter.show = false;
      vm.query.filter = '';
      vm.query.filterBy = '';

      if(vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    };

    function getOrders (query) {
      vm.promise = ShopService.orders.get(query || vm.query, success).$promise;
    }

    function success (orders) {
      vm.orders = orders;
    }
  }

  function ShopOrderDetailController ($filter, $log, $mdBottomSheet, $mdDialog, $mdToast, order, ShopService, localStorageService) {
    var vm = this;

    vm.order = {
      data: order.data,
      address: order.data.address.data,
      items: order.data.items.data,
      invoices: order.data.invoices.data,
      payments: order.data.payments.data,
      shipments: order.data.shipments.data
    };
    vm.orderStatuses = localStorageService.get('shop.statuses').orders;
    vm.shipmentStatuses = localStorageService.get('shop.statuses').shipments;

    // Group items by shop
    var shops = $filter('groupBy')(vm.order.items, 'product.data.meta_shop_seller');
    var selected = {};

    angular.forEach(shops, function(items, shop) {
      selected[shop] = [];
    });

    vm.shops = shops;
    vm.selected = selected;
  }
})();