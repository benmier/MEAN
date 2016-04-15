var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    initialQty: Number,
},{timestamps:true});

var Products = mongoose.model('Products', ProductSchema);