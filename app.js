var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var auth = require('./mware/auth');
var acl = require('./mware/acl');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(acl);
app.use(auth);

require('./routes/index.js')(app)

app.listen(config.app.port, function () {
  console.log('Example app listening on port ' +config.app.port+ '!');
});