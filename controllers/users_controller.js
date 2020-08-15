
//importing the model
const User = require('../models/user');


// Controlling or rendering user_profile page
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title:"Users profile"
    });
}

// Controlling or rendering signUp page 
module.exports.signUp = function (req, res) {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
    title:"Sign up"
});
}

// Controlling or rendering signIn page 
module.exports.signIn = function (req, res) {
    
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
    title:"Sign In"
});
}

//getting data from sign up page

module.exports.create = function (req, res) {
    
    if (req.body.password != req.body.confirm_password)
    {
        return res.redirect('back'); 
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        
        if (err) {
            console.log("error in finding the user");
            return;
        }
        
        if (!user) {
            User.create(req.body, function (err, user) {
                
                if (err) {
                    console.log("error in creating the user");
                    return;
                }
                
                return res.redirect('/users/sign-in');
                
            });
        }
        else {
            return res.redirect('back');
        }
    });
}

//getting data from sign in page

module.exports.createSession = function (req, res) {
    return res.redirect('/users/profile');
}

//Sign out controller
module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/');
}