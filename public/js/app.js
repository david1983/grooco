var defaultRoute = {
    navbar: { templateUrl: "/components/header/header.tmpl.html" },
    content: {
        templateUrl: "/templates/home.tmpl.html"
    },
    footer: { templateUrl: "/components/footer/footer.tmpl.html" },
}

var app = angular.module('grooco', ['ui.router','ngAnimate','firebase']);
app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");


    $stateProvider
        .state('home', {
            url: "/",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/home/home.tmpl.html",
                    controller: 'homeCtrl as vm'
                }
            })
        })
        .state('products', {
            url: "/products?search",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/products/products.tmpl.html",
                    controller: 'productsCtrl as vm'
                }
            })
        })
        .state('product', {
            url: "/product",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/product/product.tmpl.html",
                    controller: 'productCtrl as vm'
                }
            })
        })
        .state('categories', {
            url: "/categories",            
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/categories/categories.tmpl.html",
                    controller: 'categoriesCtrl as vm'
                }
            })
        })
        .state('category', {
            url: "/category/:name/:sub ",            
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/category/category.tmpl.html",
                    controller: 'categoryCtrl as vm'

                }
            })
        })
        .state('cart', {
            url: "/cart",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/cart/cart.tmpl.html",
                    controller: 'cartCtrl as vm'

                }
            })
        })
        .state('contacts', {
            url: "/contacts",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/contacts/contacts.tmpl.html",
                    controller: 'contactsCtrl as vm'

                }
            })
        })
        .state('about', {
            url: "/about",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/about/about.tmpl.html",
                }
            })
        });
})