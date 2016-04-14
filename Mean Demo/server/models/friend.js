var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
  name: String,
  age: Number
});

mongoose.model('Friend', FriendSchema);