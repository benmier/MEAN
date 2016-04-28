var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	weight: Number,
	height: Number,
	age: Number,
	bmi: Number,
	tdee: Number,
	multiplier: Number,
	goal: String,
	target_weight: Number,
	body_fat: Number,
	total_points: {type:Number, default:0},
	badges:[
		{
			name: String,
			description: String
		}
	],
	level: {type:Number, default:1},
	workouts: [
		// {
		// 	id: Number,
		// 	title: String,
		// 	exercises: [
		// 		{
		// 			name: String,
		// 			pic_left: String,
		// 			type: String,
		// 			sets: [{
		// 				reps:Number, 
		// 				lbs:Number, 
		// 				duration:Number, 
		// 				distance:Number, 
		// 				pace:Number
		// 			}]
		// 		}
		// 	],
		// 	points: Number,
		// 	createdAt: Date,
		// 	updatedAt: Date
		// }
	]
},{timestamps:true});

var Users = mongoose.model('Users', UserSchema);