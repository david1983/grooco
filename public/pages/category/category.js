app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('category', {
            url: "/category/:name ",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/category/category.tmpl.html",
                    controller: 'categoryCtrl as vm'

                }
            })
        })
}).controller('categoryCtrl', ['$stateParams','categories','products',
    function ($stateParams, categories, products) {

    categories.get({ name: $stateParams.name }).then(function (result) {
        result = result.data
        this.category = {
            name: $stateParams.name,
            imgs: result[0].imgs
        }
        categories.get({ main: $stateParams.name }).then(function (result) {
            this.category.subCat = result.data
            // console.log({main_category: this.category.subCat[$stateParams.sub].name})
             products.get({category: this.category.name})
            .then(function(result){
               this.products = result.data;
            }.bind(this))
        }.bind(this))
    }.bind(this)).catch(function (err) { console.log(err) })
}])
