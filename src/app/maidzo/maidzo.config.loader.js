(function() {
  'use strict';

  angular
    .module('app.maidzo')
    .config(moduleConfig);


  function moduleConfig (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }
})();
