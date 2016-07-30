app.component("navLinks", {
    templateUrl: '/components/navlinks/navlinks.tmpl.html',
    controller: function($rootScope, $state,$cookies, userSrvc){
        this.state = $state.current;
        this.signOut = userSrvc.$signOut;
        this.loggedIn=false
        $rootScope.$watch(function() { return [$cookies.getObject('hasCart'), $cookies.getObject('loggedIn')]; },function(){
            this.hasCart = $cookies.getObject('hasCart') || false
            this.loggedIn = $cookies.getObject('loggedIn') || false
        }.bind(this),true)
    },
    bindings:{
        showLogout: '<'
    }
});