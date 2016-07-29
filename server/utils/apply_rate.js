'use strict'

const db = require('../model/db');
const _ = require('lodash');

db.find('categories',{})
    .then((categories)=>{            
        categories.forEach((category)=>{
            let search = (category.type=='lvl1') ? 
                {level1_category: category.name} :
                    (category.type=='main') ? {main_category: category.name} : {category: category.name}
            
            db.find('products', search)
                .then((products)=>{
                    let rating = products.reduce((a,i)=>{return a+=parseInt(i.averageRating)},0)/products.length
                    console.log(category.name + ':' +  rating.toFixed(0))
                    category.rating = rating.toFixed(2)
                    db.update('categories', {_id: category._id},category);
                })
        })
    })