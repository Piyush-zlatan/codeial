const passport = require('passport');
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//Tell  Passport to use google startegy

passport.use(new googleStartegy({

    clientID: "58330172222-emd1rds9k7r58bsinjqn51spghf3l2hm.apps.googleusercontent.com",
    clientSecret: "wzx6q4u9ZcSfe-4J89dOFIVL",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google startegy passport',err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:  crypto.randomBytes(20).toString('hex')
                },  
                    function(err,user){
                        if(err){
                            console.log('error in creating user',err);
                            return;
                        }
                        return done(null,user);
                    }
                )
            }
        });
    }
));

module.exports = passport;