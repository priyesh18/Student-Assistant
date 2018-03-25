var mongoose = require('mongoose');
var Course = mongoose.model('Course',{
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    url: {
        type: String,
        //required: true
    },
    uploader: {
        type: String,
        default: 'admin'
    }
});

module.exports = { Course };