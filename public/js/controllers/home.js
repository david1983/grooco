app.controller('homeCtrl', function(categories){
    
    categories.get({type: 'lvl1'})
    .then(function(result){ this.categories = result.data}.bind(this))
    
})
