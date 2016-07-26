
app.service('categories', function ($http, $q) {
    return {
        // imgRef : (!cat_name) ? 'category_imgs' : 'category_imgs/' + cat_name,
        get : function (options) {
            console.log('get')                                       
            return $http.get('/api/categories',{params:options})          
        }
    };
    
})
