var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	
},{timestamps:true});

var Users = mongoose.model('Users', UserSchema);