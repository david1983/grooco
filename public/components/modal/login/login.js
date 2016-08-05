app.component('loginCmp',{
    templateUrl: '/components/modal/login/login.tmpl.html',
    controller: function(userSrvc){

        this.$onChanges = function(){
            this.showLogin=false
            this.showRegister=false
            this.error = false;
        }

        this.service = userSrvc;

        this.checkEmail = function(email){
            if(typeof email =='undefined') return false;
            var a =  /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi.test(email)
            return !a;
        }

        this.register = function(){
            if(!this.newUser) return this.error = 'You need to specify an email and a password'
            if(!this.newUser.email) return this.error = 'You need to specify a valid email'
            if(this.newUser.password == this.newUser.confirmPassword){
                this.service.$createUserWithEmailAndPassword(this.newUser.email, this.newUser.password).then(function(){
                    this.state = false;
                }.bind(this)).catch( function(error){
                    this.error = error.message
                    console.log(error)
                }.bind(this))
            }else{
                this.error  = 'Password doesn\'t match';
            }
        }

        this.login = function(options){
            userSrvc.login(options).then(function(){
                this.state = false;
                this.error = false;
            }.bind(this)).catch(function(error){
                this.error = error.message
                console.log(error)
            }.bind(this))
        }

    },
    bindings:{
        reset: '<', state: '='
    }
})