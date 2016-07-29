app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('contacts', {
            url: "/contacts",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/contacts/contacts.tmpl.html",
                    controller: 'contactsCtrl as vm'

                }
            })
        })
}).controller('contactsCtrl',function(){
    
})