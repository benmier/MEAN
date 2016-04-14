var friends = require('./../controllers/friends.js');

  module.exports = function(app) {
  // verb: get, plural of target as the URI is the RESTful index method (it returns all friends)
    app.get('/friends', function(req, res) {
    	friends.index(req,res);
    });

    app.post('/friends', function(req, res) {
    	friends.create(req,res);
    });

    app.post('/friends/:id', function(req, res) {
    	friends.destroy(req,res);
    });

  };