var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String,
    breed: String,
    color: String,
    personality: String,
    age: Number,
    food: String,
    toy: String,
    id: Number
},{timestamps: true})

var Kitten = mongoose.model('Kitten', Schema)