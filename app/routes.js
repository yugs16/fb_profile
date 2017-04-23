var User = require('./models/user');
var config=require('../config');


var loggedOnUser =false;
function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    //console.log(req.user);
	    if (req.isAuthenticated())
	       return next();
	    else{
	    	res.redirect('/');	
	    }  
}

module.exports=function(app,passport){

    app.get('/profile',isLoggedIn,function(req, res) {
        if(!req.user){
        	res.redirect(302,'/');
        }
        else{
            res.sendFile(config.path+'/public/profile.html');  
        }
    });

    app.get('/loggedOnUser',function(req,res){
    	if(req.user){
    		res.status(200).json({loggedon:true,url:'/profile'})
    	}
    	else{
    		res.status(200).json({loggedon:false});
    	}
    })

    app.post('/getdata',isLoggedIn,function(req,res){
    	User.findOne({_id:req.user._id},function(err,instance){
    		//console.log(instance);
    		res.status(200).json(instance);
    	});
	})

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect : '/'}),function(req,res){
        	res.redirect('/profile');
        });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
