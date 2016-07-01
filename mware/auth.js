var jwt = require('jsonwebtoken');
var config = require('../config');
var Users = require('../models/users');
var users = new Users();  

module.exports = function(req, res, next){	
	if(req.type == 'public') {
		delete req.type;
		return next();
	}else if(req.type=='private'){
		jwt.verify(req.query.t, config.app.secret, function(err, decoded) {		
			if(decoded){
				delete req.query.t				
				Users
					.findOne({_id: decoded.id})
					.exec(function(err, user){
						if(err) return res.status(500).json({error: err});
						if(!user){
							return res.status(500).json({error: 'User not found'});
						}else{
							req.user = user;
							return next();		
						}
					});
					
			}else{
				return res.status(403).json({error: 'Not Authorized'});
			}		
		});	
	}else{
		return res.status(500).json({error: 'No request type found'});
	}
				
}