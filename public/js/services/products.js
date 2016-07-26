
app.factory('products', function (firebaseObj, $q) {
    function Categories(product_id) {

        this.ref = (!product_id) ? 'products/' : 'products/' + product_id;

        this.get = function () {
            var ref = this.ref;
            return new $q(function (resolve, reject) {
                firebaseObj.list(ref).then(function (prods) {
                    resolve(prods.val())
                })
            })
        }

        this.search = function (search,options) {
            if(typeof options == 'undefined') options={};
            var queue = firebase.database().ref('search')

            return new $q(function (resolve, reject) {
                var reqRef = queue.child('request').push({ index: 'firebase', type: 'products', query: search, options: options });
                queue.child('response/' + reqRef.key).on('value', function fn(snap) {
                    if (snap.val() !== null) {     // wait for data
                        snap.ref.off('value', fn); // stop listening
                        snap.ref.remove();         // clear the queue
                        resolve(snap.val());
                    }
                });
            })
        }

    };
    return Categories;
})
