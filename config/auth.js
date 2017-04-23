
// expose our config directly to our application using module.exports
module.exports = {
	'database':'mongodb://localhost:27017/fb_profile',
	'port':process.env.PORT || 8000,
    'facebookAuth' : {
        'clientID'      : '1898669750354279', 
        'clientSecret'  : 'f747fe5c1d6e20b88ce92516088487c7', 
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback'
    }
};