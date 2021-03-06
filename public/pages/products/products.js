app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('products', {
            url: "/products?search",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/products/products.tmpl.html",
                    controller: 'productsCtrl as vm'
                }
            }),
            data:{pageTitle: 'GrooCo - Products'}
        })
}).controller('productsCtrl', ['$stateParams','products',
    function ($stateParams, products) {
    this.search = $stateParams.search;
    var searchObj = ($stateParams.search) ? { name: $stateParams.search } : { hasRating: true, averageRating: { $gt: 4.9 } }    
    products.get(searchObj)
        .then(function (result) {            
            this.products = result.data
        }.bind(this))
}])