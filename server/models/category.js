const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    preRequisite: String
});
module.exports = mongoose.model('Category', categorySchema);