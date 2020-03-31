// We have created this worker to handle the paraller job for comment emails.
// We can create same kind of workers for different jobs like notifications etc.

const queue  =require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

// First arguement is type of queue
queue.process('emails',function(job,done){

    console.log('Emails worker processing job',job.data);
    commentsMailer.newComment(job.data);
    done();
})