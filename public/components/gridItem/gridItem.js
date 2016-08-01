app.directive('gridItem', function ($window) {
    return {
        scope:{ cols: '=cols'},
        link: function (scope, elem, attrs) {

            scope.rerender = function(){
                var cols = scope.cols;
                var margin = attrs.margin || 0
                var width = 100 / cols - (margin * 2);
                if (attrs.big == 2 && cols>1) {
                    width = 100 / (cols / 2) - (margin * 2);
                }
                angular.element(elem).css({
                    float: 'left',
                    width: width + '%',
                    margin: margin + '%'
                })
            }
            scope.rerender();
            $window.addEventListener('resize', function () {
                scope.cols = ($window.innerWidth > 768) ? 4 : ($window.innerWidth > 450) ? 3: 1;
                scope.rerender()
            }.bind(this))

        }
    }
})
