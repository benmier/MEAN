var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var QuestionSchema = new mongoose.Schema({
	question: String,
	correct: String,
	fake1: String,
	fake2: String
});
QuestionSchema.plugin(random)

var Questions = mongoose.model('Questions', QuestionSchema);