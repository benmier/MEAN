var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	
},{timestamps:true});

var Questions = mongoose.model('Questions', QuestionSchema);