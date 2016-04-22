var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type:String, required:true},
	threads: Number,
	answers: Number,
	comments: Number
},{timestamps:true});

var Users = mongoose.model('Users', UserSchema);