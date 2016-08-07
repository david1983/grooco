app.component('gridItems', {
    templateUrl: '/components/gridItems/gridItems.tmpl.html',
    controller: function ($window, $timeout) {
        this.cols = ($window.innerWidth > 768) ? 4 : ($window.innerWidth > 450) ? 3: 1;

        this.$onChanges = function (changesObj) {
            if (changesObj.categories && typeof changesObj.categories.currentValue != 'undefined') {
                $timeout(function () {
                    this.arr = setGrid(changesObj.categories.currentValue, this.cols, this.ratingLimit)
                }.bind(this), 200)
            }
        }

        $window.addEventListener('resize', function () {
            this.cols = ($window.innerWidth > 768) ? 4 : ($window.innerWidth > 450) ? 3: 1;
            this.arr = setGrid(this.categories, this.cols, this.ratingLimit)
        }.bind(this))
    },
    bindings: {
        ratingLimit: '<',
        categories: '<',
        max: '<',
    }
})


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
            n++;
            console.log(n)
            if(n%2==0){
                row.push(small[0])
                small.shift()
            }else{
                row.push(big[0])
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