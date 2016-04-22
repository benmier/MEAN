var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: String,
	correct: String,
	fake1: String,
	fake2: String
},{timestamps:true});

var Questions = mongoose.model('Questions', QuestionSchema);