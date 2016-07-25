app.controller('categoryCtrl', function($scope, $stateParams, categories){
     var Categories=  new categories($stateParams.name)
     console.log(Categories)
     Categories.get().then(function(result){
         console.log(result)
        this.category = {
                name: $stateParams.name.replace(/_/g, ' '),
                img: (result.imgs && result.imgs.length>=0) ? result.imgs[0] : false,
                subCat: (result.categories) ? result.categories[$stateParams.name] : []
            }
     }.bind(this))   
          
     

     console.log(this.categories)
})
