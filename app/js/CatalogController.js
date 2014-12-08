angular.module('app.controllers').controller('CatalogCtrl', ['$scope', 'catalog', '$rootScope', '$filter', '$location', 'pageState', function($scope, catalog, $rootScope, $filter, $location, pageState) {

    catalog.getList().then(function (data) {
        $scope.books = data;
    });

    var options = [
        {
            value : "price",
            rev : false,
            title : "Prix croissant"
        },
        {
            value : "price",
            rev : true,
            title : "Prix décroissant"
        },
        {
            value : "title",
            rev : false,
            title : "Titre"
        }
    ];

    $scope.state = pageState('/catalog', {
        orderBys : options,
        orderBy : options[0]
    });




    //$scope.state.orderBys = $scope.state.orderBys || [
    //    {
    //        value : "price",
    //        rev : false,
    //        title : "Prix croissant"
    //    },
    //    {
    //        value : "price",
    //        rev : true,
    //        title : "Prix décroissant"
    //    },
    //    {
    //        value : "title",
    //        rev : false,
    //        title : "Titre"
    //    }
    //];
    //
    //$scope.state.orderBy = $scope.state.orderBy || $scope.state.orderBys[0];

    $rootScope.pageTitle = "Catalogue";
    $rootScope.page = "catalog";

}]);
