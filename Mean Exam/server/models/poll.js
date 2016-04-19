var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: {type:String},
	question: {type:String,required:true,unique:true},
	option1: {
		name: {type:String,required:true},
		votes: {type:Number,default:0}
	},
	option2: {
		name: {type:String,required:true},
		votes: {type:Number,default:0}
	},
	option3: {
		name: {type:String,required:true},
		votes: {type:Number,default:0}
	},
	option4: {
		name: {type:String,required:true},
		votes: {type:Number,default:0}
	}
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);