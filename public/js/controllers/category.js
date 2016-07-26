app.controller('categoryCtrl', function ($stateParams, categories, products, $sce) {

    categories.get({ name: $stateParams.name }).then(function (result) {
        result = result.data
        this.category = {
            name: $stateParams.name,
            img: result.img
        }
        categories.get({ main: $stateParams.name }).then(function (result) {
            this.category.subCat = result.data
            console.log({main_category: this.category.subCat[$stateParams.sub].name})
             products.get({category: this.category.subCat[$stateParams.sub].name})
            .then(function(result){
                this.products = result.data.map(function(i){
                    i.summary =  $sce.trustAsHtml(i.summary);
                    return i;
                });
            }.bind(this))
        }.bind(this))

       

    }.bind(this)).catch(function (err) { console.log(err) })



    
})
