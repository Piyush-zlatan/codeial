const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find the user and establish identity
    
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user-->Passport');
                return done(err);
            }

            if(!user || user.password !=password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        })
    
    }
));

//serializing the user to decide which is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);         // It determines which data to be stored in cookie
});


//To understand both functions visit https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user-->Passport');
            return done(err);
        }
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
        //if the user is signed in , then pass over the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in'); 

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;