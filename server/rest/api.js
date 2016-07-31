var express = require('express');
var db = require('../model/db');
var router = express.Router();
var _ = require('lodash');

router.get('/scan', function (req, res) {
    db.find('products', {}).then(function (result) {
        var categories = _.uniq(_.map(result, function (i) { return { lvl1: i.level1_category, main: i.main_category, sub: i.category }; }));
        var lvl1_category = _.uniq(_.map(result, function (i) { return i.level1_category }));
        var main_category = _.uniq(_.map(result, function (i) { return i.main_category }));
        var sub_category = _.uniq(_.map(result, function (i) { return i.category }));
        db.insert('categories', _.map(lvl1_category, function (i) {
            return { name: i, type: 'lvl1' }
        })).then(function () {
            return db.insert('categories', _.map(main_category, function (i) {

                return { name: i, type: 'main' , lvl1: _.filter(categories, function(c){ if(c.main == i ) return c;})[0].lvl1 }
            }))
        }).then(function () {
            return db.insert('categories', _.map(sub_category, function (i) {
                return { 
                    name: i, 
                    type: 'sub', 
                    lvl1: _.filter(categories, function(c){ if(c.sub == i ) return c;})[0].lvl1,
                    main: _.filter(categories, function(c){ if(c.sub == i ) return c;})[0].main}
            }))
        }).then(function () {
            res.json({
                lvl1: lvl1_category, main: main_category, sub: sub_category
            })
        })


    }).catch(function (err) { console.log(err) })
})

router.route('/:collection')
    .post(function (req, res) {
        db.insert(req.params.collection, [req.body])
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err)
            })
    })
    .patch(function(req, res){
        db.update(req.params.collection,{_id: req.body._id}, req.body)
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err)
            })
    })
    .get(function (req, res) {
        console.log(req.query)
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