var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
 
  
},
 
    {
        timestamps: true
    });

var message = mongoose.model('message', messageSchema);
module.exports = message;