var express = require('express');
var bodyParser = require('body-parser');
var db = require('./server/model/db');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//publish the endpoint /api/*
app.use('/api', require('./server/rest/api').router)

//publish the static files in the directory /public
app.use(express.static('public'))

//listen on port 3030
app.listen(3030, function(){
console.log('listening on 3030')
})