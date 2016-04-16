var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');
var products = require('../controllers/products.js');

module.exports = function(app){

	app.get('/customers', function(req, res) {
      customers.show(req,res);
  	});

  	app.get('/orders', function(req, res) {
      orders.show(req,res);
  	});

  	app.post('/customers/create', function(req, res) {
      customers.create(req,res);
  	});

  	app.post('/orders/create', function(req, res) {
      orders.create(req,res);
  	});

  	app.post('/customers/delete', function(req, res) {
      customers.delete(req,res);
  	});

  	app.post('/orders/delete', function(req, res) {
      orders.delete(req,res);
  	});

    app.get('/products', function(req, res) {
      products.show(req,res);
    });

    app.post('/products/create', function(req, res) {
      products.create(req,res);
    });

    app.post('/products/update', function(req, res) {
      products.update(req,res);
    });

  
};