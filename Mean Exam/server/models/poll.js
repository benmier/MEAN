var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: {type:String},
	question: {type:String,required:true,unique:true},
	options: {
			option1:{type:String},
			option1votes: {type:Number,default:0},
			option2:{type:String},
			option2votes: {type:Number,default:0},
			option3:{type:String},
			option3votes: {type:Number,default:0},
			option4:{type:String},
			option4votes: {type:Number,default:0},
		}
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);