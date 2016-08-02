app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('payment', {
            url: "/payment",
            views: Object.assign(defaultRoute, {
                content: {
                    templateUrl: "/pages/payment/payment.tmpl.html",
                    controller: 'contactsCtrl as vm'
                }
            })
        })
}).controller('contactsCtrl',['$rootScope','$stateParams','userSrvc','cartSrvc',
    function ($rootScope,$stateParams,userSrvc, cartSrvc) {
        this.payment = {
            name: '',
            card: '',
            expiry: '',
            cv2: '',
            postcode: ''
        }
        this.error = {}

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

        this.pay = function(){
            var isOk = true;
            for(k in this.payment){
                if(this.payment[k]==''){
                    this.error[k] = 'The "' + k + '" field is required'
                    isOk = false;
                }
                else this.error[k] = false
            }
            if(isOk) alert('We are sorry but the payment feature is not yet implemented')
        }

    }])