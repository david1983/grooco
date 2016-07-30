app.component('starRating',{
	templateUrl: '/components/starRating/starRating.tmpl.html',
	controller: function(){
		this.range = function(n) {
        return new Array(n);
    };
	},
	bindings:{
		rate:'<'
	}
})