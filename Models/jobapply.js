var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobapplySchema = new Schema({

    number: {
        type: String,
        required: false
    },
    cv: {
        type: String,
        default: ''
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost',
        required: true
    },
},
 
    {
        timestamps: true
    });

var jobapply = mongoose.model('jobapply', jobapplySchema);
module.exports = jobapply;