var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');

module.exports = function(app){

	app.get('/customers', function(req, res) {
      customers.show(req,res);
  	});

  	app.get('/order', function(req, res) {
      orders.show(req,res);
  	});
  
};