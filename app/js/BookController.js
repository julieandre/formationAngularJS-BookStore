angular.module('app.controllers')
    .controller('BookCtrl', ['$scope', 'catalog', '$routeParams', '$rootScope', '$location',  function($scope, catalog, $routeParams, $rootScope, $location) {

        catalog.getBook($routeParams.bookId).then(function (data) {
            $scope.book = data;
            $rootScope.pageTitle = "Livre : " + $scope.book.title;
            $rootScope.page = "book";
        }, function (error) {
            $rootScope.error = error;
            $location.url("/catalog");
        });

    }]);