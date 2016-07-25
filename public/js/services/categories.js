
app.service('categories', function (firebaseObj, $q) {
    function Categories(cat_name){
        
            this.catRef = (!cat_name) ? 'categories' : 'categories/' + cat_name;
            this.imgRef = (!cat_name) ? 'category_imgs' : 'category_imgs/' + cat_name; 

     this.get = function(){
         var catRef = this.catRef;
         var imgRef = this.imgRef;
         console.log(catRef, imgRef)
        return new $q(function (resolve, reject) {
            console.log('get')
            firebaseObj.list(catRef).then(function (cat) {
                console.log('get')
                    firebaseObj.list(imgRef).then(function (imgs) {                        
                        resolve({
                            categories: cat.val(),
                            imgs: imgs.val()
                        })
                    })
                })
            })        
    }

    };



    
    
    return Categories;
})
