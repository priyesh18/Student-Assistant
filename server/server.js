const _ = require('lodash'); //instead of pulling individual properties like in create course route we can use pick like in register route
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Course } = require('./models/course');
var { User } = require('./models/user');

var categories = ['java','angular','react','vue','ionic','node.js','python','javascript','typescript','css','html'];
var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//Create new course
app.post('/courses', (req,res) => {
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
app.get('/courses', (req,res) => {
    Course.find().then((courses) => {
        res.send({courses: courses});
    }, (e) => {
        res.status(400).send(e);
    })
});
//Get courses by category
app.get('/courses/category=:name',(req,res) => {
    var name = req.params.name;
    Course.find({category: name}).then((doc) => {
        res.send(doc);
    }).catch((e) =>{
        res.status(400).send(e);
    })
    //res.send(req.params.id);
})

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
});

app.get('/categories',(req,res) => {
    res.send(categories);
})

app.post('/users/register', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'username']);
    var user = new User (body);
    user.save().then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.listen(port, () => {
    console.log('Started on port '+port);
})

module.exports = {app}