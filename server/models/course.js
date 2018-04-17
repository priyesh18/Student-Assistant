var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
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
        required: true
    },
    
    votes: [
        {
           id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               required: true
           },
           value: {
               type: Number,
               min: -1,
               max: 1,
               required: true
           }
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);