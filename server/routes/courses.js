const express = require('express');
const passport = require('passport');
const router = express.Router();
var Course = require('../models/course');

//Create new course
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
  if (token) {
    var course = new Course({
        title: req.body.title,
        url: req.body.url,
        category: req.body.category
    });
    course.save().then((doc) => {
        res.send({
            success: true,
            msg: "Created Successfully"
        });
    }, (e) => {
        res.status(400).send(e);
    })
}
else {
    res.status(401).send({ success: false, msg: "Unauthorized"})
}
});
//GET all course
router.get('/', (req, res) => {
    Course.find().then((courses) => {
        res.send({
            courses: courses
        });
    }, (e) => {
        res.status(400).send(e);
    })
});
//Get courses by category
router.get('/category=:name', (req, res) => {
    var name = req.params.name;
    Course.find({
        category: name
    }).then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
    //res.send(req.params.id);
});
getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
module.exports = router