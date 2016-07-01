var Users = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(app){
    app.post('/login',function(req, res){
        var loginObj = req.body.data;
        Users
            .findOne(loginObj)
            .exec(function(err, user){
                if(err) return res.status(500).json({error: err});
                if(user==null){
                    return res.status(401).json({error: 'not authorized'})
                }else{
                    var token = jwt.sign({ id: user._id  }, config.app.secret);
                    return res.json({token: token });
                }
            })   
    });
}