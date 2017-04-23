var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/user');

var configAuth = require('./auth');
module.exports = function(passport) {

    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'profileUrl', 'emails','name','picture.type(large)']
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        //console.log("Came in passport");
        //console.log(profile);

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
               // console.log(user);
              
                //If user is found we increase login_cnt;
                if (user) {
                    user.facebook.login_cnt++ ;
                    // here we update the login count.
                    user.save(function(err,instance){
                        //console.log(instance);
                    });
                    return done(null, user); 
                } else {
                    //we make a new user

                    var newUser = new User();
                    newUser.facebook.id    = profile.id;                  
                    newUser.facebook.profile_pic = profile.photos[0].value;
                    newUser.facebook.email = profile.emails[0].value;
                    var middleName = profile.name.middleName;
                    if(middleName=== undefined || middleName === null){
                        middleName = '';
                    }
                    else
                        middleName = middleName+' ';
                    newUser.facebook.name  = profile.name.givenName + ' ' +middleName+ profile.name.familyName;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);   
    });

    // used to deserialize the user
    passport.deserializeUser(function(came, done) {
        User.findOne({'_id':came._id}, function(err, user) {
            done(err, user);
        });
    });
};