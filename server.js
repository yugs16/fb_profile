//For routes, see in app/routes.js

var express = require('express');
var app = express(),
	bodyParser=require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config');
var configAuth = require('./config/auth');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.path = __dirname;

var database;
if(env === 'development'){
    console.log("here at local");
    database = config.database;
    configAuth.facebookAuth.callbackURL = 'http://localhost:8000/auth/facebook/callback';
}
else if(env === 'production'){
    database=config.database_prod;
    configAuth.facebookAuth.callbackURL = 'https://yugalfbauth.herokuapp.com/auth/facebook/callback';    
}

mongoose.connect(database,function(err){
    if(err){
        console.log("error connecting")
        console.log(err);
    }
    else{
        console.log('Connected to the Database');
    }
});


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json()); 

app.use(cookieParser()); 

require('./config/passport')(passport);

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'my-secret'
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

require('./app/routes.js')(app, passport);

app.listen(config.port, function (err) {
	if(err){
    	console.log(err);
    }
    else{
    	console.log("Magic happens @ http://localhost:%s",config.port);
    }
});
