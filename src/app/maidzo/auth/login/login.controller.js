(function() {
  'use strict';

  angular
    .module('app.maidzo.auth')
    .controller('LoginController', LoginController);

  function LoginController($rootScope, $state, triSettings, localStorageService, $mdToast, AuthService) {
    var vm = this;

    vm.submit = submit;
    
    vm.triSettings = triSettings;

    if (AuthService.isAuthenticated()) {
      $state.go('maidzo.admin-default.dashboard-server');
    }

    function submit () {
      AuthService
      .login(vm.user)
      .then(function() {
        AuthService
        .getAccount()
        .then(function () {
          $state.go('maidzo.admin-default.dashboard-server');

          $mdToast.showSimple('Đăng nhập thành công!');
        }, function() {
          $mdToast.showSimple('Có lỗi xảy ra, vui lòng thông báo bộ phận kỹ thuật!');
        });
      })
      .catch(function (response) {
        $mdToast.showSimple(response.data.message);
      });
    }
  }
})();