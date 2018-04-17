const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const router = express.Router();
var Course = require('../models/course');

//Create new course
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
  if (token) {
      var body = _.pick(req.body, ['title', 'url', 'category']);
    var course = new Course(body);
    course.save().then((doc) => {
        res.status(201).send({
            success: true,
            msg: "Created Successfully"
        });
    }, (e) => {
        res.status(400).send({ success: false, msg: e.message});
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
        res.status(400).send(e.message);
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

// Votes
router.post('/:id/vote', passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
  if (token) {
      var id = req.params.id;
      Course.findById(id).then((course) => {
        if (!course) {
            return res.status(400).send();
        }
        course.votes.push({id:req.body.id, value: req.body.value});
        course.save().then((doc) => {
            res.send(doc);
        })
    }).catch((e) => res.send(e));
    
}
else {
    res.status(401).send({ success: false, msg: "Unauthorized"})
}
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