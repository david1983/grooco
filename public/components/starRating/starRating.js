app.component('starRating',{
	template: `<div style="font-size:1.5em;">
	<i class="fa" ng-class="{'fa-star' : $index+1<=$ctrl.rate, 'fa-star-o': $index+1>$ctrl.rate}" ng-repeat="a in $ctrl.range(5) track by $index"></i>  
</div>`,
	controller: function(){
		this.range = function(n) {
        return new Array(n);
    };
	},
	bindings:{
		rate:'<'
	}
})