var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Course } = require('./models/course');
var { User } = require('./models/user');

var app = express();
app.use(bodyParser.json());
app.post('/courses', (req,res) => {
    var course = new Course({
        title: req.body.title,
        url: req.body.url
    });
    course.save().then((doc) => {
        res.send({title:"Test Title"});
    }, (e) => {
        res.status(400).send(e);
    })
});
app.get('/courses', (req,res) => {
    res.send('these are the courses');
})

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {app}