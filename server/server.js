const _ = require('lodash'); //instead of pulling individual properties like in create course route we can use pick like in register route
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //it's a core module so no need to install
const cors = require('cors'); //Cross Origin Resource Sharing, allows to send request from different domain name
const passport = require('passport');

const { config } = require('./config/config');
const { mongoose } = require('./config/mongoose');
const { Course } = require('./models/course');
const { User } = require('./models/user');


const users = require('./routes/users'); //all requests to localhost/users/xyz will go here
const courses = require('./routes/courses');
const categories = require('./routes/categories')

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
//Set static folder. to place all the client side files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//Setup Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.get('/', (req, res) => res.send('Invalid request'));
app.use('/users', users);
app.use('/courses', courses);
app.use('/categories', categories);


app.listen(port, () => {
    console.log('Started on port ' + port);
})

module.exports = {
    app
}