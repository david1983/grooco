app.controller('categoriesCtrl', function(categories){
    
     categories.get({type: 'main'}).then(function(result){
       this.categories = result.data
       console.log(JSON.stringify(this.categories))
     }.bind(this)).catch(function(err){console.log(err)})   
          
     

     console.log(this.categories)
})
