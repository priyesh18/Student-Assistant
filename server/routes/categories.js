const express = require('express');
const _ = require('lodash');

const router = express.Router();
var Category = require('../models/category');

router.post('/', (req,res) => {
    var body = _.pick(req.body,["preRequisite","name"]);
    var newCat = new Category(body);
    newCat.save().then((doc) => {
        res.status(201).send(doc);
    },(e) => res.send(e));
})

router.get('/', (req, res) => {
    Category.find().then((allCategories) => {
        res.send(allCategories);
    }, (e) => {
        res.status(400).send(e.message);
    })
    
})

module.exports = router