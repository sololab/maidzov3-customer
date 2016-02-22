(function () {
  'use strict';

  angular
    .module('app.maidzo.account')
    .controller('AccountController', AccountController);

  function AccountController (ENV, $mdToast, $http, moment, account, profile, location, UserService, LocationService, $log) {
    var vm = this;

    vm.account = account.data;
    vm.profile = profile.data;
    vm.location = location.data;
    vm.birth_date = moment(profile.data.birth_date, 'YYYY-MM-DD').toDate();

    vm.updateAccount = updateAccount;
    vm.updateProfile = updateProfile;
    vm.updateLocation = updateLocation;

    vm.loadProvinces = loadProvinces;
    vm.loadDistricts = loadDistricts;
    vm.loadWards = loadWards;

    function loadProvinces () {
      LocationService.loadProvinces().then(function(provinces) {
        vm.provinces = provinces.data;
      });
    }

    function loadDistricts (provinceId) {
      LocationService.loadDistricts(provinceId).then(function(districts) {
        vm.districts = districts.data.districts.data;
      });
    }

    function loadWards (districtId) {
      LocationService.loadWards(districtId).then(function(wards) {
        vm.wards = wards.data.wards.data;
      });
    }

    function updateAccount () {
      UserService.updateAccount(vm.account).then(function() {
        $mdToast.showSimple('Thao tác thành công!');
      }, function(response) {
        vm.accountErrors = response.data.errors;
      });
    }

    function updateProfile () {
      var birth_date = moment(vm.birth_date).format('YYYY-MM-DD');
      var data = angular.extend({}, vm.profile, {'birth_date': birth_date});

      UserService.updateProfile(data).then(function() {
        $mdToast.showSimple('Thao tác thành công!');
      }, function(response) {
        vm.profileErrors = response.data.errors;
      });
    }

    function updateLocation () {
      $log.log(vm.location);
      UserService.updateLocation(vm.location).then(function() {
        $mdToast.showSimple('Thao tác thành công!');
      }, function(response) {
        vm.locationErrors = response.data.errors;
      });
    }
  }
})();