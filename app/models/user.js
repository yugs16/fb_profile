var mongoose = require('mongoose');

var user=new mongoose.Schema({
		facebook:{
			id:{type:'String',require:true},
			name:{type:'String'},
			email:{type:'String',default:''},
			profile_pic:{type:'String',default:''},
			login_cnt:{'type':'Number',default:1}	
		}
},{collection: 'users' });

module.exports = mongoose.model('User',user);

