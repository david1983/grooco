var request = require('request');
var cheerio = require('cheerio');
var db = require('../model/db');


function imgSearch(terms){
    return new Promise(function(resolve, reject){
        request.get('https://www.pexels.com/search/' + terms,
        function (err, status, body) {
            var $ = cheerio.load(body)
            var article = $('.photo-item img').map(function(){ return $(this).attr()})
            var arr = []
            for(var i=0;i<article.length;i++){
                arr.push(article[i])
            }
            resolve(arr);
        })
    })
}


db.find('categories',{}).then(function(result){
    result.forEach(function(i){
        imgSearch(i.name.replace(/_/g, '%20')).then(function(result){
        var imgs = {imgs: result }
        db.update('categories', {_id: i._id},Object.assign(i, imgs) ).then(function(re){
            console.log(re)
        })
        })        
    })
})
// imgSearch('flower')


var express = require('express');
var app = express();

app.use(express.static('view'));


app.get('/img/search', function (req, res) {
    
    

})

app.listen(4000, function () { console.log('4000') })