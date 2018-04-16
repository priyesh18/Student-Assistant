const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/config');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: config.auth.secret
    };

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('payl', jwt_payload);
        User.findOne({
            id: jwt_payload.id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};