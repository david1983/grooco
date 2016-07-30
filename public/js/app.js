var defaultRoute = {
    navbar: { templateUrl: "/components/header/header.tmpl.html" },
    content: {
        templateUrl: "/templates/home.tmpl.html"
    },
    footer: { templateUrl: "/components/footer/footer.tmpl.html" },
}

var app = angular.module('grooco', ['ui.router','ngAnimate','firebase','ngCookies']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('about', {
            url: "/about",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/about/about.tmpl.html",
                }
            })
        });
})

angular.module('grooco')
    .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            var limit = Math.ceil(window.innerWidth/200)
            if(from.name=='') $rootScope.history = [];
            to.params = JSON.parse(JSON.stringify(toParams))
            var newObj = JSON.parse(JSON.stringify(to))

            $rootScope.history.push(newObj)
            if($rootScope.history.length>limit) $rootScope.history.shift();
        });
    }]);