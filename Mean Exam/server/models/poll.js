var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: {type:String},
	question: {type:String,required:true,unique:true},
	option1: {type:String,required:true},
	option2: {type:String,required:true},
	option3: {type:String,required:true},
	option4: {type:String,required:true},
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);