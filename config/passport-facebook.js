
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const crypto = require('crypto')
const User = require('../models/user')
const configAuth = require('./auth')


passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret:configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields   : configAuth.facebookAuth.profileFields,
},
    function (accessToken, refreshToken, profile, done) {
        //find a user
        User.findOne({ email: profile.emails[0].value })
            .exec(function (err, user) {
                if (err) {
                    console.log('error in facebook strategy passport', err);
                    return
                }
                console.log(profile)
                if (user) {

                    //if found set this user as req.user
                    return done(null, user)
                }
                else {

                    //if not found,create the user and set the user as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function (err, user) {
                        if (err) {
                            console.log('error in creating user', err);
                            return
                        }
                        return done(null, user)
                    })
                }


            }
            )
    }
));

module.exports =passport