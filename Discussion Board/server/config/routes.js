var users = require('../controllers/users.js');
var threads = require('../controllers/threads.js');

module.exports = function(app){

    app.get('/users', function(req, res) {
        users.show(req,res);
    });

    app.get('/users/currentUser', function(req, res){
        users.currentUser(req,res);
    });
    
    app.post('/users/create', function(req, res) {
        users.create(req,res);
    });

    app.get('/users/:id', function(req, res) {
        users.showOne(req,res);
    });

    app.get('/threads', function(req, res) {
        threads.show(req,res);
    });

    app.get('/threads/:id', function(req, res) {
        threads.showOne(req,res);
    });

    app.post('/threads/create', function(req, res) {
        threads.create(req,res);
    });

    app.post('/threads/createAnswer/:id', function(req, res) {
        threads.createAnswer(req,res);
    });

    app.post('/threads/createComment/:id', function(req, res) {
        threads.createComment(req,res);
    });

    app.post('/threads/vote/:id', function(req,res) {
        threads.vote(req,res);
    });
}
