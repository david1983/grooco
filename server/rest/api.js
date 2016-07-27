var express = require('express');
var db = require('../model/db');
var router = express.Router();
var _ = require('lodash');

router.get('/scan',function(req,res){
    db.find('products',{}).then(function(result){
        var categories = _.uniq(_.map(result, function(i){ return {lvl1: i.level1_category, main: i.main_category, sub: i.category}; }));  
        var lvl1_category = _.uniq(_.map(result, function(i){ return i.level1_category}));
        
        var main_category =_.uniq(_.map(result, function(i){ return i.main_category}));
        var sub_category = _.uniq(_.map(result, function(i){ return i.category}));
        res.json({
            lvl1: lvl1_category, main: main_category, sub: sub_category
        })
    }).catch(function(err){console.log(err)})
})

router.route('/:collection')
    .post(function (req, res) {
        db.insert(req.params.collection, req.body)
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err)
            })
    })
    .get(function (req, res) {
        db.find(req.params.collection, req.query)
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err)
            })
    })
    .delete(function (req, res) {      
        db.delete(req.params.collection, req.body)
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err)
            })
    });

module.exports.router = router;