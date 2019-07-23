var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({

    description: {
        type: String,
        required: true
    },

   

    userid: {
        type: String,
     },
 
  
},
 
    {
        timestamps: true
    });

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;