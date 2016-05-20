(function() {
  'use strict';

  angular
    .module('app.maidzo', [
      'app.maidzo.env',
      'app.maidzo.location',
      'app.maidzo.auth',
      'app.maidzo.dashboards',
      'app.maidzo.account',
      'app.maidzo.shop'
    ]);
})();
