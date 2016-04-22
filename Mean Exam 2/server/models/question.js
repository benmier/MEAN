var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: String,
	correct: String,
	fake1: String,
	fake2: String
});

var Questions = mongoose.model('Questions', QuestionSchema);