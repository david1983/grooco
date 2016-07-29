angular.module('grooco').component('breadcrumbs',{
    templateUrl: '/components/breadcrumbs/breadcrumbs.tmpl.html',
    controller: function($state){

        this.state = $state
        this.goTo = function(state){
            $state.go(state.name,state.params)
        }

    },
    bindings:{ history: '='}
})