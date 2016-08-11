// Initialize Firebase
var config = {
    apiKey: "AIzaSyAG1u29W1E_Y3ZXr2ynUyC3dhee3NlbI_M",
    authDomain: "grooco-3a6e4.firebaseapp.com",
    databaseURL: "https://grooco-3a6e4.firebaseio.com",
    storageBucket: "grooco-3a6e4.appspot.com"
};
firebase.initializeApp(config);

// the defaultRoute Object is used to define the default view composed by Header, Content, Footer
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
            // Object.assign is used to extend the defaultRoute with custom params.
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/about/about.tmpl.html",
                    controller: function(){
                        $(document).ready(function(){
                            var myLatlng = new google.maps.LatLng(51.5074 , 0.1278);

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
                    }
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
            $(document).ready(function(){window.scrollTo(0, 0);})
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
                            : 'Grooco';
                        document.title = $rootScope.title
                    });
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);;