app.factory('cartSrvc', function($firebaseArray){
    return function(ref_url){
        var ref = firebase.database().ref(ref_url)
        return $firebaseArray(ref);
    }
})