app.component('gridItems', {
    templateUrl: '/components/gridItems/gridItems.tmpl.html',
    controller: function ($window, $timeout) {
        this.cols = ($window.innerWidth > 768) ? 4 : 3;
        this.randomImg = function (arr) {
            if (!arr) return '';
            var idx = Math.floor(Math.random() * arr.length - 1) + 0
            if (arr[idx]) {
                return arr[idx]
            } else {
                return '';
            }
        }

        this.$onChanges = function (changesObj) {
            if (changesObj.categories && typeof changesObj.categories.currentValue != 'undefined') {               
                $timeout(function () {
                    this.arr = setGrid(changesObj.categories.currentValue, this.cols, this.ratingLimit)
                }.bind(this), 200)
            }
        }

         $window.addEventListener('resize', function () {
                    this.cols = ($window.innerWidth > 768) ? 4 : 3;
                    this.arr = setGrid(this.categories, this.cols, this.ratingLimit)
                }.bind(this))
    },
    bindings: {
        ratingLimit: '<',
        categories: '<',
        max: '<',
    }
})

app.directive('backImg', function () {
    function link(scope, element, attrs) {
        if (!scope.imgs) return
        var url;

        if (typeof scope.imgs == 'string')
            url = scope.imgs
        else {
            url = (scope.imgs.length > 0) ? scope.imgs[0].src : false;
        }

        url = (attrs.format == 'large') ? url.replace('-medium', '') : url

        if (url) {
            var obj = {
                'background-image': 'url(' + url + ')',
                'background-size': 'cover',
                'background-position': '50% 50%'
            }
            if (url.style)
                obj = Object.assign({
                    'border-color': url.style.split(':')[1],
                    'background': url.style.split(':')[1]
                }, obj)
            element.css(obj);
        }

    };

    return {
        scope: { format: '&format', imgs: '=backImg' },
        link: link
    }
})
    .directive('gridItem', function () {
        return {
            link: function (scope, elem, attrs) {
                var cols = attrs.cols;
                var margin = attrs.margin || 0
                var width = 100 / cols - (margin * 2);
                if (attrs.big == 2) {
                    width = 100 / (cols / 2) - (margin * 2);
                }
                angular.element(elem).css({
                    width: width + '%',
                    margin: margin + '%'
                })
            }
        }
    })
    ;


function sortArrByVal(arr, val_name) {
    return arr.sort(function (a, b) {
        if (a[val_name] > b[val_name]) {
            return 1;
        }
        if (a[val_name] < b[val_name]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })
}

function setGrid(cat, cols, ratingLimit) {
    cat = cat.map(function (i) { i.size = (i.rating > ratingLimit) ? 2 : 1; return i; })

    var big = cat.filter(function (i) { if (i.size == 2) return i })
    var small = cat.filter(function (i) { if (i.size == 1) return i })
    big = sortArrByVal(big, 'averageRating');
    small = sortArrByVal(small, 'averageRating');

    var row = []
    var arr = []
    var n = 0;
    while (big.length > 0 || small.length > 0) {
        var rowVal = row.reduce(function (a, i) {  return a += i.size }, 0) 
        if ( rowVal == cols) {
            arr.push(row); row = []; n++;
        }
        if (big.length == 0 && small.length == 0) return;
        if (small.length == 0) {
            row.push(big[0]);
            big.shift()
        } else if (big.length > 0 && cols-rowVal < 2 || big.length == 0) {
            row.push(small[0]);
            small.shift()
        } else {
            console.log(n)
            if (typeof arr[n - 1] != 'undefined') {

                if (arr[n - 1][0].size == 2&&row.length==0) {
                    row.push(small[0]);
                    small.shift()
                } else {
                    row.push(big[0]);
                    big.shift()
                }

            } else {
                row.push(big[0]);
                big.shift()

            }


        }


    }
    if (row.length > 0) arr.push(row)
    return arr;
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}