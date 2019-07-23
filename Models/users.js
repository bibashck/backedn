var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
    FirstName: {
        type: String,
     required: false
    },
    LastName: {
        type: String,
        required: false
    },
     contactnumber: {
         type: Number,
        required: false
     },
     Address: {
        type:   String,
       required: false
    },
    email: {
        type: String,
        required: false
    },
    Country: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        required: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    publisher: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);