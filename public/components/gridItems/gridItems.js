app.component('gridItems', {
    templateUrl: '/components/gridItems/gridItems.tmpl.html',
    controller: function ( categories, $window) {        
        var Categories = new categories()

        console.log(Categories)

        Categories.get()
            .then(function(res){
                this.categories = res
            }.bind(this)) 
        
        this.setGrid = function () {
            
            var cols = ($window.innerWidth > 768) ? 4 : 3;            
            max = this.max, this.grid = [];
            var total = 0;
            for (var i = 0; i < this.max; i++) {
                this.grid[i] = (total > cols - 2) ? 1 : Math.floor(Math.random() * 2) + 1;
                total += this.grid[i];
                if (total == cols) total = 0;
            }

            for (var i = this.max - 1; i > this.max - 3; i--) {
                if (total > 0) {
                    total -= this.grid[i];
                    this.max--
                }
            }            
        }

        $window.addEventListener('resize', this.setGrid )
        this.setGrid();

    },
    bindings: {
        max: '<',
    }
})

app.directive('backImg', function(){
    function link(scope, element, attrs){
        var url = attrs.backImg;        
        if(url){
            element.css({
                'background-image': 'url(' + url +')',  
                'background-size': 'cover'                                             
            });
        }
        
    };

    return {link: link}
});