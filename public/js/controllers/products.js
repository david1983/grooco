app.controller('productsCtrl', function($stateParams, products){
    console.log($stateParams.search)
    var searchObj = ($stateParams.search) ? {name: $stateParams.search }: {name: 'spaghetti', hasRating: true, averageRating:{$gt: 4.9}}
     console.log(searchObj)
    products.get(searchObj)
        .then(function(result){
            console.log(result)
            this.products = result.data
        }.bind(this))
})