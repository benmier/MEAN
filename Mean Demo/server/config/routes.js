var friends = require('./../controllers/friends.js');

  module.exports = function(app) {
  // verb: get, plural of target as the URI is the RESTful index method (it returns all friends)
    app.get('/', function(req, res) {
    	res.render('/views/index.html')
    });

    app.get('/friends', function(req, res) {
    	friends.index(req,res);
    });

  };