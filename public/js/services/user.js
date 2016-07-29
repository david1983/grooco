app.service('userSrvc', function(){
    var usrSrvc = firebase.auth();
    
    return usrSrvc;
})