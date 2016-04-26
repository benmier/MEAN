var mongoose = require('mongoose');

var LiftSchema = new mongoose.Schema({
	name: String,
	main_muscle: String,
	other_muscles: [{name: String}],
	force: String,
	level: String,
	mechanics: String,
	equipment: String,
	link: String,
	sport: String,
	type: String,
	guide: String,
	pic_left: String,
	pic_right: String,
	muscle_img: String
});

var Lifts = mongoose.model('Lifts', LiftSchema);