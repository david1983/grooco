app.factory('cartSrvc', ['$rootScope','userSrvc','$firebaseArray','$cookies',
    function($rootScope, userSrvc,$firebaseArray,$cookies){
        return function(uid){
            if(!uid) return {error: 'you have to login first'}
            var ref = firebase.database().ref('carts/' + uid)
            var cart = $firebaseArray(ref);
            cart.$loaded().then(function(){
                if(cart.length==0)$cookies.remove('hasCart')
            })


            cart.item =  function(product){
                return{
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    rawprice: product.rawprice,
                    qty: product.userQty
                }
            }
            cart.add = function(product){
                $cookies.put('hasCart', true)
                this.$add(product)
            }
            cart.remove = function(product){
                this.$remove(product)
                if(this.length<=1)$cookies.remove('hasCart')
            }
            return cart;
        }
    }])