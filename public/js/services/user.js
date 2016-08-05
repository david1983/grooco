app.service('userSrvc', ['$rootScope','$firebaseAuth','$firebaseObject','$cookies','$firebaseArray','$q',
    function ($rootScope, $firebaseAuth, $firebaseObject,$cookies, $firebaseArray,$q) {
    var usrSrvc = $firebaseAuth();

    usrSrvc.$onAuthStateChanged(function() {
        this.user = usrSrvc.$getAuth();
        if(this.user){
            $cookies.put('loggedIn',true);
        }
        else{
            $cookies.remove('loggedIn')
            $cookies.remove('hasCart')
        }

    })


    usrSrvc.login = function (options) {
        var loginWrapper = function(options){
            if (options.provider == 'google' || options.provider == 'facebook') {
                return usrSrvc.$signInWithPopup(options.provider)
            } else {
                return usrSrvc.$signInWithEmailAndPassword(options.email, options.password)
            }
        }



        return new $q(function(resolve, reject){
            loginWrapper(options).then(function(fUser){
                if(typeof fUser.user == 'undefined') fUser.user = fUser
                var ref= firebase.database().ref('profiles/'+fUser.user.uid)
                var profile = $firebaseObject(ref)

                profile.uid     = fUser.user.uid;
                profile.image   = fUser.user.providerData[0].photoURL;
                profile.email   = fUser.user.email;
                profile.name    = fUser.user.displayName;
                profile.$bindTo($rootScope,'profile')
                resolve(fUser);
            }).catch(function(err){
                reject(err)
            })
        })

    }

    usrSrvc.setHasCart = function(uid,val){
        var profile = usrSrvc.profile(uid);
        profile.$loaded()
            .then(function(data) {
                profile.hasCart = val;
                profile.$save();
            })
            .catch(function(error) {
                console.error("Error:", error);
            });

    }



    return usrSrvc;
}])