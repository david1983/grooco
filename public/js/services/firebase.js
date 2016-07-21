app.service('firebaseObj',function(){
    return{
        list: function(refName){
            return firebase.database()
                    .ref(refName)            
                    .once('value')
        } 
    }
     
     
})