angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    $scope.loadData = function() {
      ShoppingList.get().success(function (data) {
        console.log(data[0].items);
        $scope.shoppinglistItems = data[0].items;
      });
    };

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      console.log(item);
      if (item !== '') {
        ShoppingList.create(item).success(function () {
          $scope.loadData();
        });
        // read for next entry
        $scope.formData = {};
      }
    };

    $scope.updateShoppingItem = function (itemId) {
      console.log(itemId);
    };

    // setup the data :)
    $scope.formData = {};
    $scope.loading = true;
    $scope.loadData();

    $scope.shoppinglists = [
      {'name': 'Maria und Livio'},
      {'name': 'At my parents'}
    ];

    // set the type ahead data -> Move me to service!
    $http.get('/category').success(function (data) {
      $scope.products = data;
    });
  }
]);
