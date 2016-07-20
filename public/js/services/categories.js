app.factory('categories',function(){
     return firebase.database()
            .ref('categories')            
            .once('value')
     
})