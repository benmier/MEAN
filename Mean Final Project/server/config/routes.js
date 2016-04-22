var users = require('../controllers/users.js');
// var polls = require('../controllers/polls.js');

module.exports = function(app){

	app.get('/users', function(req, res) {
        users.show(req,res);
    });

    app.post('/users/create', function(req, res) {
        users.create(req,res);
    });

    app.get('/users/:id', function(req, res) {
        users.showOne(req,res);
    });

    

}