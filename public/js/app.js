var defaultRoute = {
    navbar: { templateUrl: "/templates/header.tmpl.html" },
    content: {
        templateUrl: "/templates/home.tmpl.html"
    },
    footer: { templateUrl: "/templates/footer.tmpl.html" },
}

var app = angular.module('grooco', ['ui.router','ngAnimate']);
app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");


    $stateProvider
        .state('notfound', {
            url: "/404",
            templateUrl: "/templates/404.tmpl.html",
        })
        .state('home', {
            url: "/",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/home.tmpl.html",
                    controller: 'homeCtrl as vm'
                }
            })
        })
        .state('products', {
            url: "/products",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/products.tmpl.html"
                }
            })
        })
        .state('product', {
            url: "/product",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/product.tmpl.html"
                }
            })
        })
        .state('categories', {
            url: "/categories",            
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/categories.tmpl.html",
                    controller: 'categoriesCtrl as vm'
                }
            })
        }) .state('category', {
            url: "/category/:name/:sub ",            
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/category.tmpl.html",
                    controller: 'categoryCtrl as vm'

                }
            })
        });
})