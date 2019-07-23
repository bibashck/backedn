var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment: {
        type: String,
        default: ''
    }
}, {
        timestamps: true
    });

var SeekerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    comments: [commentSchema]
}, {
        timestamps: true
    });

var Seeker = mongoose.model('Seeker', SeekerSchema);
module.exports = Seeker;