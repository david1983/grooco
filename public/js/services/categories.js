
app.service('categories', [ '$http','$q',
    function ($http, $q) {
        return {
            // imgRef : (!cat_name) ? 'category_imgs' : 'category_imgs/' + cat_name,
            get : function (options) {
                return $http.get('/api/categories',{params:options})
            }
        };

    }])
