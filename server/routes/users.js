const express  = require('express');
const _        = require('lodash');
const passport = require('passport-jwt');
const jwt      = require('jsonwebtoken');
const config   = require('../config/config')
const User     = require('../models/user');
const router   = express.Router();

router.post('/register', (req, res) => {
    var body = _.pick(req.body, ['username', 'email', 'password']);
    var newUser = new User(body);
    newUser.save().then((user) => {
            res.send({
                success: true,
                msg: 'Registeration successful, please login now'
            });
        })
        .catch((e) => {
            res.status(400).send({
                success: false,
                msg: e.errmsg
            });
        })
})

router.post('/login', (req, res) => {
    User.findOne({
            username: req.body.username
        })
        .then((user) => {
            console.log(user);
            if (!user) {
                res.status(401).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                // check if password matches
                user.comparePassword(req.body.password)
                    .then((isMatch) => {
                        console.log(isMatch);
                        if (isMatch) {
                            // if user is found and password is right create a token
                            var token = jwt.sign(user.toJSON(), config.auth.secret);
                            // return the information including token as JSON
                            res.json({
                                success: true,
                                token: 'JWT ' + token
                            });
                        } else {
                            res.status(401).send({
                                success: false,
                                msg: 'Authentication failed. Wrong password.'
                            });
                        }
                    })
            }
        })
})

router.post('/authenticate', (req, res, next) => {
    res.send('authenticate');
})

router.get('/profile', (req, res, next) => {
    res.send('profile');
})

module.exports = router