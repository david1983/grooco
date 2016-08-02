app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cart', {
            url: "/cart",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/cart/cart.tmpl.html",
                    controller: 'cartCtrl as vm',
                }
            }),
            data:{pageTitle: 'GrooCo - Cart'}
        })
}).controller('cartCtrl', ['$rootScope','$stateParams','userSrvc','cartSrvc',
    function ($rootScope,$stateParams,userSrvc, cartSrvc) {


    userSrvc.$onAuthStateChanged(function(user) {
        if (user) {
            this.user = user
            this.cart = cartSrvc(user.uid)



            this.cart.$watch(function(){
                if(typeof this.cart == 'undefined') return;
                this.total = this.cart.reduce(function(a,i){
                    if(/p/.test(i.price)){
                        i.rawprice = (i.rawprice<1) ? i.rawprice : i.rawprice/100
                    }
                    return a+= parseFloat(i.rawprice)* i.qty
                },0).toFixed(2)

            }.bind(this))
        } else {
            console.log("Signed out");
        }

    }.bind(this));



}])