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
            }),
            data:{pageTitle: 'GrooCo - Home'}
        })
}).controller('homeCtrl', ['categories',
    function(categories){
    
    categories.get({type: 'lvl1'})
    .then(function(result){ 
        this.categories = result.data
    }.bind(this))
    
}])
