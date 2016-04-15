var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');

module.exports = function(app){

	app.get('/customers', function(req, res) {
      customers.show(req,res);
  	});

  	app.get('/orders', function(req, res) {
      orders.show(req,res);
  	});

  	app.post('/customers/new', function(req, res) {
      customers.create(req,res);
  	});

  	app.post('/orders/new', function(req, res) {
      orders.create(req,res);
  	});


  
};