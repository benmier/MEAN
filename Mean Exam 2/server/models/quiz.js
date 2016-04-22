var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	
},{timestamps:true});

var Polls = mongoose.model('Polls', PollSchema);