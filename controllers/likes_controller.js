const Like = require('../models/like');
const comment = require('../models/comment');
const Post = require('../models/post');


module.exports.toggleLike = async function(req,res){
    try{
        //Likes/toggle/?id=abcf&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
           likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exist
        let existingLikes  = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        //if a like already exist then delete it
        if(existingLikes){
            //Pulling the values from array
            likeable.likes.pull(existingLikes._id);
            likeable.save();

            existingLikes.remove();
            deleted = true;
        }else{
            //else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        return res.json(200,{
            message: 'Request Successful',
            data: {
                deleted:deleted
            }
        })
    }catch(err){    
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}