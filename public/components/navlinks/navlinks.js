app.component("navLinks", {
    templateUrl: '/components/navlinks/navlinks.tmpl.html',
    controller: function($state){
        this.state = $state.current;
    },
    bindings:{
        categories: '='
    } 
});