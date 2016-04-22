var users = require('../controllers/users.js');
var quizzes = require('../controllers/quizzes.js');
var questions = require('../controllers/questions.js');

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

    app.get('/quizzes', function(req, res) {
        quizzes.show(req,res);
    });

    app.post('/quizzes/create', function(req, res) {
        quizzes.create(req,res);
    });

    app.post('/quizzes/score/:id', function(req, res) {
        quizzes.score(req,res);
    });

    app.get('/quizzes/:id', function(req, res) {
        quizzes.showOne(req,res);
    });

    app.post('/questions/create', function(req, res) {
        questions.create(req,res);
    });

    app.get('/questions/show3', function(req, res) {
        questions.show3(req,res);
    });

}