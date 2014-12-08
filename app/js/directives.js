var directives = angular.module("app.directives", []);

directives.directive('myRating', function() {
    return function(scope, element, attr) {

        scope.$watchGroup([attr.myRating, attr.myRatingMax], function (value) {
            var html = "";
            for(var i = 0; i < (value[1] || value[0]); i++) {
                if(i < value[0]) {
                    html += "<img src='img/star.png'>";
                }
                else {
                    html += "<img src='img/empty-star.png'>";
                }
            }
            element.html(html);
        });
    };
});