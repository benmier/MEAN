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

}