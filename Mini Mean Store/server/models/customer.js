var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    name: String
},{timestamps:true});

var Customers = mongoose.model('Customers', CustomerSchema);