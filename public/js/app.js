var defaultRoute = {
    navbar: { templateUrl: "/templates/header.tmpl.html" },
    content: {
        templateUrl: "/templates/home.tmpl.html"
    },
    footer: { templateUrl: "/templates/footer.tmpl.html" },
}


var app = angular.module('grooco', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/404");

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
        .state('list', {
            url: "/list",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/list.tmpl.html"
                }
            })
        })
        .state('product', {
            url: "/product",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/templates/product.tmpl.html"
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
                    templateUrl: "/templates/category.tmpl.html"
                }
            }),
            controller: function ($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
}).run(function ($rootScope, firebaseObj, $timeout) {

    firebaseObj.list('categories').then(function (res) {
        $rootScope.$apply(function () {
            $rootScope.categories = res.val();
            $timeout(function () {
                fadeInElems()
            }, 200)
        });
    });

});

function fadeInElems() {
    var elements = document.querySelectorAll(".fade-in-element");    
    elements.forEach(function (element) {        
        $(element).addClass('js-fade-element-hide');
    }, this);

    handleFade();
    $(window).scroll(handleFade);
}

function handleFade() {
    if ($(".fade-in-element").length > 0) {
        var elements = document.querySelectorAll(".fade-in-element");        
        elements.forEach(function (element) {
            var elementTopToPageTop = $(element).offset().top;
            var windowTopToPageTop = $(window).scrollTop();
            var windowInnerHeight = window.innerHeight;
            var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
            var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
            var distanceFromBottomToAppear = 20;

            if (elementTopToWindowBottom > distanceFromBottomToAppear) {
                $(element).addClass('js-fade-element-show');
            }
            else if (elementTopToWindowBottom < 0) {
                $(element).removeClass('js-fade-element-show');
                $(element).addClass('js-fade-element-hide');
            }
        })
    }
}