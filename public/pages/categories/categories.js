app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('categories', {
            url: "/categories",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/categories/categories.tmpl.html",
                    controller: 'categoriesCtrl as vm'
                }
            }),
            data:{pageTitle: 'GrooCo - Categories'}
        })
}).controller('categoriesCtrl', ['categories', function(categories){
    
     categories.get({type: 'main'}).then(function(result){
       this.categories = result.data
     }.bind(this)).catch(function(err){console.log(err)})        
}])
