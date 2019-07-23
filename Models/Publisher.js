var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PublisherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Address:{ 
        type : String,
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
    userid: {
        type: String,
    
    }, 
   
    });

var Publishers = mongoose.model('Publisher', PublisherSchema);
module.exports = Publishers;