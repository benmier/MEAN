var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
	name: {type:String},
	nameId: {type:String},
	topic: {type:String, required:true, unique:true},
	description: {type:String, required:true, unique:true},
	category: {type:String, required:true},
	posts: Number,
	answers: [{
		_id: {type: Number},
		nameId: {type: String},
		name: {type: String},
		text: {type: String},
		upvotes: {type: Number},
		downvotes: {type: Number},
		createdAt: {type: Date},
		comments: [{
			_id: {type: Number},
			nameId: {type: String},
			name: {type: String},
			text: {type: String},
			createdAt: {type: Date}
		}]
	}]
},{timestamps:true});

var Threads = mongoose.model('Threads', ThreadSchema);