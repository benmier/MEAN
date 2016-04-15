var people = require('../controllers/people.js');

module.exports = function(app){

  app.get('/people', function(req, res) {
      people.show(req,res);
  });

  app.get('/:name', function(req, res) {
      people.show_one(req,res);
  });

  app.post('/new/:name', function(req, res) {
      people.create(req,res);
  });

  app.post('/update/:name', function(req, res) {
      people.update(req,res);
  });

  app.post('/remove/:id', function(req, res) {
      people.remove(req,res);
  });
};