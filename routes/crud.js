
var crud = require('../models')();

module.exports = function(app){
    crud.forEach(function(model){
        app.get('/' + model.name + '/all',function(req, res){
            fnGet(model.model,req,res);
        });    
        app.get('/' + model.name + '/:id',function(req, res){
            fnGet(model.model,req,res);
        });    
        app.post('/' + model.name + '/:id', function(req, res){
            fnPost(model.model,req,res);
        });   
        app.post('/' + model.name + '', function(req, res){
            fnPost(model.model,req,res);
        });    
        app.delete('/' + model.name + '/:id',function(req, res){
            fnDelete(model.model,req,res);
        });    
    })    
}

function fnGet(model, req, res){
   
    var searchObj = (req.params.id) ? Object.assign({_id: req.params.id},req.query) : req.query.id;        
        model
            .findOne(searchObj)
            .exec(function(err, result){
                if(err) return res.status(500).json({error: err});
                res.json(result);
            });
}

function fnPost(model, req, res){
    var searchObj = Object.assign({_id: req.params.id},req.query);        
        var updateObj = req.body
        model
            .findOneAndUpdate(searchObj, updateObj, {upsert: true})
            .exec(function(err, result){
                if(err) return res.status(500).json({error: err});
                res.json(result);
            });  
}

function fnDelete(model, req, res){
     var searchObj = Object.assign({_id: req.params.id},req.query);        
        model
            .remove(searchObj)
            .exec(function(err, result){
                if(err) return res.status(500).json({error: err});
                res.json(result);
            });
}