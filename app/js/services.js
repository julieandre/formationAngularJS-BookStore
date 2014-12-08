var services = angular.module("app.services", []);

services.value('tva', 21);

services.factory('catalog', function($http, $q) {

    var httpPromise = $http.get('https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i').
        then(function(response) {
            return response.data;
        });

    return {
        getList : function() {
            return httpPromise;
        },
        getBook : function(id) {
            return httpPromise.then(function (data) {
                for(var i = 0; i < data.length; i++) {
                    if(data[i]._id.$oid == id) {
                        return data[i];
                    }
                }
                throw "Book not found";
            });
        }
    }
});

services.factory('pageState', function($cacheFactory) {
    var cache = $cacheFactory('pageState');
    return function(pageId, initialValue) {
        return cache.get(pageId) || cache.put(pageId, initialValue);
    };
});

services.factory('cart', ['tva', function(tva) {
    return {
        rows: [ /*{ book: book, quantity: 1 }*/ ],
        add: function(book) {

            var pos = -1;
            for(var i = 0; i < this.rows.length; i++) {
                if(this.rows[i].book._id.$oid == book._id.$oid) {
                    pos = i;
                }
            }

            if(pos == -1) {
                this.rows.push({book: book, quantity: 1});
            }
            else {
                this.rows[pos].quantity ++;
            }
        },
        remove: function(row) {
            this.rows.splice(row, 1);
        },
        amountWithoutTax : function(row) {
            return row.quantity * row.book.price;
        },
        amountWithTax : function(row) {
            return row.quantity * row.book.price * (1 + (tva / 100));
        },
        totalWithoutTax : function() {
            var result = 0;
            for(var i = 0; i < this.rows.length; i++) {
                result += this.amountWithoutTax(this.rows[i]);
            }

            return result;
        },
        totalWithTax : function() {
            var result = 0;
            for(var i = 0; i < this.rows.length; i++) {
                result += this.amountWithTax(this.rows[i]);
            }
            return result;
        },
        isEmpty: function() {
            return this.rows.length == 0;
        },
        isBold : function (row) {
            return this.amountWithoutTax(row) > 1000;
        }
    };
}]);