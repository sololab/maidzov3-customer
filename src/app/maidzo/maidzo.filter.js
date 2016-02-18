(function() {
  'use strict';

  angular
    .module('app.maidzo')
    .filter('lavDate', lavDate)
    .filter('currency', currency)
    .filter('exchange', exchange)
    .filter('transactionStatus', transactionStatus)
    .filter('orderStatus', orderStatus)
    .filter('historyKeytoName', historyKeytoName);

  function lavDate () {
    return function(date) {
      var original = date.replace(/-/g, '/');
      // return Date.parse(original + ' -0000');
      return Date.parse(original, 'Asia/Ho_Chi_Minh');
      // return moment(date);
    };
  }

  function currency () {
    return function (input, currency) {
      if (isNaN(input)) {
        return input;
      } else if (currency === 'usd') {
        return accounting.formatMoney(input, {symbol: '$', format: '%s%v', precision: 2});
      } else if (currency === 'cny') {
        return accounting.formatMoney(input, {symbol: '¥', format: '%s%v', precision: 2});
      } else if (currency === 'vnd') {
        return accounting.formatMoney(input, {symbol: '₫', format: '%v%s', precision: 0});
      }
    };
  }

  function exchange () {
    return function (input, rate) {
      if (isNaN(input)) {
        return input;
      } else {
        return accounting.formatMoney(input * rate, {symbol: '₫', format: '%v%s', precision: 0});
      }
    };
  }

  function transactionStatus (localStorageService) {
    return function(input) {
      if (isNaN(input)) {
        return input;
      } else {
        var statuses = localStorageService.get('shop.statuses').transactions;

        return statuses[input];
      }
    };
  }

  function orderStatus (localStorageService) {
    return function(input) {
      if (isNaN(input)) {
        return input;
      } else {
        var statuses = localStorageService.get('shop.statuses').orders;

        return statuses[input];
      }
    };
  }

  function historyKeytoName () {
    return function(input) {
      if (input === 'note') {
        return 'Ghi chú';
      } else if (input === 'exchange_rate') {
        return 'Tỉ giá';
      } else if (input === 'paid_quantity') {
        return 'Số lượng mua';
      } else if (input === 'paid_price') {
        return 'Giá mua';
      } else if (input === 'paid_shipping') {
        return 'Phí ship';
      } else if (input === 'quantity_arrived_local') {
        return 'Số lượng tại kho VN';
      } else if (input === 'quantity_arrived_foreign') {
        return 'Số lượng tại kho QT';
      } else if (input === 'service_charge') {
        return 'Phí dịch vụ';
      } else if (input === 'status_id') {
        return 'Trạng thái';
      } else {
        return input;
      }
    };
  }
})();