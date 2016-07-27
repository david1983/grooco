var mongo = require('mongodb');
var MongoClient = mongo.MongoClient

// Connection URL 
var url = 'mongodb://localhost:27017/grooco';


const db = {
    find: function (collectionName, obj) {
         if(obj._id){
            obj._id = new mongo.ObjectID(obj._id);
        }
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if(err) return reject(err)
                var collection = db.collection(collectionName);
                // Find some documents 
                collection.find(obj).toArray(function (err, docs) {
                    if(err) return reject(err)                    
                    resolve(docs)
                    db.close();
                });
            });
        })
    },
    insert: function(collectionName, obj) {
         return new Promise(function (resolve, reject) {
         MongoClient.connect(url, function (err, db) {
                if(err) return reject(err)
                var collection = db.collection(collectionName);                
                collection.insertOne(obj,function (err, result) {
                    if(err) return reject(err)                    
                    resolve(result)
                    db.close();
                });
            });
         })
    },
    update: function(collectionName, obj, newObj) {
         if(obj._id){
            obj._id = new mongo.ObjectID(obj._id);
        }
         return new Promise(function (resolve, reject) {
         MongoClient.connect(url, function (err, db) {
                if(err) return reject(err)
                var collection = db.collection(collectionName);
                // Find some documents 
                collection.updateOne(obj, {$set: newObj}, function (err, result) {
                    if(err) return reject(err)                    
                    resolve(result)
                    db.close();
                });
            });
         });
    },
    delete: function(collectionName, obj) {
        if(obj._id){
            obj._id = new mongo.ObjectID(obj._id);
        }
         return new Promise(function (resolve, reject) {
         MongoClient.connect(url, function (err, db) {
                if(err) return reject(err)
                var collection = db.collection(collectionName);
                // Find some documents 
                collection.deleteOne(obj,function (err, result) {
                    if(err) return reject(err)                    
                    resolve(result)
                    db.close();
                });
            });
         });
    },
}

module.exports = db;