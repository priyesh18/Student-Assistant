const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
//telling mongoose to use promise
mongoose.Promise = global.Promise;
//User Schema
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{
        access: {
            type: String,
            //required: true
        },
        token: {
            type: String,
            //required: true
        }
    }]
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {

        bcrypt.genSalt()
            .then((salt) => {
                //console.log(salt);
                bcrypt.hash(user.password, salt)
                    .then((hash) => {
                        //console.log(hash);
                        user.password = hash;
                        next();
                    })
                    .catch(e => next(e))
            })
            .catch((e) => {
                next(e);
            })

    } 
    else {
         next();
    }
});

UserSchema.methods.comparePassword = function (passw) {
    return bcrypt.compare(passw, this.password).then((result) => {
        return result;
    })
    .catch(e => e);
    
    // function (err, isMatch) {
    //     if (err) {
    //         return cb(err);
    //     }
    //     cb(null, isMatch);
    // });
};


//module.exports allows you to call the function from other file.
//To use User var from outside

module.exports = mongoose.model('User', UserSchema);

