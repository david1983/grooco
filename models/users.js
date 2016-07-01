var mongoose = require('../local_modules/db');

 
var schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User', schema);
