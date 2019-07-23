var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'

    },
    Seeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seeker'
        
    },
    msg: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Publisher', 'Seeker']
    }
}, {
        timestamps: true
    });

var Comments = mongoose.model('Comment', CommentSchema);
module.exports = Comments;