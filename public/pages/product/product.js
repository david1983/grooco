app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('product', {
            url: "/product",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/product/product.tmpl.html",
                    controller: 'productCtrl as vm'
                }
            })
        })
}).controller('productCtrl', function(products){
    
})