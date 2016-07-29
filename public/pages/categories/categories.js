app.controller('categoriesCtrl', function(categories){
    
     categories.get({type: 'main'}).then(function(result){
       this.categories = result.data
     }.bind(this)).catch(function(err){console.log(err)})        
})
