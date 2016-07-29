app.controller('productsCtrl', function ($stateParams, products) {    
    var searchObj = ($stateParams.search) ? { name: $stateParams.search } : { hasRating: true, averageRating: { $gt: 4.9 } }    
    products.get(searchObj)
        .then(function (result) {            
            this.products = result.data
        }.bind(this))
})