app.controller('categoryCtrl', function ($stateParams, categories, products, $sce) {

    categories.get({ name: $stateParams.name }).then(function (result) {
        result = result.data
        console.log(result)
        this.category = {
            name: $stateParams.name,
            imgs: result[0].imgs
        }
        console.log(this.category)
        categories.get({ main: $stateParams.name }).then(function (result) {
            this.category.subCat = result.data
            // console.log({main_category: this.category.subCat[$stateParams.sub].name})
             products.get({category: this.category.name})
            .then(function(result){
               this.products = result.data;
            }.bind(this))
        }.bind(this))

       

    }.bind(this)).catch(function (err) { console.log(err) })



    
})
