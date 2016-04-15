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

}