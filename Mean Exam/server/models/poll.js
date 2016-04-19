var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: {type:String},
	question: {type:String,required:true,unique:true},
	option1:{type:String},
	option2:{type:String},
	option3:{type:String},
	option4:{type:String},
	votes:[{
		option1: {type:Number,default:0},
		option2: {type:Number,default:0},
		option3: {type:Number,default:0},
		option4: {type:Number,default:0},
		}]
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);