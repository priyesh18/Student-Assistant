const express  = require('express');
const router   = express.Router();
var { Course } = require('../models/course');

//Create new course
router.post('/', (req,res) => {
    var course = new Course({
        title: req.body.title,
        url: req.body.url,
        category: req.body.category
    });
    course.save().then((doc) => {
        res.send({title:"Test Title"});
    }, (e) => {
        res.status(400).send(e);
    })
});
//GET all course
router.get('/', (req,res) => {
    Course.find().then((courses) => {
        res.send({courses: courses});
    }, (e) => {
        res.status(400).send(e);
    })
});
//Get courses by category
router.get('/category=:name',(req,res) => {
    var name = req.params.name;
    Course.find({category: name}).then((doc) => {
        res.send(doc);
    }).catch((e) =>{
        res.status(400).send(e);
    })
    //res.send(req.params.id);
})
module.exports = router