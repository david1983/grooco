app.controller('categoriesCtrl', function(categories){
    
     categories.get({type: 'lvl1'}).then(function(result){
       this.categories = result.data
     }.bind(this)).catch(function(err){console.log(err)})   
          
     

     console.log(this.categories)
})
