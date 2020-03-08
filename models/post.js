const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    content:{
        type: String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema); //telling the server that it will be model

module.exports = Post;