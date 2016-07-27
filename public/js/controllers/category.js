app.controller('categoryCtrl', function( $stateParams, categories, products){
        this.params = $stateParams
     var Categories=  new categories($stateParams.name)
     var Products = new products();

     
     Categories.get().then(function(result){
         console.log(result)
        this.category = {
                name: $stateParams.name.replace(/_/g, ' '),
                img: (result.imgs && result.imgs.length>=0) ? result.imgs[0] : false,
                subCat: (result.categories) ? result.categories[$stateParams.name] : []
            }

            var searchTerm =  (result.categories) ? 'category:' + this.category.subCat[$stateParams.sub] : 'main_category:' + this.category.name
        Products.search(searchTerm).then(function(res){
            console.log(res)
        })
     }.bind(this))   
          
     

     console.log(this.categories)
})
