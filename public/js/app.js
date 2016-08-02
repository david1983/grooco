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
                    controller: function(){
                        $(document).ready(function(){
                            var myLatlng = new google.maps.LatLng(37.4419, -122.1419);

                            var mapOptions = {
                                zoom: 4,
                                center: myLatlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }

                            var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: 'My Place!'
                            });
                        })
                    },
                }
            }),
            data:{pageTitle: 'GrooCo - About'}
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
    }]).directive('title', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            link: function() {

                var listener = function(event, toState) {
                    console.log(toState.data)
                    $timeout(function() {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                            ? toState.data.pageTitle
                            : 'Default title';
                        document.title = $rootScope.title
                    });
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);;