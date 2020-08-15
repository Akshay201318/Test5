//importing express to this project
const express = require('express');

//importing cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//importing database
const db = require('./config/mongoose');

// Import express session
const session = require('express-session');

//Import passport and passport local
const passport = require('passport');
const passportLocal = require('./config/passport-local');

const passportGoogle = require('./config/passport-google-oauth2-strategy')
const passportFacebook = require('./config/passport-facebook')
const mongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

// importing the layout library
const expressLayout = require('express-ejs-layouts');

// Middlewheres
app.use(sassMiddleware({

    src: './static/scss',
    dest: './static/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// using static files
app.use(express.static('./static'));

//extracting styles and script files from pages

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// using layouts

app.use(expressLayout);


// Setting the view engine

app.set('view engine', 'ejs');
app.set('views', './views');


//Using mongo store to store the session information
app.use(session({
    name: 'codeial1',
    //ToDo before deploying
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore(
          {
              mongooseConnection: db,
              autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongo setup is ok');
        }
      )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// Using express router
app.use('/', require('./routs'));


app.listen(port, function (err)
{
    if (err)
    {
        console.log(`Error in creating the server ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})