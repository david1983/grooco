app.component("navBar", {
    templateUrl: '/components/navbar/navbar.tmpl.html',
    controller:function(userSrvc,$cookies, cartSrvc,$timeout){
        userSrvc.$onAuthStateChanged(function(){
            this.user = userSrvc.$getAuth()
            this.signOut = function(){
                this.show=false;
                $timeout(function(){userSrvc.$signOut()},300);
            }
        }.bind(this))
    }
});