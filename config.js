
// expose our config directly to our application using module.exports
module.exports = {
	'database':'mongodb://localhost:27017/fb_profile',
	'port':process.env.PORT || 8000,
	'path':'',
};
