var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
	name: String,
	threads: Number,
	answers: Number,
	comments: Number
},{timestamps:true});

var Threads = mongoose.model('Threads', ThreadSchema);