module.exports= {
googleAuth:{
    clientID: '979694689603-640dp1bc31ckvp3hscpa8aq6mrfiv6ed.apps.googleusercontent.com',
    clientSecret: 'qVL2TjrYc4cwzkXpiOEXQ0Ed',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
facebookAuth: {
    clientID: '218669242894932',
    clientSecret: 'e1ff325093693c97e67051e4e2bf8a94',
    callbackURL: 'http://localhost:8000/users/auth/facebook/callback',
    profileFields   : ['id', 'name', 'email']
}
}