app.component('loginCmp',{
    templateUrl: '/components/modal/login/login.tmpl.html',
    controller: function(userSrvc){
        this.service = userSrvc;
    }
})