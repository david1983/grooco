app.component('gridItems', {
    templateUrl: '/components/gridItems/gridItems.tmpl.html',
    controller: function ($window, $timeout) {

 this.randomImg = function (arr) {
                    if(!arr) return '';
                    var idx = Math.floor(Math.random() * arr.length-1) + 0                    
                    if(arr[idx]){
                        return arr[idx]
                    }else{
                        return '';
                    }
                }

        this.$onChanges = function (changesObj) {
            if (changesObj.categories && typeof changesObj.categories.currentValue != 'undefined') {
               
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

                $window.addEventListener('resize', this.setGrid)
                $timeout(function () {
                    this.setGrid();
                }.bind(this), 200)


            }
        }


    },
    bindings: {
        categories: '<',
        max: '<',
    }
})

app.directive('backImg', function () {
    function link(scope, element, attrs) {
        if(!scope.imgs) return        
        var url;
        
        if(typeof scope.imgs == 'string')
            url = scope.imgs
        else{        
            url = (scope.imgs.length>0) ? scope.imgs[0].src : false;
        }

        url = (attrs.format=='large') ? url.replace('-medium', '') : url
        
        if (url) {
            var obj = {                                
                'background-image': 'url(' + url + ')',
                'background-size': 'cover'
            }
            if(url.style)
               obj =  Object.assign({ 
                   'border-color' : url.style.split(':')[1],
                   'background' :  url.style.split(':')[1]
                },obj)
            element.css(obj);
        }

    };

    return {
        scope: {format: '&format',imgs: '=backImg'}, 
        link: link }
});