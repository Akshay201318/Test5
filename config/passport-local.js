//Importing passport
const passport = require('passport');

//Importing passport strategy
const LocalStrategy = require('passport-local').Strategy;

//Importing User model
const User = require('../models/user');


// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
  
    function (email, password, done) {

        //find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding the user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                
                console.log("Invalid username or password");
                return done(null, false);
            }

            return done(null, user);
        });

        
    }


));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});



// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user) {

        if (err) {
            console.log('Error in finding the user --> Passport');
            return done(err);
        }

        return done(null, user);
        
    });
      
});

//Check if the user is authenticated or not
passport.checkAuthentication = function (req, res, next) {

    //If the user is signed in then pass the request to the controller
    if(req.isAuthenticated()){
        return next();
    }

    //If the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {

    //req.user contains the information about the current signed in user from the cookie and we are sending it to the viwes
    if(req.isAuthenticated()){
        res.locals.user=req.user
    }

    next();
    
}

// Export the passport
module.exports = passport;