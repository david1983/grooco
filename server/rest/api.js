var express = require('express');
var db = require('../model/db');
var router = express.Router();


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