const _ = require('lodash'); //instead of pulling individual properties like in create course route we can use pick like in register route
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //it's a core module so no need to install
const cors = require('cors'); //Cross Origin Resource Sharing, allows to send request from different domain name
const passport = require('passport');

const { config } = require('./config/config');
var { mongoose } = require('./config/mongoose');
var { Course } = require('./models/course');
var { User } = require('./models/user');

const users = require('./routes/users'); //all requests to localhost/users/xyz will go here
const courses = require('./routes/courses');

var categories = ['java','angular','react','vue','ionic','node.js','python','javascript','typescript','css','html'];

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
//Set static folder. to place all the client side files
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

//Setup Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.get('/', (req, res) => {
    res.send('Invalid request');
})

app.use('/users',users);
app.use('/courses', courses);

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



app.listen(port, () => {
    console.log('Started on port '+port);
})

module.exports = {app}