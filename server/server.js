var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Course } = require('./models/course');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
    Course.find().then((courses) => {
        res.send({courses: courses});
    }, (e) => {
        res.status(400).send(e);
    })
});

//GET /courses/9797967554
app.get('/courses/:id', (req,res) => {
    var id = req.params.id;
    //validate id TODO and respond with 404
    Course.findById(id).then((course) => {
        if(!course)
        {
            return res.status(400).send();
        }
        
        res.send({course:course});
    }).catch((e) => {
        res.status(400).send(); //e is not sent to avoid sensitive data
    })
})

app.listen(port, () => {
    console.log('Started on port '+port);
})

module.exports = {app}