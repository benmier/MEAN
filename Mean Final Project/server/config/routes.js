var users = require('../controllers/users.js');
var lifts = require('../controllers/lifts.js');

module.exports = function(app){

	app.get('/users', function(req, res) {
        users.show(req,res);
    });

    app.post('/users/create', function(req, res) {
        users.create(req,res);
    });

    app.post('/users/submit', function(req,res){
        users.submit(req,res);
    });

    app.get('/users/:name', function(req, res) {
        users.showOne(req,res);
    });

    app.post('/newLift', function(req, res) {
        lifts.create(req,res);
    });
    
    app.post('/lifts/update/:name', function(req, res) {
        lifts.update(req,res);
    });

    app.get('/lifts', function(req, res) {
        lifts.show(req,res);
    });
    

    app.get('/lifts/:name', function(req, res) {
        lifts.showOne(req,res);
    });

    app.get('/data/:name', function(req, res) {
        lifts.showData(req,res);
    });

    app.get('/workout/:id', function(req, res) {
        users.showOne(req,res);
    });
    

}