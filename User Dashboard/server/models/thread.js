var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
	name: {type:String, required:true},
	topic: {type:String, required:true, unique:true},
	description: {type:String, required:true, unique:true},
	category: {type:String, required:true},
	posts: Number,
	answers: {
		_id: {type: Number},
		nameId: {type: String},
		name: {type: String},
		text: {type: String},
		createdAt: {type: Date, default: Date.now},
		comments: {
			_id: {type: Number},
			nameId: {type: String},
			name: {type: String},
			text: {type: String},
			createdAt: {type: Date, default: Date.now}
		}
	}
},{timestamps:true});

var Threads = mongoose.model('Threads', ThreadSchema);