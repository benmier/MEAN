var mongoose = require('mongoose');
var Customers = mongoose.model('Customers');

module.exports = {

	show: function(req,res){
        Customers.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var customer = new Customers(req.body) 
        customer.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/customers')
        });
    },
}