var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String
});

var People = mongoose.model('People', Schema);