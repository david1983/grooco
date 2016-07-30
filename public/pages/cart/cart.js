app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cart', {
            url: "/cart",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/cart/cart.tmpl.html",
                    controller: 'cartCtrl as vm'
                }
            })
        })
}).controller('cartCtrl', function ($rootScope,$stateParams,userSrvc, cartSrvc) {


    userSrvc.$onAuthStateChanged(function(user) {
        if (user) {
            this.user = user
            this.cart = cartSrvc(user.uid)
            console.log($rootScope.cart)
            this.cart.$watch(function(){

                this.total = this.cart.reduce(function(a,i){
                    console.log(i.rawprice)

                    if(/p/.test(i.price)){
                        i.rawprice = (i.rawprice<1) ? i.rawprice : i.rawprice/100
                    }
                    return a+= parseFloat(i.rawprice)* i.qty
                },0).toFixed(2)
            }.bind(this))
            console.log(this.cart)
        } else {
            console.log("Signed out");
        }

    }.bind(this));



})