angular.module('app.controllers')
    .controller('CartCtrl', ['$scope', '$http', '$routeParams', '$rootScope', 'cart', function($scope, $http, $routeParams, $rootScope, cart) {

        $rootScope.pageTitle = "Panier";
        $rootScope.page = "cart";

        $scope.cart = cart;


    }]);