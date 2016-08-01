
app.service('products', ['$http',
    function ($http) {
        return {
            get: function(options){
                return $http.get('/api/products',{params:options})
            }
        }
    }])
