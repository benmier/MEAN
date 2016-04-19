var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: {type:String},
	question: {type:String},
	option1:{type:String},
	option2:{type:String},
	option3:{type:String},
	option4:{type:String},
	votes:[
		{option: {type:Number,default:0}},
		{option: {type:Number,default:0}},
		{option: {type:Number,default:0}},
		{option: {type:Number,default:0}},
		]
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);