const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

//creating log directory
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path: logDirectory
});

const development= {
    name :'development',
    assest_path:'./assets',
    session_cookie_key:'blahSomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pia.axelor@gmail.com',
            pass: 'password'
        }
    },
    google_client_id: "google_API_ID",
    google_client_secret: "google_API_SECRET",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

// make a file for environment variable and put the keys into that then access them like process.variablename
const production={
    name:'production',
    assest_path:'./assets',
    session_cookie_key:'5C1B2BB515DC5',
    db:'codeial_production',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pia.axelor@gmail.com',
            pass: 'bhulgaya951'
        }
    },
    google_client_id: "58330172222-emd1rds9k7r58bsinjqn51spghf3l2hm.apps.googleusercontent.com",
    google_client_secret: "wzx6q4u9ZcSfe-4J89dOFIVL",
    google_call_back_url: "http://codeial.com/users/auth/google/callback",
    jwt_secret : '^If7|SyJhuzd;ZZmX',
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = development;
