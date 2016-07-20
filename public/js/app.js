var app = angular.module('grooco', ['ui.router']);


var defaultRoute = {
    navbar: { templateUrl: "/js/templates/header.tmpl.html" },
    content: {
        templateUrl: "/js/templates/home.tmpl.html"
    },
    footer: { templateUrl: "/js/templates/footer.tmpl.html" },
}

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/404");
    //
    // Now set up the states
    $stateProvider
        .state('notfound', {
            url: "/404",
            templateUrl: "/js/templates/404.tmpl.html",
        })
        .state('home', {
            url: "/",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/js/templates/home.tmpl.html"
                }
            })
        })
        .state('list', {
            url: "/list",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/js/templates/list.tmpl.html"
                }
            })
        })
        .state('product', {
            url: "/product",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/js/templates/product.tmpl.html"
                }
            }),
            controller: function ($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        })
        .state('category', {
            url: "/category",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/js/templates/category.tmpl.html"
                }
            }),
            controller: function ($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
});