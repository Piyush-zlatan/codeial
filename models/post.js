const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    content:{
        type: String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    //include the array of ids of all comments in this post schema itself
    comments:[
        {
            type:   mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }]

},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema); //telling the server that it will be model

module.exports = Post;