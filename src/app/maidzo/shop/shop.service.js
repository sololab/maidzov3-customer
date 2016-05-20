(function() {
  'use strict';

  angular
    .module('app.maidzo.shop')
    .factory('ShopService', ShopService);

  function ShopService ($resource, ENV) {
    return {
      orders: $resource(ENV.API_CONFIG.url + 'shop/orders/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
})();
