angular.module('app', ['app.controllers', 'app.filters', 'app.services', 'app.directives', 'ngRoute'])
    .config(function ($routeProvider) {
    $routeProvider.when('/catalog', {
        templateUrl: 'partials/catalog.html',
        controller: 'CatalogCtrl'
    });
    $routeProvider.when('/book/:bookId', {
        templateUrl: 'partials/book.html',
        controller: 'BookCtrl'
    });
    $routeProvider.when('/cart', {
        templateUrl: 'partials/cart.html',
        controller: 'CartCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/catalog'
    });
});

angular.module('app.controllers', ['ngRoute', 'ngSanitize'])
    .controller("BigbyCtrl", ['$scope', '$rootScope', '$location', 'cart', function ($scope, $rootScope, $location, cart) {

        $scope.isCatalog = function () {
            return $rootScope.page == "catalog";
        };

        $scope.isCart = function () {
            return $rootScope.page == "cart";
        };

        $scope.addToCart = function (book) {
            cart.add(book);
            $location.url('/cart');
        };

        $scope.maxRating = 5;


    }]);

angular.module('app.filters', [])
    .filter('interval', function($parse) {
        return function(array, property, min, max) {

            var getter = $parse(property);
            return array && array.filter(function(item) {
                var value = getter(item);
                return (!min || value >= min) && (!max || value <= max);
            });
        }
    });