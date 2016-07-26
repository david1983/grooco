var express = require('express');
var bodyParser = require('body-parser');
var db = require('./server/model/db');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', require('./server/rest/api').router)

app.use(express.static('public'))
app.listen(3030, function(){
console.log('listening on 3030')
})