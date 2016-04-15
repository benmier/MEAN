var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');

module.exports = {

    show: function(req,res){
        Orders.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var order = new Order(req.body) 
        order.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/orders')
        });
    },

}