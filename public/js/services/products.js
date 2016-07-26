
app.service('products', function ($http) {
    return {
        get: function(options){
              return $http.get('/api/products',{params:options})      
        }
    }
})
