// All the comments related mail will operate from this
const nodemailer = require('../config/nodemailer');

//this is another way of exporting method
exports.newComment = (comment) => {
    console.log('inside newComment mailer',comment);

    nodemailer.transpoter.sendMail({
        from: 'pia',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<H1> Your comment is published</H1>'
    },(err,info) => {
        if(err){console.log('error in sendiing mail',err);return;}
        console.log('Message Sent',info);
        return;
    });
}