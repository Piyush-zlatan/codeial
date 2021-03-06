const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker  = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
    try {

        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            console.log(comment);
            
            // This is the line whose operation that needs to put into the queue for paraller job.
           // commentsMailer.newComment(comment);
            let job =  queue.create('emails',comment).save(function(err){
                if(err){console.log('Error in creating a queue'); return;}
                console.log(job.id);
            })
            if (req.xhr) {
                //Similar to comment to fetch the user's id
               

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Post Created!'
                });
            }
            req.flash('success', 'Comment Published!');

            res.redirect('/');
        }

    } catch (err) {
        console.log('Error:', err);
        return;
    }


}

module.exports.destroy = async function (req, res) {

    try {

        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error:', err);
        return;
    }
}