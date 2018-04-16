var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },

    url: {
        type: String,
        //required: true
    },
    author: {
        type: String,
        default: 'admin'
    }
});

module.exports = mongoose.model('Course', CourseSchema);
