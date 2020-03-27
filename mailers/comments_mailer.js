// All the comments related mail will operate from this
const nodemailer = require('../config/nodemailer');

//this is another way of exporting method
exports.newComment = (comment) => {
    
    let htmlString  = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transpoter.sendMail({
        from: 'pia',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sendiing mail',err);return;}
        console.log('Message Sent',info);
        return;
    });
}