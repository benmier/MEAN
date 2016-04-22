var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
	
},{timestamps:true});

var Quizzes = mongoose.model('Quizzes', QuizSchema);