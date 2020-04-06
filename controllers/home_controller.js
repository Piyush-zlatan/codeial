const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
        //   return res.end('<h1>Express is up for codeial</h1>');
        // console.log(req.cookies);

        //        Post.find({}, function(err,posts){
        //         return res.render('home',{
        //                 title: 'Home',
        //                 posts: posts
        //            });

        //        });

        try {

                //populate the user of each post
                let posts = await Post.find({})           //The succussful response will be stored in the post of find query
                        .sort('-createdAt')
                        .populate('user')
                        .populate({
                                path: 'comments',
                                populate: {
                                        path: 'User'
                                },
                                populate:{
                                        path:'likes'
                                }
                        }).populate('likes');

                let users = await User.find({});

                return res.render('home', {
                        title: 'Home',
                        posts: posts,
                        all_users: users
                });

        } catch (err) {
                console.log('Error:',err);
                return;
        }

}

//        .exec(function(err,posts){



//    });



//module.exports.actionName  = function(req,res)